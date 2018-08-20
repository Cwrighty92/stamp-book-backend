const mongoose = require('mongoose');
const { Schema } = mongoose;

const CitySchema = new Schema({
    city: {
        type: String,
        required: true
    },
    geolocation: {
        type: String,
        required: true
    },
    picture_url: {
        type: String,
        required: true
    },
    belongs_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
    }
});

module.exports = mongoose.model('cities', CitySchema);
