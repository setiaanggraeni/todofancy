var firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyBALdwY-sDJ-k-t6zmviZxOzk3vwK9PmME',
  authDomain: 'blog-dfd9d.firebaseapp.com',
  databaseURL: 'https://blog-dfd9d.firebaseio.com',
  projectId: 'blog-dfd9d',
  storageBucket: 'blog-dfd9d.appspot.com',
  messagingSenderId: '249446853123'
}
firebase.initializeApp(config)

var provider = new firebase.auth.FacebookAuthProvider()

var auth = firebase.auth()

export {provider, auth}
