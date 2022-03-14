// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHk-QaG1OPjp-tY18Co2tmYPCuXpPWncs",
  authDomain: "shoptronics-ce0c5.firebaseapp.com",
  projectId: "shoptronics-ce0c5",
  storageBucket: "shoptronics-ce0c5.appspot.com",
  messagingSenderId: "896752313589",
  appId: "1:896752313589:web:d8535991b437399953d1bc",
  measurementId: "G-DS11Y4Z15W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;