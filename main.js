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


//setup Media Sources
webcamButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  remoteStream = new MediaStream();

  //push tracks from local stream to peer connections
  localStream.getTracks().forEach((track)=>{
    pc.addTrack(track, localStream);
  });

  //pull tracks from remote stream and add to video stream
  pc.ontrack = event => {
    event.streams[0].getTracks().forEach((track)=>{
      remoteStream.addTrack(track);
    });
  }

  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
};