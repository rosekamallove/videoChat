import './style.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvb0gcMZ5KEPPYST5SDcIfiOOgcNELYFk",
  authDomain: "videochat-13325.firebaseapp.com",
  projectId: "videochat-13325",
  storageBucket: "videochat-13325.appspot.com",
  messagingSenderId: "83251977012",
  appId: "1:83251977012:web:c2bbdf5eacd279c657e361",
  measurementId: "G-Z7M3FF0BG6"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

const firestore = firebase.firestore();


const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
    },
  ],
  iceCandidatePoolSize: 10,
};

//Global state:
let pc = new RTCPeerConnection(servers);

let localStream = null; //your webcam
let remoteStream = null; //your friend's webcam

// HTML elements
const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');
