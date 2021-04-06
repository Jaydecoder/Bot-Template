const firebase = require("firebase")

const firebaseConfig = require('./firebaseconfig.json')
var initializefirebase = firebase.initializeApp(firebaseConfig);

database = firebase.database();

module.exports = {


savedata: function(ref,data){

    database.ref(ref).set(data, function(error) {if (error) {console.log("Failed with error: " + error)}})

},

 getdata:function(ref){

    
      return database.ref(ref).once('value').then(function(snapshot) { Data = snapshot.val();; return Data})

            
}
}
