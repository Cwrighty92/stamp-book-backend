const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { City, Country, Landmark, Photo, User } = require("../models");
const {
  formatData,
  formatSingleCountry,
  formatRef,
  formatCityData,
  formatLandmarkData,
  formatSingleUser,
  formatPhotoData
} = require("../utils/index");

const seedDB = ({
  citiesData,
  countriesData,
  landmarksData,
  photosData,
  usersData
}) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      let formattedCountryData = formatData(countriesData, formatSingleCountry);
      return Promise.all([Country.insertMany(formattedCountryData)]);
    })
    .then(([countryDocs]) => {
      let countryRef = formatRef(countriesData, countryDocs);
      const formattedCityData = formatCityData(citiesData, countryRef);
      return Promise.all([City.insertMany(formattedCityData)]);
    })
    .then(([cityDocs]) => {
      let cityRef = formatRef(citiesData, cityDocs);
      const formattedUserData = formatData(usersData, formatSingleUser);
      const formattedLandmarkData = formatLandmarkData(landmarksData, cityRef);
      return Promise.all([
        Landmark.insertMany(formattedLandmarkData),
        User.insertMany(formattedUserData),
        cityRef
      ]).then(([landmarkDocs, userDocs, cityRef]) => {
        let userRef = formatRef(usersData, userDocs);
        let landmarkRef = formatRef(landmarksData, landmarkDocs);
        const formattedPhotoData = formatPhotoData(
          photosData,
          landmarkRef,
          userRef,
          cityRef
        );
        return Promise.all([Photo.insertMany(formattedPhotoData)]);
      });
    })
    .catch(console.log);
};

module.exports = seedDB;
