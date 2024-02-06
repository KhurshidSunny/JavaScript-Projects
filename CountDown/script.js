const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");

const targetTime = new Date("Jan Wed 01 2025 12:00:00").getTime();

const timer = function () {
  setInterval(function () {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;

    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    daysEl.textContent = `${days > 9 ? days : "0" + days}`;

    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)
    );
    hoursEl.textContent = `${hours > 9 ? hours : "0" + hours}`;

    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    minutesEl.textContent = `${minutes > 9 ? minutes : "0" + minutes}`;

    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
    secondsEl.textContent = `${seconds > 9 ? seconds : "0" + seconds}`;
  }, 1000);
};

timer();
