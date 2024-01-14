const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
      category: {
        type: String,
        // required: [true, 'Please provide design category'],
      },
      root: {
        type: String,
        enum: {
          values: ['Elements', 'Templates'],
          message: '{VALUE} is not supported',
        },
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
      },
      rootImage: {
        type: String,
        default: '/uploads/example.jpeg',
      },
      title: {
        type: String,
        // required: [true, 'Please provide title'],
        maxlength: [100, 'not more than 100 characters'],
      },
      figmaLink: {
        type: String,
        // required: [true, 'Please provide a Figma link'],
    },
      tags: {
        type: [String],
        maxlength: [20, 'not more than 20 characters'],
      },
      free: {
        type: Boolean,
        required : true,
        default: true,
      },
      image: {
        type: String,
        default: '/uploads/example.jpeg',
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Design', DesignSchema);
