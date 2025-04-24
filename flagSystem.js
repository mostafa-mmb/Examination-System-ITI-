document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const flagBtn = document.querySelector(".flag-btn");
    const markedQuestionContainer = document.querySelector(".marked-question");
    const questionContainer = document.querySelector(".Question");
    
    // State variables
    let flaggedQuestions = [];
    let currentQuestionIndex = 0;
    let questions = [];
    
    // Initialize flag system
    function initFlagSystem(quizQuestions) {
        questions = quizQuestions;
        flagBtn.addEventListener("click", toggleQuestionFlag);
    }
    
    // Update current question index (called from main quiz)
    function updateCurrentIndex(index) {
        currentQuestionIndex = index;
        updateFlagButtonState();
    }
    
    // Toggle flag for current question
    function toggleQuestionFlag() {
        const index = flaggedQuestions.indexOf(currentQuestionIndex);
        
        if (index === -1) {
            flaggedQuestions.push(currentQuestionIndex);
        } else {
            flaggedQuestions.splice(index, 1);
        }
        updateFlagButtonState();
        updateMarkedQuestionsDisplay();
    }
    
    // Update flag button appearance
    function updateFlagButtonState() {
        flagBtn.innerHTML = flaggedQuestions.includes(currentQuestionIndex) 
            ? '<i class="fa-solid fa-flag" style="color:red"></i>'
            : '<i class="fa-solid fa-flag"></i>';
    }
    
    // Update the marked questions list
    function updateMarkedQuestionsDisplay() {
        markedQuestionContainer.innerHTML = "";
        flaggedQuestions.sort((a, b) => a - b).forEach(index => {
            const questionElement = document.createElement("div");
            questionElement.className = "flagged-question";
            questionElement.innerHTML = `
                <i class="fa-solid fa-flag" style="color:red"></i> 
                Q${index + 1}: ${questions[index].question.substring(0, 30)}...`;
            
            questionElement.addEventListener("click", () => {
                // Dispatch custom event to notify main quiz to change question
                const event = new CustomEvent('navigateToQuestion', { detail: index });
                document.dispatchEvent(event);
            });
            
            markedQuestionContainer.appendChild(questionElement);
        });
    }
    
    // Expose only what's needed to the main quiz
    window.flagSystem = {
        init: initFlagSystem,
        updateIndex: updateCurrentIndex
    };
});