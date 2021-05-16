const admin = require('firebase-admin')
const serviceAccount = require('./firebaseconfig.json')
var keygen = require("keygenerator");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

module.exports = {
    getUserInfo: async(collection,id) => {
        
    
        return db.collection(collection).doc(id)
        .get().then(doc => {
            if(doc.exists){
                
                return doc.data();
            } else return;
        
        })
    },
    setUserInfo: async function(collection,Data) {
        
       if(!Data["DataId"]){
            id =keygen._()
            Data["DataId"] = id
       }
        
    
        return db.collection(collection).doc(Data["DataId"])
        .set(Data).then(doc => 
        {
            
            console.log("written new info to the database!")
        })
    },
    getCollectionInfo: async (collection) => {
        const snapshot = await db.collection(collection).get()
        return snapshot.docs.map(doc => doc.data());
    },
    UpdateUserInfo: async function(collection,Data) {
        return db.collection(collection).doc(Data["DataId"])
        .update(Data).then(doc => 
        {
            
            console.log("Updated new info to the database!")
        })
    },
    DeleteUserInfo: async function(collection, Data){
        return db.collection(collection).doc(Data["DataId"])
        .delete().then(doc => 
        {
            
            console.log("Deleted new info in the database!")
        })
    }
}
