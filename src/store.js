import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex);

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
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});


export default new Vuex.Store({
  //     _        _
  //  __| |_ __ _| |_ ___
  // (_-<  _/ _` |  _/ -_)
  // /__/\__\__,_|\__\___|
  state: {
    verses: [],
    currentVerse: undefined,
    activeTheme: localStorage.getItem("activeTheme") || "light",
  },

  //                     _ _
  //  __ ___ _ __  _ __ (_) |_ ___
  // / _/ _ \ '  \| '  \| |  _(_-<
  // \__\___/_|_|_|_|_|_|_|\__/__/
  mutations: {
    verses(state, verses) {
      state.verses = verses;
      state.currentVerse = verses[0];
    },
    toggleTheme(state) {
      if (state.activeTheme === "light")
        state.activeTheme = "dark";
      else
        state.activeTheme = "light";
    }
  },

//     _ _               _      _
//  __| (_)____ __  __ _| |_ __| |_
// / _` | (_-< '_ \/ _` |  _/ _| ' \
// \__,_|_/__/ .__/\__,_|\__\__|_||_|
//           |_|
  actions: {
    fetchVerses({commit}) {
      db.collection("verses")
        .orderBy("start", "desc")
        .get()
        .then(querySnapshot => {
          commit("verses", querySnapshot.docs.map(docSnapshot => {
            let data = docSnapshot.data();
            data.start = new Date(data.start.seconds * 1000); //turn the timestamp into a Date
            return data
          }))
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
    newVerse(context, verse) {
      db.collection("verses")
        .add(verse)
        .then(docRef => console.log(`Added Verse ${docRef}`))
        .catch(reason => console.error("Failed to add verse", reason))
    }
  }

})
