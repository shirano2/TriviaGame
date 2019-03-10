$(document).ready(function(){

    var count=12;  /* quiz time */
    var intervalId=0; /* for timer */
    var total; /* total number of question */
    var correct=0; /* number of correct answer */
    var wrong=0; /* number of wrong answer */
    var skip=0; /* number of time over */
    var quizIndex; /* current quiz number index */
    var quizIndexArray=[]; /* sequence of quiz  */
    var selectIndexArray=[]; /* sequence of answer select */

    /* question */
    var q=[
        "Peter Parker works as a photographer for:","S.H.I.E.L.D.'s highest ranking agent is:",
        "Captain America was frozen in which war?","The vampire hunter Blade is a:",
        "Dr. Doom went to the same college as:","What is commonly believed to be The Black Widow's previous occupation before becoming a Russian spy?",
        "Ghost Rider is known as:","Deadpool joined the Weapon X program because:",
        "What did Dr. Pym discover that allowed him to change size?",
        "What vehicle is the Avengers primary mode of transport?"
    ];

    /* answer */
    var a=[
        "The Daily Bugle","Nick Fury","World War II","Half vampire","Reed Richards",
        "A ballerina","The Spirit of Vengeance","He had incurable cancer","Pym Particles","The Quinjet"
    ];

    /* section of answer */
    var select=[
        ["The Daily Planet","The New York Times","The Rolling Stone","The Daily Bugle"],
        ["Nick Fury","Steven Rogers","Peter Parker","Natalia Romanova"],
        ["World War I","World War II","Cold War","American Civil War"],
        ["Mutant","Human","Vampire","Half vampire"],
        ["Tony Stark","Peter Parker","Reed Richards","Bruce Banner"],
        ["A ballerina","A military pilot","A thief","An athlete"],
        ["The Guardian Devil","The Spirit of Hate","The Spirit of Vengeance", "The Red Skull"],
        ["He had incurable cancer","He was forced to","He thought it would be fun","He wanted to fight for justice"],
        ["Gamma Rays","Pym Particles","Alpha Rays","Omega Particles"],
        ["A bus","The Quinjet","The Blackbird","The Blackhawk"]
    ];

    /* at the beginning */
    function start() {
        total=q.length;
        $(".quiz").hide();
    }

    /* if you press start button */
    function pressStartButton() {
        correct=0; 
        wrong=0; 
        skip=0; 
        quizIndexArray=[]; 
        $(".start").hide();
        $(".quiz").show();
        $(".restart").empty();
    }

    /* timer for showing the time count */
    function timer() {
        intervalId = setInterval(function() {
            $("#timer").text(count+" Seconds");
            count--; 
            if(count<0) {
                timeOver();
            }  
        },1000) ;
    }

    /* stop timer and time reset */
    function stopTimer() {
        clearInterval(intervalId);
        count=12;
    }

    /* if time is over */
    function timeOver() {
        stopTimer();
        clearAnswer();
        showAnswer("T");
        skip++;
        checkStatus();
    }

    /* choose the quiz number randomly */
    function randomQuiz() {
        while(quizIndexArray.length<q.length) {
            quizIndex=Math.floor(Math.random()*q.length);
            if(quizIndexArray.indexOf(quizIndex)<0) {
                quizIndexArray.push(quizIndex);
                break;
            }
        }
        $("#question").text(q[quizIndex]);  
    }

    /* random change of positions of select */
    function randomAnswer() {
        clearAnswer();
        while(selectIndexArray.length<select[quizIndex].length) {
            var selectIndex=Math.floor(Math.random()*select[quizIndex].length);
            if(selectIndexArray.indexOf(selectIndex)<0) {
                selectIndexArray.push(selectIndex);
                $("#answer").append("<button>"+select[quizIndex][selectIndex]+"</button>");
            }
        }
    }
    
    /* remove set of select */ 
    function clearAnswer() {
        selectIndexArray=[];
        $("#answer").empty();
    }

    /* quiz generator */
    function quizSet() {
        timer();
        randomQuiz();
        randomAnswer();
    }

    /* check answer is correct */
    function isCorrect(e) {
        return e==a[quizIndex];
    }

    /* show the message and images by each case */
    function showAnswer(m) {
        $("#timer").text("");
        if(m=="C") { /* correct */
            $("#question").text("Correct!!"); 
            $("#answer").text("");
        } else if (m=="N") { /* wrong */
            $("#question").text("Nope!");
            $("#answer").text("The Correct Answer was: "+a[quizIndex]);
        } else { /* time over */
            $("#question").text("Out of Time!"); 
            $("#answer").text("The Correct Answer was: "+a[quizIndex]);
        }
        $("#answer").append("<img src='assets/images/"+ a[quizIndex]+".gif"+"'>");
    }

    /* check all quiz is solved */
    function isFinish() {
        return quizIndexArray.length==total;
    }

    /* if all quiz is solved */
    function finish() {
        $(".quiz").hide();
        $(".restart").append("<h2>All Done!</h2>");
        $(".restart").append("<div class='finish'>Correct Answers: "+correct+"<br>Incorrect Answers: "+wrong+"<br>Unanswered: "+skip);
        $(".restart").append("<button class='start'>Restart</button>");
    }

    /* check the status and setTimeout setting */
    function checkStatus() {
        if(isFinish()) { /* if game is done */
            setTimeout(finish,3000);
        } else { /* if game is on going */
            setTimeout(quizSet,3000);
        }
    }

    /* this is start of coding */
    start();

    /* if you press the button */
    $(document).on("click","button",function(event) {
        if(event.target.className=="start") { /* if it is start button */
            pressStartButton();
            quizSet();
        } else { /* if it is select button */
            stopTimer();
            clearAnswer();
            if(isCorrect(event.target.textContent)) { /* if it is correct */
                showAnswer("C"); 
                correct++;
            } else { /* if it is wrong */
                showAnswer("N");
                wrong++;
            }
            checkStatus();
        }
    });
});