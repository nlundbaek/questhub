//import {getStatsConfig as bcrypt} from "@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/stats";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const questions = require('./dataModel/question');
const answer = require('./dataModel/answer');
const checkJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const app = express();
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../dist/mandatory_exercise'));

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.send(200);
  }
  else {
    // move on
    next();
  }
});

app.use(
  checkJwt({ secret: process.env.JWT_SECRET })
    .unless({ path : '/api/authenticate'})
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.message });
  }
});

/**** Mock User Data ****/
let users = [
  { name : "niklas", hash : "" }
];

bcrypt.hash("spawn4ever", 10, function(err, hash) {
  users[0].hash = hash;
  console.log("Mock hash generated");
});


/**** Routes ****/
//post auth
app.post('/api/authenticate', (req, res) => {
  console.log("auth!!");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + ", " + password);

  const user = users.find((user) => user.name === username);
  if (user) {
    bcrypt.compare(password, user.hash, (err, result) => {
      if (result) {

        const payload = {
          username: username,
          admin: false
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
          message: 'User authenticated succesfully',
          token: token
        });
      }
      else res.status(401).json({message: "Password mismatch!"})
    });
  } else {
    res.status(404).json({message: "User not found!"});
  }
});



// Get all questions
app.get('/api/questions/get/all', (req,res) => res.json(questions.getAll()));

// Get question by ID
app.get('/api/questions/get/:questionIndex',(req,res)=> {
  const questionIndex = req.param('questionIndex');
  const question = questions.getByIndex(questionIndex);
  if(question){
    res.json(question);
  }else{
    res.json({status:"not found"})
  }

});
// Get answers by Question ID
app.get('/api/answers/get/getByQuestionID',(req,res) =>{
  const questionIndex = req.param('questionIndex');
  res.json(answer.getAllByQuestionID(questionIndex))
});
// Add question to data
app.post('/api/questions/add', (req,res)=> {
  const name = req.body.name;
  const title = req.body.title;
  const question = req.body.question;
  res.json(questions.add(name,title,question));

});
// Add answer to data
app.post('/api/answers/add',(req,res) => {
  const name = req.body.name;
  const answer1 = req.body.answer;
  const questionID = req.body.questionID;
  res.json(answer.add(name,answer1,questionID));
});

app.put('/api/answers/upVote',(req,res) => {
  const questionID = req.body.questionID;
  const answerIndex = req.body.answerIndex;
  res.json(answer.upVote(answerIndex, questionID))
});

app.put('/api/answers/downVote',(req,res) => {
  const questionID = req.body.questionID;
  const answerIndex = req.body.answerIndex;
  res.json(answer.downVote(answerIndex, questionID))
});



/**** Reroute all unknown requests to angular index.html ****/
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/mandatory_exercise/index.html'));
});


/**** Start ****/
app.listen(port, () => console.log(`Mandatory exercise API running on port ${port}!`));

