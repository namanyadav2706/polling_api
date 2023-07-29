const Question = require('../models/question');
const Option = require('../models/option');

// To create a question
module.exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'title is mendatory for creating question',
      });
    }

    const question = await Question.create({
      title,
    });

    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {   
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// To create an option
module.exports.createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: 'text is mendatory for creating option',
      });
    }

    // find the question to connect the option
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found!',
      });
    }

    const option = await Option.create({
      text,
      question,
    });

    // create link_to_vote using _id of option
    const link_to_vote = `http://localhost:8000/options/${option.id}/add_vote`;

    option.link_to_vote = link_to_vote;

    option.save();

    // put reference of option to the question
    await question.updateOne({ $push: { options: option } });

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

// To delete a question
module.exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // find the question using id
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found',
      });
    }

    // if even one of the options of question has any vote. It  be dcannot be deleted
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: 'cannot delete question',
      });
    }

    // delete all the options of the question
    await Option.deleteMany({ question: questionId });

    // delete question
    await Question.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: 'question and associated options deleted successfully!',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// To view a question and it's options
module.exports.viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // populate question with all of its options
    const question = await Question.findById(questionId).populate({
      path: 'options',
      model: 'Option',
    });

    if (!question) {
      return res.status(400).json({
        message: 'question not found',
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {   
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
