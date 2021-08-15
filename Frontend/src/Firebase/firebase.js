import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCi4SqWXrDilIpuLkSvhgBqcIpIhzUwNnQ",
    authDomain: "oss-spm.firebaseapp.com",
    projectId: "oss-spm",
    storageBucket: "oss-spm.appspot.com",
    messagingSenderId: "422780897159",
    appId: "1:422780897159:web:5dca382fe9be19961ab522",
    measurementId: "G-HRRR0S0MJ8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;