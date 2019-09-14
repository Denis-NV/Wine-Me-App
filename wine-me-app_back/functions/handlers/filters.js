const { db, defaultLangCode } = require("../util/admin");
//
exports.getWineStyles = (req, res) => {
  db.doc("/config/wine_styles")
    .get()
    .then(docRef => {
      const styleNames = Object.keys(docRef.data());
      const orderedStyles = [];

      styleNames.forEach(key =>
        orderedStyles.push({ ...docRef.data()[key], id: key })
      );

      orderedStyles.sort(function(a, b) {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });

      res.json(orderedStyles);
    })
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

exports.getFilters = (req, res) => {
  const currentLang = req.body.currentLang || defaultLangCode;
  const selectedCountries = req.body.selectedCountries || [];
  const sortSubKey = `${req.body.selectedStyle}_percent`;
  const sortKey = "styles";
  const orderKey = `${sortKey}.${sortSubKey}`;
  const limit = Math.round(30 / (selectedCountries.length || 1));
  //
  const filters = [
    { colRef: db.collection("regions"), query: [], data: [], key: "regions" },
    { colRef: db.collection("grapes"), query: [], data: [], key: "grapes" },
    {
      colRef: db.collection("producers"),
      query: [],
      data: [],
      key: "producers"
    }
  ];

  if (selectedCountries.length > 0) {
    selectedCountries.forEach(code => {
      filters[0].query.push(
        filters[0].colRef
          .where(orderKey, ">", 0)
          .where("countryRef", "==", code)
          .orderBy(orderKey, "desc")
          .limit(limit)
      );
      filters[1].query.push(
        filters[1].colRef
          .where(orderKey, ">", 0)
          .where("countriesRefs", "array-contains", code)
          .orderBy(orderKey, "desc")
          .limit(limit)
      );
      filters[2].query.push(
        filters[2].colRef
          .where(orderKey, ">", 0)
          .where("countryRef", "==", code)
          .orderBy(orderKey, "desc")
          .limit(limit)
      );
    });
  } else {
    filters[0].query.push(
      filters[0].colRef
        .where(orderKey, ">", 0)
        .orderBy(orderKey, "desc")
        .limit(limit)
    );
    filters[1].query.push(
      filters[1].colRef
        .where(orderKey, ">", 0)
        .orderBy(orderKey, "desc")
        .limit(limit)
    );
    filters[2].query.push(
      filters[2].colRef
        .where(orderKey, ">", 0)
        .orderBy(orderKey, "desc")
        .limit(limit)
    );
  }

  const constructResponse = stage => {
    filters[stage].query[0]
      .get()
      .then(docRefs => {
        docRefs.forEach(docRef => {
          const found = filters[stage].data.find(item => {
            return item.id === docRef.id;
          });
          if (!found)
            filters[stage].data.push({
              ...docRef.data(),
              id: docRef.id,
              name:
                docRef.data().nameDic[currentLang] ||
                docRef.data().nameDic[defaultLangCode] ||
                docRef.data().nameDic[docRef.data().nativeLangCode]
            });
        });

        filters[stage].query.shift();

        const sortStageFilter = filter => {
          filter.data = filter.data.sort((a, b) => {
            if (a[sortKey][sortSubKey] > b[sortKey][sortSubKey]) return -1;
            if (a[sortKey][sortSubKey] < b[sortKey][sortSubKey]) return 1;
            return 0;
          });
        };

        if (filters[stage].query.length > 0) constructResponse(stage);
        else if (stage < filters.length - 1) {
          sortStageFilter(filters[stage]);

          constructResponse(stage + 1);
        } else {
          sortStageFilter(filters[stage]);

          let filtersObj = {};
          filters.forEach(item => (filtersObj[item.key] = item.data));
          res.json(filtersObj);
        }
      })
      .catch(err => {
        res.status(500).json({ Error: "Something went wrong!!!" });
        console.error(err);
      });
  };

  constructResponse(0);
};

exports.getExistingCountries = (req, res) => {
  db.collection("countries")
    .orderBy("dicRef", "asc")
    .get()
    .then(docsArr => {
      let countries = [];
      docsArr.forEach(docRef => {
        countries.push({
          code: docRef.id,
          ...docRef.data()
        });
      });
      return res.json(countries);
    })
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

exports.postNewRegion = (req, res) => {
  const nowISOstr = new Date().toISOString();
  //
  const newRegion = {
    nameDic: req.body.nameDic ? req.body.nameDic : {},
    countryRef: req.body.countryRef,
    countryDicRef: req.body.countryDicRef,
    nativeLangCode: req.body.nativeLangCode,
    imageURL: req.body.imageURL || "",
    createdAt: nowISOstr,
    updatedAt: nowISOstr,
    grapesRefs: req.body.grapesRefs || [],
    producersRefs: req.body.producersRefs || [],
    styles: {}
  };

  db.doc("/config/wine_styles")
    .get()
    .then(docRef => {
      newRegion.styles = {
        ...construcStylesRankingObj(Object.keys(docRef.data()))
      };

      return db.collection("regions").add(newRegion);
    })
    .then(docRef => res.json({ ...newRegion, id: docRef.id }))
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

exports.postNewGrape = (req, res) => {
  const nowISOstr = new Date().toISOString();
  //
  const newGrape = {
    nameDic: req.body.nameDic ? req.body.nameDic : {},
    countriesRefs: req.body.countriesRefs,
    nativeLangCode: req.body.nativeLangCode,
    countriesDicRefs: req.body.countriesDicRefs,
    imageURL: req.body.imageURL || "",
    createdAt: nowISOstr,
    updatedAt: nowISOstr,
    regionsRefs: req.body.regionsRefs || [],
    producersRefs: req.body.producersRefs || [],
    styles: {}
  };

  db.doc("/config/wine_styles")
    .get()
    .then(docRef => {
      newGrape.styles = {
        ...construcStylesRankingObj(Object.keys(docRef.data()))
      };

      return db.collection("grapes").add(newGrape);
    })
    .then(docRef => res.json({ ...newGrape, id: docRef.id }))
    .catch(err => {
      res.status(500).json({ Error: "Something went wrong!!!" });
      console.error(err);
    });
};

exports.postNewProducer = (req, res) => {
  const nowISOstr = new Date().toISOString();
  //
  const newProducer = {
    nameDic: req.body.nameDic ? req.body.nameDic : {},
    countryRef: req.body.countryRef,
    nativeLangCode: req.body.nativeLangCode,
    countryDicRef: req.body.countryDicRef,
    imageURL: req.body.imageURL || "",
    createdAt: nowISOstr,
    updatedAt: nowISOstr,
    grapesRefs: req.body.grapesRefs || [],
    regionsRefs: req.body.regionsRefs || [],
    styles: {}
  };

  db.doc("/config/wine_styles")
    .get()
    .then(docRef => {
      newProducer.styles = {
        ...construcStylesRankingObj(Object.keys(docRef.data()))
      };

      return db.collection("producers").add(newProducer);
    })
    .then(docRef => res.json({ ...newProducer, id: docRef.id }))
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
      res.json({
        message: `Region ${req.params.regionId} successfully deleted`
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteGrape = (req, res) => {
  const documnet = db.doc(`/grapes/${req.params.grapeId}`);
  //
  documnet
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Grape not found" });
      } else {
        return documnet.delete();
      }
    })
    .then(() => {
      res.json({
        message: `Region ${req.params.grapeId} successfully deleted`
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteProducer = (req, res) => {
  const documnet = db.doc(`/producers/${req.params.producerId}`);
  //
  documnet
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Producer not found" });
      } else {
        return documnet.delete();
      }
    })
    .then(() => {
      res.json({
        message: `Producer ${req.params.producerId} successfully deleted`
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

// ~~~~~~~~~~~~~~
// Util functions

const construcStylesRankingObj = keys => {
  let rankings = {
    total: 0,
    redTotal: 0,
    whiteTotal: 0,
    roseTotal: 0
  };

  keys.forEach(key => {
    rankings[`${key}`] = 0;
    rankings[`${key}_percent`] = 0;
  });

  return rankings;
};
