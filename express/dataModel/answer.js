
const answers = {};

answers.data = [{
  name:"peter",
  answer:"not my problem",
  rating:1,
  questionID:1,
  timestamp: new Date()

},
  {
    name:"magnus",
    answer:"indeed stop this madness",
    rating:1,
    questionID:0,
    timestamp: new Date()

  },
];

// Add answer
answers.add = (name, answer, questionID) => {
   let newAnswer = {
    name:name,
    answer:answer,
    rating:0,
    questionID:questionID,
    timestamp: new Date()
  };
  answers.data.push(newAnswer);
  return newAnswer;
};

// Get all by question ID
answers.getAllByQuestionID = (index) =>{

  return answers.data.filter((data) => {
    return data.questionID === index;
  })
};

// upvote answer
answers.upVote =(index, questionID) =>{
  answers.getAllByQuestionID(questionID)[index].rating++;
};
// downvote answer
answers.downVote =(index, questionID) =>{
  answers.getAllByQuestionID(questionID)[index].rating--;
};
// get answer by index
answers.getByIndex = (index) => {
  if (answers.data[index] === -1){

  }else{
    return answers.data[index]
  }
};

module.exports = answers;
