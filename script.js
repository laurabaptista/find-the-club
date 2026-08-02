// --------------------------
// ELEMENTOS
// --------------------------

const countdown = document.getElementById("countdown");

const startBtn = document.getElementById("startBtn");

const content = document.querySelector(".content");

const loading = document.getElementById("loading");

const smile = document.getElementById("smile");

const loadingText = document.getElementById("loadingText");

// --------------------------
// DATA DO EVENTO
// --------------------------

const eventDate = new Date("2026-09-03T22:00:00").getTime();

// --------------------------
// COUNTDOWN
// --------------------------

function updateCountdown() {
  const now = new Date().getTime();

  const distance = eventDate - now;

  if (distance <= 0) {
    countdown.innerHTML = "it's time.";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML =
    `${days}d ` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

updateCountdown();

setInterval(updateCountdown, 1000);

// --------------------------
// BOTÃO
// --------------------------

startBtn.addEventListener("click", () => {
  // Fade do primeiro ecrã

  content.style.opacity = "0";

  document.querySelector(".heart").style.opacity = "0";

  document.querySelector(".cta").style.opacity = "0";

  // Espera um bocadinho

  setTimeout(() => {
    document.body.style.background = "#0a0a0a";
    document.body.style.color = "#f5f5f5";

    document.querySelector(".heart").style.display = "none";

    document.querySelector(".cta").style.display = "none";

    document.querySelector(".names").style.color = "#fff";
    document.querySelector(".names").style.opacity = "1";

    content.classList.add("hidden");

    loading.classList.add("active");

    loading.style.opacity = "0";

    requestAnimationFrame(() => {
      loading.style.opacity = "1";
    });

    playIntro();
  }, 450);
});

function playIntro() {
  const sequence = [
    {
      text: "esperem...",

      smile: "assets/smile.svg",

      time: 1700,
    },

    {
      text: "não ia ser assim tão fácil.",

      smile: "assets/smile-wink.svg",

      time: 2500,
    },

    {
      text: "primeiro umas perguntinhas.",

      smile: "assets/smile.svg",

      time: 2300,
    },
  ];

  let index = 0;

  function nextStep() {
    loadingText.style.opacity = 0;

    setTimeout(() => {
      loadingText.textContent = sequence[index].text;

      smile.src = sequence[index].smile;

      loadingText.style.opacity = 1;
    }, 250);

    setTimeout(() => {
      index++;

      if (index < sequence.length) {
        nextStep();
      } else {
        showQuestion1();
      }
    }, sequence[index].time);
  }

  nextStep();
}

function showQuestion1() {
  loading.innerHTML = `

    <div class="quiz">

      <h2 class="quiz-question">
        quantos anos de namoro fazemos<br>
        no dia 15 de agosto de 2026?
      </h2>

      <button class="answer" data-correct="false">9 anos</button>

      <button class="answer" data-correct="false">10 anos</button>

      <button class="answer" data-correct="true">11 anos</button>

      <button class="answer" data-correct="false">12 anos</button>

    </div>

  `;

  addQuestionEvents(showQuestion2);
}

function showQuestion2() {
  loading.innerHTML = `

    <div class="quiz">

      <h2 class="quiz-question">
        qual é o<br>
        dress code?
      </h2>

      <button class="answer" data-correct="false">casual</button>

      <button class="answer" data-correct="false">colorido</button>

      <button class="answer" data-correct="false">branco</button>

      <button class="answer" data-correct="true">all black</button>

    </div>

  `;

  addQuestionEvents(showQuestion3);
}

function addQuestionEvents(nextQuestion) {
  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.correct === "true") {
        if (nextQuestion === showQuestion2) {
          showSuccess(
            `uau!!!<br><br>
            11 anos...<br><br>

quem diria? 🤍`,
            showQuestion2,
          );
        } else if (nextQuestion === showQuestion3) {
          showSuccess(
            `all black.<br><br>

never forget! 🤍`,
            showQuestion3,
          );
        } else if (nextQuestion === showReveal) {
          showSuccess(
            `yeah!<br><br>

you are ready.`,
            showReveal,
            3000,
          );
        }
      } else {
        let retryQuestion;

        if (nextQuestion === showQuestion2) {
          retryQuestion = showQuestion1;
        } else if (nextQuestion === showQuestion3) {
          retryQuestion = showQuestion2;
        } else {
          retryQuestion = showQuestion3;
        }

        showFail(retryQuestion);
      }
    });
  });
}

function showQuestion3() {
  loading.innerHTML = `

    <div class="quiz">

      <h2 class="quiz-question">
        onde acham que<br>
        vamos celebrar esta noite?
      </h2>

      <button class="answer" data-correct="true">num antigo mercado</button>

      <button class="answer" data-correct="false">numa praia</button>

      <button class="answer" data-correct="false">numa quinta</button>

      <button class="answer" data-correct="false">num rooftop</button>

    </div>

  `;

  addQuestionEvents(showReveal);
}

function showSuccess(text, nextQuestion, delay = 2800) {
  loading.innerHTML = `

    <div class="loading-message">

      ${text}

    </div>

  `;

  setTimeout(() => {
    nextQuestion();
  }, delay);
}

function showFail(previousQuestion) {
  loading.innerHTML = `

    <div class="quiz">

      <h2 class="quiz-question">

        essa foi ao calhas,<br>
        não foi?

      </h2>

      <button class="answer restart">

        try again

      </button>

    </div>

  `;

  document.querySelector(".restart").addEventListener("click", () => {
    previousQuestion();
  });
}

function showReveal() {
  loading.innerHTML = `

    <div class="loading-message" id="countdownReveal">

      3

    </div>

  `;

  const countdown = document.getElementById("countdownReveal");

  setTimeout(() => {
    countdown.textContent = "2";
  }, 1000);

  setTimeout(() => {
    countdown.textContent = "1";
  }, 2000);

  setTimeout(() => {
    revealClub();
  }, 3000);
}

function revealClub() {
  loading.innerHTML = `

    <div class="reveal">

      <h1 class="club" id="clubName"></h1>

      <div class="details">

  03.09.2026 · 22h00
  </div>

  <div class="message">

  venham bonitos.<br>
  tragam animação<br>
  e vontade de bailar.<br><br>

  let's celebrate 🤍<br>
  see you there.

</div>

<div class="details">

  friends · music · chaos

</div>

    <a
  href="https://maps.google.com/?q=Hard+Club+Porto"
  target="_blank"
  class="answer maps hidden"
  id="mapsBtn"
>

  open maps

</a>

    </div>

  `;

  typeClub();
}

function typeClub() {
  const text = "hard club.";

  const title = document.getElementById("clubName");

  let i = 0;

  const typing = setInterval(() => {
    title.textContent += text.charAt(i);

    i++;

    if (i >= text.length) {
      clearInterval(typing);

      setTimeout(() => {
        document.getElementById("mapsBtn").classList.remove("hidden");
      }, 500);
    }
  }, 120);
}
