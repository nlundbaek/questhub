const answers = require('./answer');
const questions = {};

// data
questions.data = [
  {
    name:'john',
    title:"fuck windows",
    question:'Why does this shit not work :((',
    timestamp: new Date()
  },
  {
    name:'niklas',
    title:"kasper pls",
    question:'stop discussing this shit kasper!!!',
    timestamp: new Date()
  }];

// Add Question
questions.add = (name,title, question) => {
  if(name !== "" && title !== "" && question !=="") {
    questions.data.push({
      name: name,
      title: title,
      question: question,
      timestamp: new Date(),
      answer: []
    });
  }
};
// Get all questions
questions.getAll = () => {
  questions.data.forEach((question, index) => {
    question.answers = answers.getAllByQuestionID(index);
  });
  return questions.data;
};


// Get question by index
questions.getByIndex = (index) => {
  if (questions.data[index] === -1){
  return null;
  }else{
    return questions.data[index]
  }
};

module.exports = questions;

