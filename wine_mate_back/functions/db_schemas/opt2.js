const style1 = {
  name: "Light-bodied aromatic fresh reds",
  id: "style1"
};

const country1 = {
  name: "France"
};

const country2 = {
  name: "Portugal"
};

const country3 = {
  name: "New Zealand"
};

//

const region1 = {
  name: "Burgundy",
  country: "France",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  countryRefs: [country1],
  grapesRefs: [grape1],
  producersRefs: [],
  total: 10,
  style1: 7,
  style1Percent: 0.7,
  style2: 2,
  style2Percent: 0.2,
  style3: 1,
  style3Percent: 0.1,
  style4: 0,
  style4Percent: 0,
  style5: 0,
  style5Percent: 0,
  style6: 0,
  style6Percent: 0,
  style7: 0,
  style7Percent: 0
};

const grape1 = {
  name: "Pinot Noir",
  country_refs: [country1, country2, country3],
  region_refs: [region1],
  producer_refs: [producer1],
  total: 10,
  style1: 6,
  style1Percent: 0.6,
  style2: 3,
  style2Percent: 0.3,
  style3: 1,
  style3Percent: 0.1,
  style4: 0,
  style4Percent: 0,
  style5: 0,
  style5Percent: 0,
  style6: 0,
  style6Percent: 0,
  style7: 0,
  style7Percent: 0
};

const producer1 = {
  name: "Villa Maria",
  country_refs: [country3],
  region_refs: [],
  grape_refs: [grape1],
  total: 10,
  style1: 6,
  style1Percent: 0.6,
  style2: 3,
  style2Percent: 0.3,
  style3: 1,
  style3Percent: 0.1,
  style4: 0,
  style4Percent: 0,
  style5: 0,
  style5Percent: 0,
  style6: 0,
  style6Percent: 0,
  style7: 0,
  style7Percent: 0
};

const wine1 = {
  name: "Villa Maria Ninot Noir",
  images: [],
  roles: {
    userId_1: "owner",
    userId_2: "editor",
    userId_3: "editor"
  }
};

const user1 = {
  savedWines: [wine1]
};
