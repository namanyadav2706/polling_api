const mongoose = require('mongoose');

// schema for the question
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
    totalVotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
