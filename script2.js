

script2Public = (function () {
    var btnPrevious = document.getElementsByClassName("button-57")[0];
    btnPrevious.disabled = true;
    var btnNext = document.getElementsByClassName("button-57")[1];
    var question = document.getElementsByClassName("Question")[0];
    var questionPart = document.createElement("p");
    var choicesPart = document.createElement("div");
    question.innerHTML = "";
    question.append(questionPart, choicesPart);
    var choices = [];
    var choicesCount = 4;
    var choicesContent = [];
    (function () {
        var i;
        for (i = 0; i < choicesCount; i++) {
            choices.push(document.createElement("input"));
            choices[i].type = "radio";
            choices[i].name = "choice";
            choices[i].value = i;
        }
        for (i = 0; i < choicesCount; i++) {
            choicesContent.push(document.createElement("span"));
        }
        var div;
        for (i = 0; i < choicesCount; i++) {
            div = document.createElement("div");
            div.append(choices[i], choicesContent[i]);
            choicesPart.append(div);
        }
    })();
    var userAnswers = [];
    var correctAnswers = [];
    var questionsCount = 0;
    var currentIndex = 0;
    var xhrQuestions = new XMLHttpRequest();
    var jsonQuestions;
    xhrQuestions.open("get", "tmp.json");
    xhrQuestions.send();
    xhrQuestions.addEventListener("readystatechange", function () {
        var t;
        if (xhrQuestions.readyState == 4 && xhrQuestions.status == 200) {
            jsonQuestions = JSON.parse(xhrQuestions.response)["results"];
            questionsCount = jsonQuestions.length;
            shuffleQuestions();
            modifyQuestions();
            initializeUserAnswers();

            displayQuestionAndCheckedAnswer(0);

            btnNext.addEventListener("click", getNextQuestion);
            btnPrevious.addEventListener("click", getPreviousQuestion);
        }
    });

    choicesPart.addEventListener("change", setUserSingleAnswer);

    function shuffleQuestions() {
        var t;
        for (var last = questionsCount - 1, j; last > 0; last--) {
            j = Math.floor(Math.random() * (last + 1));
            t = jsonQuestions[j];
            jsonQuestions[j] = jsonQuestions[last];
            jsonQuestions[last] = t;
        }
    }

    function modifyQuestions() {
        var t;
        for (var i = 0; i < questionsCount; i++) {
            jsonQuestions[i]["choices"] = [];
            for (var j = 0; j + 1 < choicesCount; j++) {
                jsonQuestions[i]["choices"].push(jsonQuestions[i]["incorrect_answers"][j])
            }
            jsonQuestions[i]["choices"].push(jsonQuestions[i]["correct_answer"]);
            correctAnswers[i] = Math.floor(Math.random() * 4);
            t = jsonQuestions[i]["choices"][correctAnswers[i]];
            jsonQuestions[i]["choices"][correctAnswers[i]] = jsonQuestions[i]["choices"][choicesCount - 1];
            jsonQuestions[i]["choices"][choicesCount - 1] = t;
        }
        for (var i = 0; i < questionsCount; i++) {
            jsonQuestions[i]["question"] = "Q" + (i + 1) + "- " + jsonQuestions[i]["question"];
        }
    }

    function initializeUserAnswers() {
        for (var i = 0; i < questionsCount; i++) {
            userAnswers.push(-1);
        }
    }

    function setUserSingleAnswer() {
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                userAnswers[currentIndex] = i;
            }
        }
    }

    function getNextQuestion() {
        currentIndex++;
        if (currentIndex < questionsCount) {
            displayQuestionAndCheckedAnswer(currentIndex);
        }
    }

    function getPreviousQuestion() {
        currentIndex--;
        if (currentIndex >= 0) {
            displayQuestionAndCheckedAnswer(currentIndex);
        }
    }

    function displayQuestionAndCheckedAnswer(questionIndex) {
        currentIndex = questionIndex;
        btnPrevious.disabled=(currentIndex==0);
        btnNext.disabled=(currentIndex + 1 == questionsCount);
        questionPart.innerHTML = jsonQuestions[currentIndex]["question"];
        if (userAnswers[currentIndex] != -1) {
            choices[userAnswers[currentIndex]].checked = true;
        }
        else {
            for (var i = 0; i < choices.length; i++) {
                choices[i].checked = false;
            }
        }
        for (var i = 0; i < choicesCount; i++) {
            choicesContent[i].innerHTML = jsonQuestions[currentIndex]["choices"][i];
        }
    }

    function getCurrentScore() {
        var score = 0;
        for (var i = 0; i < questionsCount; i++) {
            if (userAnswers[i] == correctAnswers[i]) {
                score++;
            }
        }
        return score;
    }

    return {
        displayQuestionAndCheckedAnswer: displayQuestionAndCheckedAnswer,
        getCurrentScore: getCurrentScore
    };

})();


