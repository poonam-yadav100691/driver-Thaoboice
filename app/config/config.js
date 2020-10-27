import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAhg1NAJXwnlokt12RkA9uaDH8cZqmN87k",
  authDomain: "bo-ice.firebaseapp.com",
  databaseURL: "https://bo-ice.firebaseio.com",
  projectId: "bo-ice",
  storageBucket: "bo-ice.appspot.com",
  messagingSenderId: "738787609719",
  appId: "1:738787609719:web:69dc20338976b955f50a72",
  measurementId: "G-HDC6ZBSKEJ"
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
