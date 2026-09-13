import { DBSchema } from 'idb';

export interface INotificationDB extends DBSchema {
  notifications: {
    key: string;
    value: {
      id: string;
      title: string;
      body: string;
      type?: 'info' | 'success' | 'warning' | 'error';
      ts: string;
      read?: boolean;
    };
  };
  prices: {
    key: string;
    value: {
      id: string;
      productId: string;
      newPrice: number;
      ts: string;
    };
  };
}
