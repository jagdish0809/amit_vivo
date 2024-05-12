const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  profession: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
    required: true
  },
  handset: {
    type: String,
  },
  city: {
    type: String,
  },
  attraction: {
    type: String,
  },
  usedVivoBefore: {
    type: String,
  },
  cameraModulePreference: {
    type: String,
  },
  favoriteFeatureV30e: {
    type: String,
  },
  portraitExperience: {
    type: String,
  },
  standoutFeature: {
    type: String,
  },
  attractFeature:{
    type: String,
  },
  imageUrl: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
