import { Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon, sepolia } from '@reown/appkit/networks';
import { BaseComponent } from '@shared/components/base/base.component';
import { BLOCKCHAIN_NETWORKS } from '@shared/enums/blockchain-networks';
import { createConfig, getChainId, http, injected } from '@wagmi/core';
import { WalletInfoComponent } from '../../public/auth/register/wallet-info/wallet-info.component';
import { ApiEndpoints } from '../config/apiEndpoints';
import { MainService } from './main.service';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
});

@Injectable({
  providedIn: 'root',
})
export class WalletConnectService extends BaseComponent {
  wagmiAdapter!: WagmiAdapter;
  appKit!: ReturnType<typeof createAppKit>;
  walletConnected = false;
  walletAddress: string | null = null;
  walletType: string | null = null;
  walletDetailsObject: any = {};
  loading = false;
  modalOpen = false;
  monitorInterval: any = null;

  constructor(
    private router: Router,
    private mainService: MainService,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    super();
  }

  public initAdapters() {
    if (!this.wagmiAdapter) {
      this.wagmiAdapter = new WagmiAdapter({
        networks: [mainnet],
        projectId: 'c254d9b888a1c0288f99528824e61123',
      });

      this.appKit = createAppKit({
        projectId: 'c254d9b888a1c0288f99528824e61123',
        adapters: [this.wagmiAdapter],
        networks: [mainnet],
        themeMode: 'dark',
      });
    }
  }

  async connectWallet() {
    this.loading = true;
    try {
      this.initAdapters();
      await this.appKit.open({ view: 'Connect' });
      this.monitorModalClose();

      const waitForConnection = () => {
        return new Promise<any>((resolve, reject) => {
          const interval = setInterval(() => {
            const connections = this.wagmiAdapter.connections;
            this.loading = false;
            if (connections && connections.length > 0) {
              clearInterval(interval);
              resolve(connections[0]);
              this.walletDetails();
            }
          }, 500);

          setTimeout(() => {
            this.loading = false;
            clearInterval(interval);
            reject('⏱ Wallet connection timed out.');
          }, 120000);
        });
      };

      const connection = await waitForConnection();
      const account = connection.accounts?.[0]?.address;
      if (account) {
        this.walletConnected = true;
        this.walletAddress = account;
        this.walletType = connection.connectorId || 'Unknown Wallet';
        return {
          success: true,
          walletAddress: account,
          walletType: this.walletType,
        }; // 👈 اینجا مقدار برمی‌گردد
      } else {
        this.loading = false;
        return { success: false, error: 'No account found' };
      }
    } catch (err) {
      this.loading = false;
      this.walletConnected = false;
      this.walletAddress = null;
      return { success: false, error: err };
    }
  }

  async disconnectWallet() {
    try {
      const connections = this.wagmiAdapter.connections;

      for (const conn of connections) {
        if (conn.connectorId) {
          await this.wagmiAdapter.disconnect({ id: conn.connectorId });
        }
      }

      this.walletConnected = false;
      this.walletAddress = null;
      this.walletType = null;
    } catch (err) {}
  }

  async walletDetails() {
    const connections = this.wagmiAdapter.connections;

    if (!connections || connections.length === 0) {
      return;
    }

    const account = connections[0].accounts?.[0]?.address;

    // گرفتن chainId از wagmiConfig
    let chainId: number | null = null;
    try {
      chainId = await getChainId(wagmiConfig);
    } catch (err) {}

    const chainName = this.getNetworkName(chainId!!);

    this.walletDetailsObject = {
      walletAddress: account,
      chainId: chainId,
      networkName: chainName,
    };
  }

  getNetworkName(chainId: number) {
    return BLOCKCHAIN_NETWORKS.find((item) => item.chainId == chainId)?.name;
  }

  async closeModal() {
    try {
      if (this.appKit) {
        await this.appKit.close();
      }
    } catch (error) {}
  }

  walletLoginRegister(
    username: string,
    password: string,
    confirmPassword: string,
    referralCode: string,
    iso3 = 'irn'
  ) {
    this.loading = true;
    this.connectWallet().then(async (response: any) => {
      try {
        this.loading = false;
        if (!response?.walletAddress) throw new Error('Wallet not connected');

        // گرفتن nonce و walletNonceId از سرور
        const nonceResponse: any = await this.mainService
          .post(ApiEndpoints.user.nonce, { wallet: response.walletAddress })
          .toPromise();

        const nonce = nonceResponse?.result?.nonce;
        const walletNonceId = nonceResponse?.result?.walletNonceId;

        if (!nonce || !walletNonceId) {
          this.mainService.errorToast('خطا در دریافت nonce');
          return;
        }

        // ساخت payloadی که باید امضا شود
        const payloadToSign = {
          nonce: nonce,
          metaData: walletNonceId,
        };

        const message = JSON.stringify(payloadToSign);

        // امضای پیام
        this.initAdapters();
        const signatureObj = await this.wagmiAdapter.signMessage({
          message,
          address: response.walletAddress,
        });

        const signature = signatureObj.signature ?? signatureObj;

        // فراخوانی متد authenticate
        this.walletAuthenticate(
          signature,
          nonce,
          walletNonceId,
          username,
          password,
          confirmPassword,
          referralCode,
          iso3
        );
      } catch (err) {
        this.loading = false;
        this.mainService.errorToast('خطا در اتصال یا امضای کیف پول');
      }
    });
  }

  walletAuthenticate(
    signature: string,
    nonce: string,
    walletNonceId: string,
    username: string,
    password: string,
    confirmPassword: string,
    referralCode: string,
    iso3: string
  ) {
    // ساخت payload نهایی برای ارسال به سرور
    const data = {
      signature: signature,
      walletAddress: this.walletAddress,
      content: {
        nonce: nonce,
        metaData: walletNonceId,
      },
      authorization: {
        userName: username,
        password: password,
        confirmPassword: confirmPassword,
      },
      iso3,
      referralCode: referralCode,
    };

    // حذف فیلدهای خالی (recursive)
    this.mainService
      .post(ApiEndpoints.user.walletAuthenticate, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response?.result?.token!!);
          this.closeModal();
          const dialogConfig = this.mainService.defaultDialogConfig;
          this.dialog.open(WalletInfoComponent, dialogConfig);
          console.log('Wallet authenticate response:', response);
        },
        error: (err: any) => {
          console.error('Authenticate error:', err);
        },
      });
  }

  private monitorModalClose() {
    // اگر قبلاً در حال چک کردن بوده، متوقفش کن
    if (this.monitorInterval) clearInterval(this.monitorInterval);

    this.monitorInterval = setInterval(() => {
      this.ngZone.run(() => {
        const modalEl = document.querySelector('w3m-modal');
        const isOpen = modalEl?.classList.contains('open');
        if (isOpen && !this.modalOpen) {
          this.modalOpen = true;
        } else if (!isOpen && this.modalOpen) {
          this.modalOpen = false;
          clearInterval(this.monitorInterval);
          this.loading = false;
        }
      });
    }, 300);
  }
}
