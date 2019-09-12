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
  postWine,
  searchWine,
  deleteSearchObjects
} = require("./handlers/wines");
const {
  postNewRegion,
  postNewGrape,
  postNewProducer,
  deleteRegion,
  deleteGrape,
  deleteProducer,
  getExistingCountries,
  getFilters,
  getWineStyles
} = require("./handlers/filters");
const { getDictionary } = require("./handlers/ui");

// UI routes
app.get("/dict/:lang", getDictionary);

// wines routes
app.post("/wine", postWine);
app.post("/searchwines", searchWine);
app.post("/deletesearchobjects", deleteSearchObjects);

// filters routes
app.get("/styles", getWineStyles);
app.post("/filters", getFilters);
app.get("/countries", getExistingCountries);
app.post("/region", postNewRegion);
app.post("/grape", postNewGrape);
app.post("/producer", postNewProducer);
app.delete("/region/:regionId", deleteRegion);
app.delete("/grape/:grapeId", deleteGrape);
app.delete("/producer/:producerId", deleteProducer);

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

exports.onRegionCreated = functions
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

exports.onGrapeCreated = functions
  .region("europe-west1")
  .firestore.document("grapes/{grapeId}")
  .onCreate((snap, context) => {
    //
    const grapeId = context.params.grapeId;
    const grape = snap.data();
    const docs = [];
    if (grape.countriesRefs && grape.countriesRefs.length > 0) {
      grape.countriesRefs.forEach(code => {
        docs.push(db.doc(`countries/${code}`));
      });
    }
    return db
      .getAll(...docs)
      .then(docRefsArr => {
        let ind = -1;
        docRefsArr.forEach(docRef => {
          ind++;
          if (docRef.exists) {
            return docs[ind].update({
              grapesRefs: admin.firestore.FieldValue.arrayUnion(grapeId)
            });
          } else {
            return docs[ind].set({
              dicRef: grape.countriesDicRefs[ind],
              grapesRefs: [grapeId]
            });
          }
        });
      })
      .catch(err => console.log(err));
  });

exports.onProducerCreated = functions
  .region("europe-west1")
  .firestore.document("producers/{producerId}")
  .onCreate((snap, context) => {
    //
    const producerId = context.params.producerId;
    const producer = snap.data();

    return db
      .doc(`countries/${producer.countryRef}`)
      .get()
      .then(docRef => {
        if (docRef.exists) {
          return db.doc(`countries/${producer.countryRef}`).update({
            producersRefs: admin.firestore.FieldValue.arrayUnion(producerId)
          });
        } else {
          return db.doc(`countries/${producer.countryRef}`).set({
            dicRef: producer.countryDicRef,
            regionsRefs: [producerId]
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
    const grapesQuery = db
      .collection("grapes")
      .where("regionsRefs", "array-contains", regionId);
    const producersQuery = db
      .collection("producers")
      .where("regionsRefs", "array-contains", regionId);
    const countriesQuery = db.doc(`countries/${region.countryRef}`);

    return grapesQuery
      .get()
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`grapes/${docRef.id}`).update({
            regionsRefs: admin.firestore.FieldValue.arrayRemove(regionId)
          });
        });
        return producersQuery.get();
      })
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`producers/${docRef.id}`).update({
            regionsRefs: admin.firestore.FieldValue.arrayRemove(regionId)
          });
        });
        return countriesQuery.get();
      })
      .then(docRef => {
        if (docRef.exists) {
          return countriesQuery.update({
            regionsRefs: admin.firestore.FieldValue.arrayRemove(regionId)
          });
        }
      })
      .then(result => {
        return countriesQuery.get();
      })
      .then(docRef => deleteCountry(docRef, region.countryRef))
      .catch(err => {
        console.log(err);
      });
  });

exports.onGrapeDeleted = functions
  .region("europe-west1")
  .firestore.document("grapes/{grapeId}")
  .onDelete((snap, context) => {
    const grapeId = context.params.grapeId;
    const grape = snap.data();
    const regionsQuery = db
      .collection("regions")
      .where("grapesRefs", "array-contains", grapeId);
    const producersQuery = db
      .collection("producers")
      .where("grapesRefs", "array-contains", grapeId);

    const docs = [];
    if (grape.countriesRefs && grape.countriesRefs.length > 0) {
      grape.countriesRefs.forEach(code => {
        docs.push(db.doc(`countries/${code}`));
      });
    }
    return regionsQuery
      .get()
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`regions/${docRef.id}`).update({
            grapesRefs: admin.firestore.FieldValue.arrayRemove(grapeId)
          });
        });
        return producersQuery.get();
      })
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`producers/${docRef.id}`).update({
            grapesRefs: admin.firestore.FieldValue.arrayRemove(grapeId)
          });
        });
        return db.getAll(...docs);
      })
      .then(docRefsArr => {
        let ind = -1;
        docRefsArr.forEach(docRef => {
          ind++;
          if (docRef.exists) {
            docs[ind]
              .update({
                grapesRefs: admin.firestore.FieldValue.arrayRemove(grapeId)
              })
              .then(result => {
                console.log(result);
                return docs[ind].get();
              })
              .then(newDocRef => {
                console.log("newDocRef", newDocRef);
                deleteCountry(newDocRef, grape.countriesRefs[ind]);
              });
          }
        });
      })
      .catch(err => console.log(err));
  });

exports.onProducerDeleted = functions
  .region("europe-west1")
  .firestore.document("producers/{producerId}")
  .onDelete((snap, context) => {
    const producerId = context.params.producerId;
    const producer = snap.data();
    const regionsQuery = db
      .collection("regions")
      .where("producersRefs", "array-contains", producerId);
    const grapesQuery = db
      .collection("grapes")
      .where("producersRefs", "array-contains", producerId);
    const countriesQuery = db.doc(`countries/${producer.countryRef}`);

    return regionsQuery
      .get()
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`regions/${docRef.id}`).update({
            producersRefs: admin.firestore.FieldValue.arrayRemove(producerId)
          });
        });
        return grapesQuery.get();
      })
      .then(docRefs => {
        docRefs.forEach(docRef => {
          db.doc(`grapes/${docRef.id}`).update({
            producersRefs: admin.firestore.FieldValue.arrayRemove(producerId)
          });
        });
        return countriesQuery.get();
      })
      .then(docRef => {
        if (docRef.exists) {
          return countriesQuery.update({
            producersRefs: admin.firestore.FieldValue.arrayRemove(producerId)
          });
        }
      })
      .then(result => {
        return countriesQuery.get();
      })
      .then(docRef => deleteCountry(docRef, producer.countryRef))
      .catch(err => {
        console.log(err);
      });
  });

// ~~~~~~~~~~~~~~~~
// Util functions

const deleteCountry = (docRef, code) => {
  const regionsRefs = docRef.data().regionsRefs || [];
  const grapesRefs = docRef.data().grapesRefs || [];
  const producersRefs = docRef.data().producersRefs || [];

  if (
    regionsRefs.length === 0 &&
    grapesRefs.length === 0 &&
    producersRefs.length === 0
  ) {
    return db.doc(`countries/${code}`).delete();
  }
};
