/*
  SUNDERLAND AFC NEW TAB - MAIN SCRIPT

  This file makes everything work:
  1. Updates the time every second
  2. Picks a random player and fun fact
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

  // Display where the player was signed from
  document.getElementById('player-signed-from').innerHTML = `
    <span class="label">Signed From</span>
    <span class="value">${player.signedFrom}</span>
  `;

  // Display other positions (only if they have any)
  const otherPositionsEl = document.getElementById('player-other-positions');
  if (player.otherPositions && player.otherPositions.length > 0) {
    const positionTags = player.otherPositions
      .map(pos => `<span class="position-tag">${pos}</span>`)
      .join('');
    otherPositionsEl.innerHTML = `
      <span class="label">Can Also Play</span><br>
      ${positionTags}
    `;
    otherPositionsEl.style.display = 'block';
  } else {
    otherPositionsEl.style.display = 'none';
  }

  // Display playing style
  document.getElementById('player-style').innerHTML = `
    <span class="label">Playing Style</span>
    ${player.playingStyle}
  `;

  // Display random fun fact
  document.getElementById('fun-fact').innerHTML = `
    <span class="label">Did You Know?</span>
    "${funFact}"
  `;
}

// ============================================
// START EVERYTHING
// ============================================

// Run these functions when the page loads
updateTime();           // Show time immediately
displayRandomPlayer();  // Show random player

// Update the time every second (1000 milliseconds)
// setInterval runs a function repeatedly at a set interval
setInterval(updateTime, 1000);
