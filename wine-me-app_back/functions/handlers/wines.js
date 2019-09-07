const { db, defaultLangCode } = require("../util/admin");
const algoliasearch = require("algoliasearch");
const {
  ALGOLIA_ID,
  ALGOLIA_ADMIN_KEY,
  ALGOLIA_SEARCH_KEY,
  ALGOLIA_INDEX_NAME
} = require("../util/algolia");

const styles = {
  total: 0,
  style1: 0,
  style1Percent: 0,
  style2: 0,
  style2Percent: 0,
  style3: 0,
  style3Percent: 0,
  style4: 0,
  style4Percent: 0,
  style5: 0,
  style5Percent: 0,
  style6: 0,
  style6Percent: 0,
  style7: 0,
  style7Percent: 0,
  style8: 0,
  style8Percent: 0
};

exports.getExistingCountries = (req, res) => {
  // db.collection("countries")
};

exports.postNewRegion = (req, res) => {
  const nowISOstr = new Date().toISOString();
  //
  const newRegion = {
    dictionary: req.body.dictionary ? req.body.dictionary : {},
    countryRef: req.body.countryRef,
    countryDicRef: req.body.countryDicRef,
    createdAt: nowISOstr,
    updatedAt: nowISOstr,
    grapesRefs: [],
    producersRefs: [],
    ...styles
  };

  db.collection("regions")
    .add(newRegion)
    .then(docRef => {
      const resRegion = newRegion;
      resRegion.regionId = docRef.id;

      res.json(resRegion);
    })
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

exports.deleteRegion = (req, res) => {
  const documnet = db.doc(`/regions/${req.params.regionId}`);
  //
  documnet
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Region not found" });
      } else {
        return documnet.delete();
      }
    })
    .then(() => {
      res.json({ message: "Region successfully deleted" });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.postNewGrape = (req, res) => {
  const nowISOstr = new Date().toISOString();
  //
  const newGrape = {
    name: req.body.name,
    createdAt: nowISOstr,
    updatedAt: nowISOstr,
    countries: [],
    regions: [],
    producers: [],
    ...styles
  };

  db.collection("grapes")
    .add(newGrape)
    .then(docRef => {
      const resGrape = newGrape;
      resGrape.regionId = docRef.id;

      res.json(resGrape);
    })
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

const populateDict = (
  dictEntries,
  dictMap,
  defaultLangCode,
  newlangCode,
  dict = {}
) => {
  dictEntries.forEach(entry => {
    if (entry !== "") {
      if (!dict[entry]) dict[entry] = {};

      if (!dict[entry][defaultLangCode])
        dict[entry][defaultLangCode] = dictMap[entry];

      if (newlangCode) {
        if (!dict[entry][newlangCode])
          dict[entry][newlangCode] = dictMap[entry]
            ? dictMap[entry]
            : dict[entry][defaultLangCode];
      }
    }
  });

  return dict;
};

const formWineSearchStr = (
  dict,
  defaultLangCode,
  nativeLangCode,
  nameRef,
  regionRef,
  producerRef,
  grapesRefs
) => {
  let searchStr = "";

  if (nameRef !== "") {
    searchStr = searchStr.concat(`${dict[nameRef][defaultLangCode]} `);

    if (dict[nameRef][defaultLangCode] !== dict[nameRef][nativeLangCode])
      searchStr = searchStr.concat(`${dict[nameRef][nativeLangCode]} `);
  }

  if (producerRef !== "") {
    searchStr = searchStr.concat(`${dict[producerRef][defaultLangCode]} `);

    if (
      dict[producerRef][defaultLangCode] !== dict[producerRef][nativeLangCode]
    )
      searchStr = searchStr.concat(`${dict[producerRef][nativeLangCode]} `);
  }

  grapesRefs.forEach(ref => {
    if (ref !== "") {
      searchStr = searchStr.concat(`${dict[ref][defaultLangCode]} `);

      if (dict[ref][defaultLangCode] !== dict[ref][nativeLangCode])
        searchStr = searchStr.concat(`${dict[ref][nativeLangCode]} `);
    }
  });

  if (regionRef !== "") {
    searchStr = searchStr.concat(`${dict[regionRef][defaultLangCode]} `);

    if (dict[regionRef][defaultLangCode] !== dict[regionRef][nativeLangCode])
      searchStr = searchStr.concat(`${dict[regionRef][nativeLangCode]} `);
  }

  return searchStr;
};

exports.postWine = (req, res) => {
  const { nativeLangCode, style, name, region, producer, grapes } = req.body;

  // TODO:
  // [-] validation
  if (!nativeLangCode) {
    return res
      .status(400)
      .json({ Error: "Native language code must be provided" });
  }

  const dictEntries = [
    style.dicRef,
    name.dicRef,
    region.dicRef,
    producer.dicRef,
    ...Object.values(grapes)
  ];

  let dict = {};

  let newWine = {};

  db.collection("dictionary")
    .doc(defaultLangCode)
    .get()
    .then(docRef => {
      if (docRef.exists) {
        dict = populateDict(dictEntries, docRef.data(), defaultLangCode);

        return db
          .collection("dictionary")
          .doc(nativeLangCode)
          .get();
      } else {
        console.error(`No default ${defaultLangCode} language document!`);

        return res
          .status(400)
          .json({ Error: `No default ${defaultLangCode} language document!` });
      }
    })
    .then(docRef => {
      if (docRef.exists) {
        dict = populateDict(
          dictEntries,
          docRef.data(),
          defaultLangCode,
          nativeLangCode,
          { ...dict }
        );
        // res.json(dict);
        // Creating and Posting new Wine document starts here

        const searchStr = formWineSearchStr(
          dict,
          defaultLangCode,
          nativeLangCode,
          name.dicRef,
          region.dicRef,
          producer.dicRef,
          Object.values(grapes)
        );

        const nowISOstr = new Date().toISOString();

        newWine = {
          createdAt: nowISOstr,
          updatedAt: nowISOstr,
          nativeLangCode,
          style, // {idRef : id, dicRef: id}
          name, // {dicRef: id}
          region, // {idRef : id, dicRef: id}
          producer, // {idRef : id, dicRef: id}
          grapes, // {idRef1 : dicRef1, idRef2 : dicRef2}
          searchStr: searchStr
          // images: [],
          // roles: {
          //   userId_1: "owner",
          //   userId_2: "editor",
          //   userId_3: "editor"
          // }
        };

        //res.json(newWine);
        return db.collection("wines").add(newWine);
      } else {
        console.error(`No native ${nativeLangCode} language document!`);

        return res.status(400).json({
          Error: `No native ${nativeLangCode} language document!`
        });
      }
    })
    .then(docRef => {
      newWine.wineId = docRef.id;
      res.json(newWine);
      // res.json({ Message: "New wine successfully added to DB", id: docRef.id });
    })
    .catch(err => {
      console.error(err);

      return res.status(500).json({ Error: "Something went wrong!!!" });
    });
};

exports.searchWine = (req, res) => {
  //
  const search_key = req.body.key;

  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  index.setSettings({
    searchableAttributes: ["searchStr"]
  });

  // Perform an Algolia search:
  index
    .search({
      query: search_key
    })
    .then(function(responses) {
      res.json(responses.hits);
    })
    .catch(err => {
      console.log(err);
      res.json({ Error: err });
    });
};

exports.deleteSearchObjects = (req, res) => {
  //
  const iDs = req.body.iDs;

  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  // Perform an Algolia search:
  index.deleteObjects(iDs, (err, content) => {
    if (err) throw err;

    console.log(content);

    res.json(content);
  });
};
