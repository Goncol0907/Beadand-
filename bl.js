let deck, playerHand, dealerHand;
let balance = 1000;
let currentBet = 100;
let gameActive = false;

function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return shuffle(deck);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function calculateTotal(hand) {
  let total = 0, aces = 0;
  for (let card of hand) {
    total += getCardValue(card);
    if (card.value === 'A') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

function updateUI(showDealer = false) {
  document.getElementById("player-hand").textContent = playerHand.map(c => c.value + c.suit).join(' ');
  document.getElementById("player-total").textContent = `Összeg: ${calculateTotal(playerHand)}`;

  document.getElementById("dealer-hand").textContent = showDealer
    ? dealerHand.map(c => c.value + c.suit).join(' ')
    : dealerHand[0].value + dealerHand[0].suit + " ??";

  document.getElementById("dealer-total").textContent = showDealer
    ? `Összeg: ${calculateTotal(dealerHand)}`
    : "";

  document.getElementById("balance").textContent = `Egyenleg: ${balance}`;
}

function startGame() {
  currentBet = parseInt(document.getElementById("bet").value);
  if (isNaN(currentBet) || currentBet < 100 || currentBet > balance) {
    alert(`Érvénytelen tét! A tétnek 100 és ${balance} között kell lennie.`);
    return;
  }

  gameActive = true;
  deck = createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  document.getElementById("game").style.display = "block";
  document.getElementById("message").textContent = "";
  updateUI(false);
}

function hit() {
  if (!gameActive) return;
  playerHand.push(deck.pop());
  updateUI(false);
  if (calculateTotal(playerHand) > 21) {
    endGame("Túlcsordultál! Vesztettél.");
    balance -= currentBet;
  }
}

function stand() {
  if (!gameActive) return;
  while (calculateTotal(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  const playerTotal = calculateTotal(playerHand);
  const dealerTotal = calculateTotal(dealerHand);

  let result = "";
  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    result = "Nyertél!";
    balance += currentBet;
  } else if (dealerTotal > playerTotal) {
    result = "Vesztettél.";
    balance -= currentBet;
  } else {
    result = "Döntetlen.";
  }

  endGame(result);
}

function endGame(message) {
  gameActive = false;
  document.getElementById("message").textContent = message;
  updateUI(true);
}

function reset() {
  if (balance < 100) {
    alert("Elfogyott az egyenleged. Játék vége.");
    return;
  }
  document.getElementById("game").style.display = "none";
}
