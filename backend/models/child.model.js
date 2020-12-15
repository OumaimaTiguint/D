const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    id: { type: Number, required: true },
    parentId: { type: Number, required: true },
    paidAmount: { type: Number, required: true }
},
{
    timestamps: false
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;