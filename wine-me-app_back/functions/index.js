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
const { db, admin } = require("./util/admin");

const {
  postNewRegion,
  deleteRegion,
  postWine,
  postNewGrape,
  searchWine,
  deleteSearchObjects,
  getExistingCountries
} = require("./handlers/wines");

const { getDictionary } = require("./handlers/ui");

// UI routes
app.get("/dict/:lang", getDictionary);

// wine routes
app.get("/countries", getExistingCountries);
app.post("/region", postNewRegion);
app.delete("/region/:regionId", deleteRegion);
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

exports.updateCountryOnRegionCreate = functions
  .region("europe-west1")
  .firestore.document("regions/{regionId}")
  .onCreate((snap, context) => {
    //
    const regionId = context.params.regionId;
    const region = snap.data();

    return db
      .doc(`countries/${region.countryRef}`)
      .get()
      .then(docRef => {
        if (docRef.exists) {
          return db.doc(`countries/${region.countryRef}`).update({
            regionsRefs: admin.firestore.FieldValue.arrayUnion(regionId)
          });
        } else {
          return db.doc(`countries/${region.countryRef}`).set({
            dicRef: region.countryDicRef,
            regionsRefs: [regionId]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

exports.onRegionDeleted = functions
  .region("europe-west1")
  .firestore.document("regions/{regionId}")
  .onDelete((snap, context) => {
    const regionId = context.params.regionId;
    const region = snap.data();

    return db
      .doc(`countries/${region.countryRef}`)
      .get()
      .then(docRef => {
        if (docRef.exists) {
          const regionsRefs = docRef.data().regionsRefs;

          if (regionsRefs.length === 1 && regionsRefs[0] === regionId) {
            return db.doc(`countries/${region.countryRef}`).delete();
          } else {
            return db.doc(`countries/${region.countryRef}`).update({
              regionsRefs: admin.firestore.FieldValue.arrayRemove(regionId)
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
