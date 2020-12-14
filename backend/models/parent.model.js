const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    id: { type: Number, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    totalAmount: { type: Number, required: true }
},
{
    timestamps: true
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;