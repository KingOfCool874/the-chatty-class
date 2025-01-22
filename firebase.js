 const firebaseConfig = {
    apiKey: "AIzaSyBoHiY5J5bOK61k7ZVPo5k2aJy3HZ5pKUA",
    authDomain: "the-chatty-class.firebaseapp.com",
    databaseURL: "https://the-chatty-class-default-rtdb.firebaseio.com",
    projectId: "the-chatty-class",
    storageBucket: "the-chatty-class.firebasestorage.app",
    messagingSenderId: "191011186186",
    appId: "1:191011186186:web:d1a8828a9e47cb86f3a1f3",
    measurementId: "G-BK7KFVM9EK"

  };
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
