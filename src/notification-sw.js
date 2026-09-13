// --- Import DB library ---
importScripts("/assets/libs/idb.js");

// --- جلوگیری از کش شدن نسخه قدیمی ---
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

// --- IndexedDB setup ---
const dbPromise = idb.openDB("notifications-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("notifications"))
      db.createObjectStore("notifications", { keyPath: "id" });
    if (!db.objectStoreNames.contains("prices"))
      db.createObjectStore("prices", { keyPath: "id" });
  },
});

// --- Notification click listener ---
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";
  const fullUrl = "https://arkacoin.com" + urlToOpen;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (let client of windowClients) {
          if (client.url === fullUrl) return client.focus();
        }
        return self.clients.openWindow(fullUrl);
      })
  );
});

// --- WebSocket connection ---
let socket = null;

function connectSocket() {
  socket = new WebSocket("wss://ws.ifelse.io");

  socket.onopen = () => {
    console.log("SW WS CONNECTED");
    socket.send(JSON.stringify({ type: "notification", body: "Connected OK" }));
  };

  socket.onmessage = async (event) => {
    console.log("[SW] WS Received:", event.data);

    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      data = {
        body: event.data,
        ts: new Date().toISOString(),
        type: "notification",
        id: crypto.randomUUID(),
      };
    }

    if (!data.id) data.id = crypto.randomUUID();

    const db = await dbPromise;

    if (data.type === "notification") {
      await db.put("notifications", data);
      showNotification(data);
      broadcast("notifications", data);
    }

    if (data.type === "price") {
      await db.put("prices", data);
      broadcast("prices", data);
    }
  };

  socket.onerror = (err) => console.error("[SW] WS ERROR:", err);
  socket.onclose = () => {
    console.warn("[SW] WS CLOSED → reconnecting...");
    setTimeout(connectSocket, 3000);
  };
}

connectSocket();

// --- Show notification with permission check ---
async function showNotification(data) {
  // اگر permission داده نشده، درخواست بده
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    self.registration.showNotification(data.title || "پیام جدید", {
      body: data.body,
      icon: "/assets/icons/bell.png",
      data: { url: data.url || "/" },
    });
  } else {
    console.warn("[SW] Notification permission not granted");
  }
}

// --- Broadcast to clients safely ---
function broadcast(channel, data) {
  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    if (clients.length > 0) {
      const bc = new BroadcastChannel(channel);
      try {
        bc.postMessage(data);
      } catch (e) {
        console.warn("Broadcast failed", e);
      } finally {
        bc.close();
      }
    }
  });
}

// --- Listen for messages from Angular ---
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data.id) data.id = crypto.randomUUID();

  if (data.type === "notification") broadcast("notifications", data);
  if (data.type === "price") broadcast("prices", data);
});
