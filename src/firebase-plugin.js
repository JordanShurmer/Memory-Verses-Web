import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyATWwSq9MmrjQDyDOX89YsxZIeEZcixQWY",
  authDomain: "memory-verses-fd479.firebaseapp.com",
  databaseURL: "https://memory-verses-fd479.firebaseio.com",
  projectId: "memory-verses-fd479",
  storageBucket: "memory-verses-fd479.appspot.com",
  messagingSenderId: "840411993053"
};
firebase.initializeApp(config);


//Export a Vue Plugin object
//https://vuejs.org/v2/guide/plugins.html
export default {
  install(Vue, options) {
    let db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    Vue.prototype.$firestore = db;
    Vue.prototype.$verses = db.collection("verses");
  }
}
