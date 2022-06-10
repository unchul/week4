import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC4WxNxUXAoEiomG4IIiivXrWNIN0vYx0k',
  authDomain: 'goldenduck-321d1.firebaseapp.com',
  projectId: 'goldenduck-321d1',
  storageBucket: 'goldenduck-321d1.appspot.com',
  messagingSenderId: '1030456652002',
  appId: '1:1030456652002:web:34ef9b9285c5ac22516ebb',
};




firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const apiKey = firebaseConfig.apiKey;
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
