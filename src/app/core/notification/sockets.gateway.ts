import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SocketsGateway {
  private bcNotif = new BroadcastChannel('notifications');
  private bcPrices = new BroadcastChannel('prices');

  sendNotification(data: any) {
    this.bcNotif.postMessage(data);
  }

  sendPrice(data: any) {
    this.bcPrices.postMessage(data);
  }
}
