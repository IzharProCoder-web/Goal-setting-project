const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value ");
const progressLabel = document.querySelector(".progress-lable");
const footQuote = document.querySelector(".quote");

const allQuotes = [
  "Raise The Bar By Completing Your Goals!",
  "well began half is done!",
  "just a step away, keep going!",
  "whoa! you just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goals) => goals.completed
).length;
progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("Completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goals) => goals.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

      progressLabel.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("Completed");
  }

  input.addEventListener("focus", (e) => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id].name = input.value
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
