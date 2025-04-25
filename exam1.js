// mostafa changed the next line
function exam1(exam2Public) {

  const questionsCount = 10; // actual question count
  const timePerQuestion = 1; // minutes per question
  
  const totalTimeMs = questionsCount * timePerQuestion * 60 * 1000;
  const countDownDate = new Date().getTime() + totalTimeMs;
  const timerDisplay = document.getElementById("demo");

  const loader = document.createElement('div');
  loader.className = 'loader';
  document.querySelector('.Questioncontainer').appendChild(loader);



  initSubmitButton();

  
  
  const timer = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      
      const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      
      timerDisplay.innerHTML = `${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
      
      if (distance <= 0) {
          clearInterval(timer);
          timerDisplay.innerHTML = "TIME IS OVER";
          disableQuiz();
          autoSubmit();
      }
  }, 1000);
  
  function disableQuiz() {
      document.querySelectorAll('.button-57, .flag-btn, [type="radio"]').forEach(el => {
          el.disabled = true; 
      });
      document.body.classList.add('disabled-quiz');
  }
  
  function autoSubmit() {
      showScore();
      disableQuiz();
  }
  
  function initSubmitButton() {
      const submitBtn = document.querySelector(".submit-btn button");
      if (submitBtn) {
          submitBtn.addEventListener("click", function() {
              showScore();
              disableQuiz();
          });
      }
  }
  
  function showScore() {
    try {
        const score = exam2Public.getCurrentScore();
        const userData = JSON.parse(localStorage.getItem("user"));
        const scoreBoard = document.querySelector('.score-board');
        
        if (scoreBoard && userData) {
            const percentage = Math.round((score/questionsCount)*100);
            const resultClass = percentage >= 70 ? 'pass' : 'fail';
            
            scoreBoard.innerHTML = `
                <div class="result-header">
                    <h2>Quiz Results</h2>
                    <div class="user-name">${userData.name}</div>
                </div>
                <div class="result-details ${resultClass}">
                    <div class="score-display">
                        <span>${score}</span>/${questionsCount}
                    </div>
                    <div class="percentage">${percentage}%</div>
                    <div class="result-message">${percentage >= 70 ? 'Congratulations!' : 'Keep practicing!'}</div>
                </div>
                
            `;
            
            scoreBoard.style.display = 'block';
            
            // Add close button functionality
            document.querySelector('.button-57').addEventListener('click', () => {
                scoreBoard.style.display = 'none';
            });
        }
    } catch (error) {
        console.error("Error showing score:", error);
    }
}



};
