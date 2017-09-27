//variables that need a global scope
let quizChoice;


function startQuiz(){//prompts user to choose quiz
  let begin = prompt("Please choose Quiz1, Quiz2, or Quiz3", "Quiz1");
  if (begin === "Quiz1"){
     Quiz1.displayQuiz();
     quizChoice = Quiz1;
     return quizChoice;
  } else if (begin === "Quiz2"){
    Quiz2.displayQuiz();
    quizChoice = Quiz2;
    return quizChoice;
  } else if (begin === "Quiz3"){
    Quiz3.displayQuiz();
    quizChoice = Quiz3;
    return quizChoice;
  }
}

class Quiz {
  displayQuiz(questions, answers){//method to display the quiz to the HTML
    for(let i = 0; i< this.questions.length; i++){  //loops through the array and appends each question and its answers to the body
      let questionNode = document.createElement("div");
      let questionNodeText = document.createTextNode(this.questions[i]);
      questionNode.appendChild(questionNodeText);
      document.body.appendChild(questionNode);
      //creates the answers under each question
      for(let j = 0; j < this.answers[i].length; j++){
        //creates the radio buttons for the answers to each question
        let answerNode = document.createElement("input");
        answerNode.setAttribute('type', 'radio');
        answerNode.setAttribute('name', 'answer' + i);
        answerNode.setAttribute('class', 'answer' + i);
        answerNode.setAttribute('id', 'q' + i + 'a' + j);// dynamically names each radio button's class to q#a#
        document.body.appendChild(answerNode);//adds each answerNode to the body
        let labelNode = document.createElement('label');
        labelNode.setAttribute('id', 'q'+ i + 'a' + j + 'label');
        document.body.appendChild(labelNode);
        labelNode.innerHTML = this.answers[i][j];
      }
    }
  }

  gradeQuiz(questions, answers){//creates a method to grade the quiz
    //creates locally scoped variables
    let totalPoints = (quizChoice.questions.length * quizChoice.pointsEach);
    let points = 0;
    let numCorrect = 0;
    let numIncorrect = 0;
    let incorrectArray = [];
    let statsDiv= document.createElement('div');


    for(let i = 0; i< quizChoice.answers.length; i++){//loops through each question's answer set
      for(let j = 0; j< quizChoice.answers[i].length; j++){//loops through each answer instance

        let checkerId = document.getElementById('q' + i + 'a' + j).checked;//variable that targets the radio buttons and sees if they are checked
        let labelChecker = document.getElementById('q' + i + 'a' + j + 'label').innerHTML;//variable that targets the innerHTML value of the label next to each radio button

        if(checkerId == true && quizChoice.correctAns[i] == labelChecker){//targets selected radio button and compares the answer to the correct answer
          points += quizChoice.pointVal[i];
          numCorrect++;
          incorrectArray[i] = false;
        } else if(checkerId == true && quizChoice.correctAns[i] !== labelChecker){
          numIncorrect++;
          incorrectArray[i] = true;
        }
      }
    }
    //writes the stats to the HTML
    document.body.appendChild(statsDiv);
    statsDiv.innerHTML =  '\n Score: '+ points + '/' + totalPoints + '\n Correct: ' + numCorrect + '\n Incorrect: ' + numIncorrect;
    //asks the user if they want to attempt the test again if they missed questions

    if(numIncorrect > 0){
        let tryAgain = prompt("Answer missed questions? (yes / no)", "yes");
        if(tryAgain === 'yes'){//adds the missed questions to the HTML and allows the user to reattempt them
          for(let i = 0; i < quizChoice.questions.length; i++){//loops through each question to see if it was answered incorrectly
            if(incorrectArray[i] == true){//if the answer was incorrect then...
              //reduces the point value of the question clears the radio buttons
              quizChoice.pointVal[i] -= 1;
              let j = i +1;
              statsDiv.innerHTML += "Question " + j + " is wrong!";
            }
        }
        } else if (tryAgain === 'no'){
          statsDiv.innerHTML += "<----- Results Here"
        } else {
          throw new Error('Please type yes or no');
        }
    }
  }
}



//creates instances of quizzes
let Quiz1 = new Quiz();
//creates the questions and answers for Quiz1
Quiz1.questions =  ['1 + 1 = ', '2 x 2 = ', '3 x 3 = ', '4 x 4 = ', '5 + 5 = '];
Quiz1.answers = [];
Quiz1.answers[0] = ['1','2','3','4','5'];
Quiz1.answers[1] = ['2','4','6','8','10'];
Quiz1.answers[2] = ['3','6','9','12','15'];
Quiz1.answers[3] = ['4','8','12','16','20'];
Quiz1.answers[4] = ['5','10','15','20','25'];
Quiz1.correctAns = ['2','4','9','16','10'];
Quiz1.pointsEach = 10;
Quiz1.pointVal = [10, 10, 10, 10, 10];

let Quiz2 = new Quiz();
//creates the questions and answers for Quiz2
Quiz2.questions =  ['Seconds per Minute?', 'Minutes per Hour?', 'Hours per Day?', 'Days per Week?', 'Weeks per Month?'];
Quiz2.answers = [];
Quiz2.answers[0] = ['60', '7', '24', '4'];
Quiz2.answers[1] = ['60', '7', '24', '4'];
Quiz2.answers[2] = ['60', '7', '24', '4'];
Quiz2.answers[3] = ['60', '7', '24', '4'];
Quiz2.answers[4] = ['60', '7', '24', '4'];
Quiz2.correctAns = ['60', '60', '24', '7', '4'];
Quiz2.pointsEach = 20;
Quiz2.pointVal = [20, 20, 20, 20, 20];

let Quiz3 = new Quiz();
//creates the questions and answers for Quiz3
Quiz3.questions =  ['Only season in Phoenix?', 'What state is Phoenix in?', 'In Phoenix, can you cook an egg on the sidewalk during summer?', 'T/F: Arizona was the last state to join the United States', 'Can people in Phoenix drive?'];
Quiz3.answers = [];
Quiz3.answers[0] = ['Winter', 'Spring', 'Summer', 'Fall'];
Quiz3.answers[1] = ['Arizona', 'California', 'New Mexico', 'Nevada'];
Quiz3.answers[2] = ['Yes', 'No'];
Quiz3.answers[3] = ['True', 'False'];
Quiz3.answers[4] = ['Yes', 'No'];
Quiz3.correctAns = ['Summer', 'Arizona', 'Yes', 'False', 'No'];
Quiz3.pointsEach = 5;
Quiz3.pointVal = [5, 5, 5, 5, 5];
