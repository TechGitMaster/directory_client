const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () => {
    
    let schema_column = new Schema({
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        familyName: { type: String, required: true }, 
        givenName: { type: String, required: true }, 
        picture_URI: { type: String, required: true }
    }, { timestamps: true });

    if(mongoose.models['accounts']) return mongoose.models['accounts']
    return mongoose.model('accounts', schema_column);
}