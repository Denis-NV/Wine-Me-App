const { db, defaultLangCode } = require("../util/admin");

exports.getDictionary = (req, res) => {
  let dict = {};
  //
  db.doc(`/dictionary/${defaultLangCode}`)
    .get()
    .then(docRef => {
      dict = { ...docRef.data() };
      //
      // console.log(req.params.lang);
      if (req.params.lang !== defaultLangCode)
        return db.doc(`/dictionary/${req.params.lang}`).get();
      else res.json(dict);
    })
    .then(docRef => {
      dict = { ...dict, ...docRef.data() };
      //
      res.json(dict);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
