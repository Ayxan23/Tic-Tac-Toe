const elements = document.querySelectorAll(".box *");
const result = document.querySelector(".result");

let icon = "✖";
let counter = 0;

let resArrX = [];
let resArrO = [];

elements.forEach((element, i) =>
  element.addEventListener("click", () => {
    if (element.classList.contains("disabled")) return;
    element.classList.add("disabled");

    element.innerHTML = icon;
    ++counter;

    if (checkWinner(i + 1) || counter == 9) {
      result.style.display = "flex";
      counter != 9 || checkWinner(i + 1)
        ? (result.innerHTML = `<p>${icon}</p>
            <h2>WINNER!</h2>
            <button class="restart">Restart Game</button>`)
        : (result.innerHTML = `<p>✖ = O</p>
            <h2>DRAW!</h2>
            <button class="restart">Restart Game</button>`);

      const restart = document.querySelector(".restart");
      restart?.addEventListener("click", resetGame);
    }

    iconToggle(element);
  })
);

function resetGame() {
  result.style.display = "none";
  icon = "✖";
  counter = 0;
  resArrX.length = 0;
  resArrO.length = 0;
  elements.forEach((node) => {
    node.innerHTML = "";
    node.classList.remove("disabled");
  });
}

function iconToggle(element) {
  element.style.color = icon == "✖" ? "#ff106b" : "#00ff80";
  icon == "✖" ? (icon = "O") : (icon = "✖");
}

function checkWinner(num) {
  const winArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7],
    [1, 5, 9],
    [3, 5, 7],
  ];

  if (icon == "✖") {
    resArrX.push(num);
    return checkArr(resArrX, winArr);
  } else if (icon == "O") {
    resArrO.push(num);
    return checkArr(resArrO, winArr);
  }
}
function checkArr(arr1, doubleArr) {
  return doubleArr.some((arr2) => arr2.every((num) => arr1.includes(num)));
}
