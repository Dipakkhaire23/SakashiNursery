import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFGe_fyPG243OxFtLvc9XnYNgxZuDdO-8",
  authDomain: "spring-boot-nursery-notifi.firebaseapp.com",
  projectId: "spring-boot-nursery-notifi",
  storageBucket: "spring-boot-nursery-notifi.firebasestorage.app",
  messagingSenderId: "833123539448",
  appId: "1:833123539448:web:52a1a93dcf9b6562559e0d",
  measurementId: "G-M6YTKD92CJ",
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);


// Always returns a fresh token and syncs it with backend
export const generateAndSyncToken = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-s.js"
    );

    const currentToken = await getToken(messaging, {
      vapidKey:
        import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
     

      // Send to backend if user is logged in
      if (currentToken && userId) {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL+"/api/users/fcm-token",
          { userId, firebasetoken: currentToken },
          { withCredentials: true }
        );
      }
    }
    return currentToken;
  } catch (err) {
    console.error("FCM token generation failed:", err);
    return null;
  }
};