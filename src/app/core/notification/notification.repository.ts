import { INotificationDB } from '@shared/models/notification/notification.model';
import { IDBPDatabase, openDB } from 'idb';

export class NotificationRepository {
  private dbPromise: Promise<IDBPDatabase<INotificationDB>>;

  constructor() {
    this.dbPromise = openDB<INotificationDB>('notifications-db', 1, {
      upgrade(db) {
        db.createObjectStore('notifications', { keyPath: 'id' });
        db.createObjectStore('prices', { keyPath: 'id' });
      },
    });
  }

  async addNotification(data: INotificationDB['notifications']['value']) {
    const db = await this.dbPromise;
    await db.put('notifications', data);
  }

  async getAllNotifications(): Promise<
    INotificationDB['notifications']['value'][]
  > {
    const db = await this.dbPromise;
    return await db.getAll('notifications');
  }

  async addPrice(data: INotificationDB['prices']['value']) {
    const db = await this.dbPromise;
    await db.put('prices', data);
  }

  async getAllPrices(): Promise<INotificationDB['prices']['value'][]> {
    const db = await this.dbPromise;
    return await db.getAll('prices');
  }
}
