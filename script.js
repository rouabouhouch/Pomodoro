document.addEventListener("DOMContentLoaded", function () {
  let gold = localStorage.getItem("goldAmount")
    ? parseInt(localStorage.getItem("goldAmount"))
    : 0;
  let timer;
  let isPomodoro = false;
  let isBreak = false;
  let sessionCount = localStorage.getItem("sessionCount")
    ? parseInt(localStorage.getItem("sessionCount"))
    : 0; // Initialize session count

  function updateGoldDisplay() {
    document.querySelector("#gold-amount").textContent = gold;
  }

  function earnGold(amount) {
    gold += amount;
    localStorage.setItem("goldAmount", gold);
    updateGoldDisplay();
  }

  function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    const closeButton = document.querySelector(".close");
    closeButton.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  function spendGold(cost) {
    if (gold >= cost) {
      gold -= cost;
      localStorage.setItem("goldAmount", gold);
      updateGoldDisplay();
      showModal("Purchase successful!");
    } else {
      showModal("You don't have enough gold!");
    }
  }

  // Add event listeners to buttons in the button-container
  document.querySelectorAll(".button-container button").forEach((button) => {
    button.addEventListener("click", function () {
      const earnAmount = parseInt(this.dataset.earn);
      const spendAmount = parseInt(this.dataset.spend);
      if (!isNaN(earnAmount)) {
        earnGold(earnAmount);
      } else if (!isNaN(spendAmount)) {
        spendGold(spendAmount);
      }
    });
  });
  // Initial setup when the DOM is loaded
  updateGoldDisplay();
  document.querySelector("#session-count").textContent = sessionCount; // Display session count on page load
});

// pomodoro
/// Get required elements
const startPomodoroBtn = document.getElementById("start-pomodoro");
const startBreakBtn = document.getElementById("start-break");
const resetTimerBtn = document.getElementById("reset-timer");
const timerDisplay = document.getElementById("timer");
const sessionCountDisplay = document.getElementById("session-count");
const alarmSound = document.getElementById("alarm-sound");

// Initialize timer settings
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isPomodoroActive = false;
let timerInterval;
let sessionCount = 0;

// Function to start the timer
function startTimer(duration) {
  let timer = duration,
    minutes,
    seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      alarmSound.play();
      if (isPomodoroActive) {
        sessionCount++;
        sessionCountDisplay.textContent = sessionCount;
        isPomodoroActive = false; // Pomodoro session ends, switch to break
        timerDisplay.textContent = "25:00";
        startBreakBtn.disabled = false;
        startPomodoroBtn.disabled = true;
      } else {
        isPomodoroActive = true; // Break ends, switch to Pomodoro
        timerDisplay.textContent = "05:00";
        startPomodoroBtn.disabled = false;
        startBreakBtn.disabled = true;
      }
    }
  }, 1000);
}

// Function to start Pomodoro session
function startPomodoro() {
  isPomodoroActive = true;
  startPomodoroBtn.disabled = true;
  startBreakBtn.disabled = false;
  timerDisplay.textContent = "25:00";
  clearInterval(timerInterval);
  startTimer(workTime);
}

// Function to start break session
function startBreak() {
  isPomodoroActive = false;
  startBreakBtn.disabled = true;
  startPomodoroBtn.disabled = false;
  timerDisplay.textContent = "05:00"; // Assuming 5-minute break
  clearInterval(timerInterval);
  startTimer(breakTime);
}

// Function to reset timer
function resetTimer() {
  clearInterval(timerInterval);
  isPomodoroActive = false;
  startPomodoroBtn.disabled = false;
  startBreakBtn.disabled = false;
  timerDisplay.textContent = "25:00";
}

// Event listeners for buttons
startPomodoroBtn.addEventListener("click", startPomodoro);
startBreakBtn.addEventListener("click", startBreak);
resetTimerBtn.addEventListener("click", resetTimer);

// Function to create a ripple effect and gradient wave on button click
// Function to create a ripple effect and gradient wave on button click
function createRipple(event) {
  const button = event.currentTarget;

  // Create a ripple element
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  button.appendChild(ripple);

  // Calculate the position of the ripple relative to the button
  const rect = button.getBoundingClientRect();
  const rippleX = event.clientX - rect.left - ripple.offsetWidth / 2; // Adjust for ripple width
  const rippleY = event.clientY - rect.top - ripple.offsetHeight / 2; // Adjust for ripple height

  // Set initial position of the ripple
  ripple.style.left = `${rippleX}px`;
  ripple.style.top = `${rippleY}px`;

  // Trigger ripple animation
  ripple.classList.add("ripple-effect");

  // Trigger button gradient wave animation
  button.classList.add("clicked"); // Add clicked class to trigger gradient animation

  // Remove the ripple and wave effect after animation ends
  setTimeout(() => {
    ripple.remove();
    button.classList.remove("clicked"); // Remove clicked class
  }, 500); // Duration of the ripple effect animation
}

// Add click event listener to all buttons
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Function to handle button click and add gradient animation
function handleButtonClick(event) {
  const button = event.currentTarget;

  // Add the gradient animation class
  button.classList.add("gradient-animation");

  // Remove the gradient animation class after a short delay
  setTimeout(() => {
    button.classList.remove("gradient-animation");
  }, 3000); // Duration of the gradient animation (3000ms = 3 seconds)
}

// Add click event listener to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
