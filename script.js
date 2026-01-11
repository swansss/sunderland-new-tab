/*
  SUNDERLAND AFC NEW TAB - MAIN SCRIPT

  This file makes everything work:
  1. Updates the time every second
  2. Picks a random player and fun fact
  3. Shows the next fixture
*/

// ============================================
// TIME FUNCTIONS
// ============================================

function updateTime() {
  // Get the current date and time
  const now = new Date();

  // Format the time as HH:MM (24-hour format)
  // padStart(2, '0') adds a leading zero if needed (e.g., 9 becomes 09)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  // Format the date nicely (e.g., "Saturday, 11 January 2026")
  const options = {
    weekday: 'long',    // "Saturday"
    day: 'numeric',     // "11"
    month: 'long',      // "January"
    year: 'numeric'     // "2026"
  };
  const dateString = now.toLocaleDateString('en-GB', options);

  // Find the HTML elements and update them
  document.getElementById('time').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

// ============================================
// FIXTURE FUNCTIONS
// ============================================

function displayFixture() {
  const fixture = sunderlandData.nextFixture;

  // Format the date nicely
  const fixtureDate = new Date(fixture.date + 'T' + fixture.time);
  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const formattedDate = fixtureDate.toLocaleDateString('en-GB', dateOptions);

  // Build the HTML to display
  // Using template literals (backticks) lets us write multi-line HTML easily
  const fixtureHTML = `
    <span class="fixture-opponent">vs ${fixture.opponent}</span>
    <span class="fixture-venue">${fixture.venue}</span><br>
    ${formattedDate} at ${fixture.time}
    <span class="fixture-competition">${fixture.competition}</span>
  `;

  // Put it in the page
  document.getElementById('fixture').innerHTML = fixtureHTML;
}

// ============================================
// PLAYER FUNCTIONS
// ============================================

function displayRandomPlayer() {
  const players = sunderlandData.players;

  // Pick a random player
  // Math.random() gives a number between 0 and 1
  // Multiply by array length and round down to get a valid index
  const randomPlayerIndex = Math.floor(Math.random() * players.length);
  const player = players[randomPlayerIndex];

  // Pick a random fun fact from that player
  const randomFactIndex = Math.floor(Math.random() * player.funFacts.length);
  const funFact = player.funFacts[randomFactIndex];

  // Update the HTML elements with player info
  document.getElementById('player-number').textContent = `#${player.number}`;
  document.getElementById('player-name').textContent = player.name;
  document.getElementById('player-position').textContent = player.position;
  document.getElementById('player-nationality').textContent = player.nationality;
  document.getElementById('player-age').textContent = `${player.age} years old`;
  document.getElementById('fun-fact').textContent = `"${funFact}"`;
}

// ============================================
// START EVERYTHING
// ============================================

// Run these functions when the page loads
updateTime();           // Show time immediately
displayFixture();       // Show fixture info
displayRandomPlayer();  // Show random player

// Update the time every second (1000 milliseconds)
// setInterval runs a function repeatedly at a set interval
setInterval(updateTime, 1000);
