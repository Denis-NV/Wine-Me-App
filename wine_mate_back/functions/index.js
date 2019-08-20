const functions = require("firebase-functions");
const app = require("express")();

// ALGOLIA
const algoliasearch = require("algoliasearch");
const {
  ALGOLIA_ID,
  ALGOLIA_ADMIN_KEY,
  ALGOLIA_INDEX_NAME
} = require("./util/algolia");

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// CORS
const cors = require("cors");

app.use(cors());

// CUSTOM
//const { db } = require("./util/admin");

const {
  postNewRegion,
  postWine,
  postNewGrape,
  searchWine,
  deleteSearchObjects
} = require("./handlers/wines");

// wine routes
app.post("/region", postNewRegion);
app.post("/wine", postWine);
app.post("/searchwines", searchWine);
app.post("/deletesearchobjects", deleteSearchObjects);
app.post("/grape", postNewGrape);

// user routes

// https://baseurl.com/api/
exports.api = functions.region("europe-west1").https.onRequest(app);

// TRIGGERS
// TODO: Create onDelete trigger when deleteWine function is also created
exports.onWineCreated = functions
  .region("europe-west1")
  .firestore.document("wines/{wineId}")
  .onCreate((snap, context) => {
    // Get the wine document
    const wine = snap.data();

    // Add an 'objectID' field which Algolia requires
    wine.objectID = context.params.wineId;

    // Write to the algolia index
    // OUTBOUND REQUESTS TO THIRD-PARTY APIs NOT AVAILABLE ON FREE SPARK PLAN
    // https://firebase.google.com/pricing/
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    return index.saveObject(wine);
  });
