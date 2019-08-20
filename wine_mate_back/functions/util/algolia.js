const functions = require("firebase-functions");
// run this in console to make functions.config() accessable from localhost
// firebase functions:config:get > .runtimeconfig.json
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = "wines";

module.exports = {
  ALGOLIA_ID,
  ALGOLIA_ADMIN_KEY,
  ALGOLIA_SEARCH_KEY,
  ALGOLIA_INDEX_NAME
};
