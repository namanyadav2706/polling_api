const Option = require('../models/option');
const Question = require('../models/question');

// to delete an option
module.exports.deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option is not available',
      });
    }

    // if the option have minimum 1 vote then dont delete the option
    if (option.votes > 0) {
      return res.status(400).json({
        message: 'this option cannot be deleted',
      });
    }

    //find the question
    const question = await Question.findById(option.question);

    // remove reference of this option from question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // delete the option
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: 'option has been deleted successfully!',
    });
  } catch (err) {   
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// To increase the count of votes of the option
module.exports.addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option not found',
      });
    }

    // add one to the value of votes of option
    option.votes += 1;

    option.save();

    // add one to the value of total votes of question
    const question = await Question.findById(option.question);
    question.totalVotes += 1;

    question.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
