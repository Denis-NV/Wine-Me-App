const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

//const { db } = require("./util/admin");

const { postNewRegion, postWine, postNewGrape } = require("./handlers/wines");

// wine routes
app.post("/region", postNewRegion);
app.post("/wine", postWine);
app.post("/grape", postNewGrape);

// user routes

// https://baseurl.com/api/
exports.api = functions.region("europe-west1").https.onRequest(app);
