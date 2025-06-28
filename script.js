
const PASSWORD = "jft2025";
let duration = 60 * 30;
let timerInterval;

function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === PASSWORD) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("test-screen").style.display = "block";
    startTest();
  } else {
    document.getElementById("error-message").textContent = "Incorrect password.";
  }
}

function startTest() {
  startTimer();
  const container = document.getElementById("test-container");
  const selectedQuestions = [];

  Object.keys(questionPool).forEach((part, index) => {
    const questions = questionPool[part];
    const sample = questions.sort(() => 0.5 - Math.random()).slice(0, 2);
    selectedQuestions.push(...sample);

    sample.forEach((q, i) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";
      qDiv.innerHTML = `<p><strong>Part ${index + 1} - Q${i + 1}:</strong> ${q.question || ''}</p>`;

      if (q.audio) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = q.audio;
        qDiv.appendChild(audio);
      }

      q.options.forEach(opt => {
        const optElem = document.createElement("div");
        optElem.innerHTML = `
          <label>
            <input type="radio" name="${q.question}" value="${opt}">
            ${opt}
          </label>`;
        qDiv.appendChild(optElem);
      });

      container.appendChild(qDiv);
    });
  });
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (--duration < 0) {
      clearInterval(timerInterval);
      submitTest();
    }
  }, 1000);
}

function submitTest() {
  clearInterval(timerInterval);
  alert("Test Submitted!");
}
