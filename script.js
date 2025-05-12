let balance = 10000;

function updateBalanceDisplay() {
  document.getElementById("balance").innerHTML = `💼 Egyenleg: <b>${balance}</b> Ft`;
}

function spinRoulette() {
  const number = Math.floor(Math.random() * 37);
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
    document.getElementById("result").innerHTML = `<span style="color:red">⚠️ Nincs elég egyenleged (${balance} Ft) a ${totalBet} Ft tétre!</span>`;
    return;
  }

  balance -= totalBet;
  let winTotal = 0;

  // Számra tett tét
  if (!isNaN(betNumber) && betNumber === number && amountNumber > 0) {
    const win = amountNumber * 36;
    winTotal += win;
    resultText += `🎉 Számra nyertél! +${win} Ft<br>`;
  } else if (amountNumber > 0) {
    resultText += `❌ Számra nem nyertél. -${amountNumber} Ft<br>`;
  }

  // Színre tett tét
  if (betColor && amountColor > 0) {
    if (betColor === color) {
      const win = amountColor * 2;
      winTotal += win;
      resultText += `🎉 Színre nyertél! +${win} Ft<br>`;
    } else {
      resultText += `❌ Színre nem nyertél. -${amountColor} Ft<br>`;
    }
  }

  // Páros/páratlan tét
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

function getColor(number) {
  if (number === 0) return 'zöld';
  const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return redNumbers.includes(number) ? 'piros' : 'fekete';
}
