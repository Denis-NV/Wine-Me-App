const admin = require("firebase-admin");

// dev
const serviceAccount = require("../wine-mate-firebase-adminsdk-8fe3y-cd0926ff37.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wine-mate.firebaseio.com"
});
// live
// admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };
