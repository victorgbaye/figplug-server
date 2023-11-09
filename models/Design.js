const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
        minlength: 3,
        maxlength: 50,
      },


})

module.exports = mongoose.model('Design', DesignSchema);
