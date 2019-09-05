const admin = require("firebase-admin");

// Initialize with Firebase sercice account credentials
// Firebase -> Project settings -> Service accounts
const serviceAccount = require("../wine-mate-firebase-adminsdk-8fe3y-cd0926ff37.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wine-mate.firebaseio.com"
});
//
// admin.initializeApp();

const db = admin.firestore();

//
const defaultLangCode = "en";

module.exports = { admin, db, defaultLangCode };
