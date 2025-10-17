document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question-container');
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const resultContainer = document.getElementById('result-container');
  const resultTitleEl = document.getElementById('result-title');
  const resultDescriptionEl = document.getElementById('result-description');
  const restartBtn = document.getElementById('restart-btn');

  let currentQuestionKey = 'start';

  function renderQuestion(key) {
    const questionData = questionnaire[key];

    if (key.startsWith('result_')) {
      showResult(questionData);
      return;
    }

    questionEl.textContent = questionData.question;
    answersEl.innerHTML = '';

    for (const answer in questionData.answers) {
      const button = document.createElement('button');
      button.textContent = answer;
      button.classList.add('answer-btn');
      button.addEventListener('click', () => {
        currentQuestionKey = questionData.answers[answer];
        renderQuestion(currentQuestionKey);
      });
      answersEl.appendChild(button);
    }
  }

  function showResult(resultData) {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultTitleEl.textContent = resultData.question;
    resultDescriptionEl.innerHTML = resultData.description;
  }

  restartBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    currentQuestionKey = 'start';
    renderQuestion(currentQuestionKey);
  });

  renderQuestion(currentQuestionKey);
});