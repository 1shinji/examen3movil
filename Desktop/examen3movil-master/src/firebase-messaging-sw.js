// Importa los scripts de Firebase necesarios
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Inicializa la configuración de Firebase (sustituye con tus datos)
firebase.initializeApp({
  apiKey: "AIzaSyARtmN_X97EBpeNj4DuvLWlaUelODG7U1s",
  authDomain: "movilapp-1d41f.firebaseapp.com",
  projectId: "movilapp-1d41f",
  storageBucket: "movilapp-1d41f.appspot.com",
  messagingSenderId: "602458291293",
  appId: "1:602458291293:web:088a04f8dec380341fa1b4"
});

const messaging = firebase.messaging();

// Manejar mensajes recibidos en segundo plano
messaging.onBackgroundMessage(function (payload) {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});