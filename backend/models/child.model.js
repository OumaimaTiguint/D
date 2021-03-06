const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    id: { type: Number, required: true },
    parentId: { type: Number, required: true },
    paidAmount: { type: Number, required: true }
},
{ collection : 'child' });

const Child = mongoose.model('Child', childSchema);

module.exports = Child;