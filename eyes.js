const balls = document.getElementsByClassName("ball");
const eyelids = Object.values(document.querySelectorAll(".eyelid"));

const boredTimeout = 5000;

alert(`
  cursor move -> eyes follow;
  click on left eye -> blink left eye;
  click on right eye -> blink left eye;
  click everywhere else -> blink both eyes;
  idle for ${boredTimeout / 1000}s -> get bored;
`);

// Move eye balls at mousemove
document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + "%";
  const y = (event.clientY * 100) / window.innerHeight + "%";

  Object.values(balls).forEach((ball) => {
    ball.style.left = x;
    ball.style.top = y;
    ball.transform = "translate(-" + x + ",-" + y + ")";
  });
};

// When blink animation ends, remove blink and bored class from DOM eyelids elements
eyelids.forEach((eyelid) =>
  eyelid.addEventListener("animationend", () => {
    eyelid.classList.remove("blink");
    eyelid.classList.remove("bored");

    clearTimeout(boredTimer);
    boredTimer = setTimeout(setBored, boredTimeout);
  })
);

// Blink at click
document.addEventListener("click", (e) => blink(e));

const blink = function (e) {
  clearTimeout(boredTimer);

  // click on left eye -> blink left eye
  // click on right eye -> blink left eye
  // click everywhere else -> blink both eyes
  let target = e.target.closest(".eye");
  let eyesToBlink = document.querySelectorAll(".eye");
  if (target) {
    const side = target.dataset.side;
    eyesToBlink = Object.values(eyesToBlink).filter(
      (eye) => eye.dataset.side === side
    );
  }
  eyesToBlink.forEach((eyeToBlink) => setBlinkClass(eyeToBlink));
};

const setBlinkClass = function (eye) {
  let eyelid = eye.previousElementSibling;
  if (eyelid) {
    eyelid.classList.add("blink");
  }
};

// When no click happens for boredTimeout time, set bored animation
const setBored = function () {
  eyelids.forEach((eyelid) => eyelid.classList.add("bored"));
};

let boredTimer = setTimeout(setBored, boredTimeout);
