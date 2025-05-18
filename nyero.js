const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];
let balance = 100;
const bet = 10;
let spinning = false;

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateBalanceDisplay() {
  document.getElementById('balance').textContent = `Egyenleg: ${balance} Ft`;
}

function spin() {
  if (spinning || balance < bet) return;

  spinning = true;
  balance -= bet;
  updateBalanceDisplay();

  const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
  ];

  const message = document.getElementById('message');
  message.textContent = '';
  reels.forEach(r => r.classList.add('spinning'));

  let interval = setInterval(() => {
    reels.forEach(r => r.textContent = getRandomSymbol());
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    const final = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    for (let i = 0; i < 3; i++) {
      reels[i].textContent = final[i];
      reels[i].classList.remove('spinning');
    }

    if (final[0] === final[1] && final[1] === final[2]) {
      const win = 50;
      balance += win;
      message.textContent = `🎉 NYERTÉL! +${win} Ft`;
    } else {
      message.textContent = '😢 Nem nyertél.';
    }

    updateBalanceDisplay();
    spinning = false;
  }, 2000);
}

function toggleNavbar() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("open");
  }