let balance = 10000;

function updateBalanceDisplay() {
  document.getElementById("balance").innerHTML = `💼 Egyenleg: <b>${balance}</b> Ft`;
}

function drawWheel() {
  const table = document.getElementById("roulette-table");
  const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

  for (let i = 1; i <= 36; i++) {
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number");
    numberDiv.textContent = i;

    const angle = (i * 360) / 37;
    numberDiv.style.transform = `translateX(130px) translateY(0px) rotate(${angle}deg)`;
    numberDiv.style.backgroundColor = redNumbers.includes(i) ? "red" : "black";

    table.appendChild(numberDiv);
  }
}

function getColor(number) {
  if (number === 0) return "zöld";
  const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return red.includes(number) ? "piros" : "fekete";
}

function animateBallToNumber(targetNumber) {
  const ball = document.getElementById("ball");
  const spins = 4;
  const anglePerNumber = 360 / 37;
  const finalAngle = (targetNumber * anglePerNumber) + (360 * spins);

  ball.style.transition = "transform 2s ease-out";
  ball.style.transform = `rotate(${finalAngle}deg) translateY(-130px)`;
}

function spinRoulette() {
  const ball = document.getElementById("ball");
  ball.style.transition = "none";
  ball.style.transform = "rotate(0deg) translateY(-130px)";

  const number = Math.floor(Math.random() * 37);
  setTimeout(() => {
    animateBallToNumber(number);
  }, 50);

  setTimeout(() => {
    evaluateSpin(number);
  }, 2000);
}

function evaluateSpin(number) {
  const color = getColor(number);
  const evenOdd = number === 0 ? "nulla" : (number % 2 === 0 ? "páros" : "páratlan");

  const betNumber = parseInt(document.getElementById("betNumber").value);
  const amountNumber = parseInt(document.getElementById("amountNumber").value) || 0;

  const betColor = document.getElementById("betColor").value;
  const amountColor = parseInt(document.getElementById("amountColor").value) || 0;

  const betEvenOdd = document.getElementById("betEvenOdd").value;
  const amountEvenOdd = parseInt(document.getElementById("amountEvenOdd").value) || 0;

  const totalBet = amountNumber + amountColor + amountEvenOdd;
  let resultText = `🎯 Kipörgetett szám: <b>${number}</b> (<span style="color:${color}">${color}</span>, ${evenOdd})<br><br>`;

  if (totalBet > balance) {
    document.getElementById("result").innerHTML =
      `<span style="color:red">⚠️ Nincs elég egyenleged (${balance} Ft) a ${totalBet} Ft tétre!</span>`;
    return;
  }

  balance -= totalBet;
  let winTotal = 0;

  if (!isNaN(betNumber) && betNumber === number && amountNumber > 0) {
    const win = amountNumber * 36;
    winTotal += win;
    resultText += `🎉 Számra nyertél! +${win} Ft<br>`;
  } else if (amountNumber > 0) {
    resultText += `❌ Számra nem nyertél. -${amountNumber} Ft<br>`;
  }

  if (betColor && amountColor > 0) {
    if (betColor === color) {
      const win = amountColor * 2;
      winTotal += win;
      resultText += `🎉 Színre nyertél! +${win} Ft<br>`;
    } else {
      resultText += `❌ Színre nem nyertél. -${amountColor} Ft<br>`;
    }
  }

  if (betEvenOdd && amountEvenOdd > 0) {
    if (betEvenOdd === evenOdd) {
      const win = amountEvenOdd * 2;
      winTotal += win;
      resultText += `🎉 Páros/páratlan nyertél! +${win} Ft<br>`;
    } else {
      resultText += `❌ Páros/páratlan nem nyert. -${amountEvenOdd} Ft<br>`;
    }
  }

  balance += winTotal;
  updateBalanceDisplay();
  resultText += `<br><b>💰 Összes nyeremény: ${winTotal} Ft</b>`;
  document.getElementById("result").innerHTML = resultText;
}

window.onload = () => {
  updateBalanceDisplay();
  drawWheel();
};
