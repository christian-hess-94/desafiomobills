import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBvuUnBSF71IMkHLJjKjI_e4854C9x_jhY",
    authDomain: "desafiomobills.firebaseapp.com",
    databaseURL: "https://desafiomobills.firebaseio.com",
    projectId: "desafiomobills",
    storageBucket: "",
    messagingSenderId: "431861038628",
    appId: "1:431861038628:web:750ad3496cfddb84"
};

firebase.initializeApp(firebaseConfig);

//Constantes com contexto de conexão para os serviços do firebase
export const firebaseAuth = firebase.auth(); //Contexto de autenticação
export const firebaseFirestore = firebase.firestore(); //Contexto do banco firestore

export default firebase;
