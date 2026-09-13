import { Injectable, signal } from '@angular/core';
import { NotificationRepository } from './notification.repository';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<any[]>([]);
  prices = signal<any[]>([]);

  private repo = new NotificationRepository();

  constructor() {
    this.loadInitialData();
    this.listenToSW();
  }

  async loadInitialData() {
    const notifs = await this.repo.getAllNotifications();
    const prices = await this.repo.getAllPrices();
    this.notifications.set(notifs.reverse());
    this.prices.set(prices.reverse());
  }

  private listenToSW() {
    const notifChannel = new BroadcastChannel('notifications');
    notifChannel.onmessage = (e) => {
      this.notifications.update((list) => [e.data, ...list]);
    };

    const priceChannel = new BroadcastChannel('prices');
    priceChannel.onmessage = (e) => {
      this.prices.update((list) => [e.data, ...list]);
    };
  }
}
