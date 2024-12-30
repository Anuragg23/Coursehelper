const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const courseSchema = mongoose.Schema({
    image: String,
    name: String,
    code:String,
    credit:Number,
    Description:String
})

module.exports = mongoose.model("course",courseSchema);                       