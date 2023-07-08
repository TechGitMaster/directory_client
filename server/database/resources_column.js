const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () => {

    let schema_column = new Schema({
        title: { type: String, required: true },
        member: { type: String, required: true },
        year: { type: String, required: true },
        yearFilter: { type: String, required: true },
        course: { type: String, required: true },
        documentURI: { type: String, required: true },
        documentID: { type: String, required: true },
        enableComment: { type: String, required: true },
        dateUploaded: { type: String, required: true },
        selectedTop: { type: String, required: true },
        deleteNot: { type: String, required: true }
    }, { timestamps: true });

    if(mongoose.models['resouces_document']) return mongoose.models['resouces_document'];

    return mongoose.model('resouces_document', schema_column);
}