// public/firebase-messaging-s.js

// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

// Firebase configuration (same as your app config)
// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyBFGe_fyPG243OxFtLvc9XnYNgxZuDdO-8",
  authDomain: "spring-boot-nursery-notifi.firebaseapp.com",
  projectId: "spring-boot-nursery-notifi",
  messagingSenderId: "833123539448",
  appId: "1:833123539448:web:52a1a93dcf9b6562559e0d",
});

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-s.js] Received background message", payload);

  const title = payload.data?.title || "New Notification";
  const options = {
    body: payload.data?.body || "",
    icon: "/url_logo.png",
    image: payload.data?.image, // ✅ support notification image
    data: {
      link: payload.data?.link || "/",
    },
  };

  self.registration.showNotification(title, options);
});

// Handle notification click
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification?.data?.link || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
