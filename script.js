// ==========================================================================
// Digital Trading Card - script.js
// Plain Vanilla JavaScript: 3D Flip Card, Special Ability & Battle Arena
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("trading-card");
  const abilityBtn = document.getElementById("ability-btn");
  const abilityStatus = document.getElementById("ability-status");

  let isCooldown = false;

  // ========================================================================
  // 1. Interactive Special Ability Activation (On the Back Face)
  // ========================================================================
  if (abilityBtn && abilityStatus) {
    abilityBtn.addEventListener("click", (e) => {
      // Prevent button click from bubbling up to the card flip handler
      e.stopPropagation();

      if (isCooldown) return;
      isCooldown = true;

      // Update button text and disable during cooldown
      abilityBtn.disabled = true;
      abilityBtn.textContent = "⚡ Ability Active (2.5s)...";

      // Trigger radiant water surge animation (pure glow, no transform reset!)
      card.classList.add("ability-active");
      
      // Show bold, clear activation confirmation
      abilityStatus.classList.add("show-status");
      abilityStatus.innerHTML = `✨ <strong>IRRESISTIBLE ACTIVATED!</strong><br>🌊 Charm boosted to maximum! Opponents are stunned!`;

      // Remove active glow class after animation finishes
      setTimeout(() => {
        card.classList.remove("ability-active");
      }, 800);

      // Reset button and status after cooldown period
      setTimeout(() => {
        isCooldown = false;
        abilityBtn.disabled = false;
        abilityBtn.textContent = "🌊 Activate Irresistible Ability";
        abilityStatus.classList.remove("show-status");
        abilityStatus.textContent = "";
      }, 2500);
    });
  }

  // ========================================================================
  // 2. Click / Tap to Flip (Great for Mobile Screens & Touch Devices)
  // ========================================================================
  // On desktop, pointing (hovering) automatically flips the card via CSS.
  // On mobile touchscreens, tapping anywhere on the card toggles the flip state.
  if (card) {
    card.addEventListener("click", (e) => {
      // Ignore clicks on buttons or links so button clicks don't flip the card
      if (e.target.closest("button, a")) return;

      card.classList.toggle("is-flipped");
    });
  }

  // ========================================================================
  // 3. Battle Arena (Dice-Roll Game with Big Winner Letters!)
  // ========================================================================
  // Select the Battle button and the display area where results will appear
  const battleBtn = document.getElementById("battle-btn");
  const battleDisplay = document.getElementById("battle-display");

  // Ava's stats from the card in index.html:
  // Snack Power: 78, Nap Quality: 63, Drizzy Drake: 94
  const avaStats = {
    snackPower: 78,
    napQuality: 63,
    drizzyDrake: 94
  };

  // Fun list of opponents Ava can encounter in battle
  const opponents = [
    { name: "Bug in Production 🐛", power: 74 },
    { name: "Cold Brew Shortage ☕", power: 68 },
    { name: "8:00 AM Monday Lecture ⏰", power: 82 },
    { name: "CSS Centering Boss 📐", power: 88 },
    { name: "Unstable Wi-Fi Goblin 📶", power: 70 }
  ];

  if (battleBtn && battleDisplay) {
    battleBtn.addEventListener("click", () => {
      // Step A: Temporarily disable button so user doesn't spam click
      battleBtn.disabled = true;
      battleBtn.textContent = "🎲 Rolling Dice...";

      // Step B: Pick a random opponent from the list
      const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];

      // Step C: Start a fun dice-rolling animation
      // We cycle random numbers for 10 ticks (~1 second) to create anticipation
      let rollTicks = 0;
      const rollInterval = setInterval(() => {
        rollTicks++;

        // Generate a random temporary dice roll between 1 and 20
        const tempRoll = Math.floor(Math.random() * 20) + 1;

        // Update the screen with the rolling animation
        battleDisplay.innerHTML = `
          <div class="battle-rolling">
            <span class="dice-icon">🎲</span>
            <p class="rolling-text">Rolling the d20 Dice: <strong>${tempRoll}</strong></p>
            <p class="vs-text">Facing: <strong>${randomOpponent.name}</strong></p>
          </div>
        `;

        // When 10 ticks are done, stop the dice roll and calculate the winner
        if (rollTicks >= 10) {
          clearInterval(rollInterval);
          determineWinner(randomOpponent);
        }
      }, 100);
    });

    // Helper function to calculate final scores and announce the winner
    function determineWinner(opponent) {
      // 1. Roll a 20-sided dice (1 to 20) for Ava and for the opponent
      const avaDiceRoll = Math.floor(Math.random() * 20) + 1;
      const opponentDiceRoll = Math.floor(Math.random() * 20) + 1;

      // 2. Ava uses her top stat: Drizzy Drake (94)
      const avaBaseStat = avaStats.drizzyDrake;

      // 3. Add base stat + dice roll to get the total battle score
      const avaTotalScore = avaBaseStat + avaDiceRoll;
      const opponentTotalScore = opponent.power + opponentDiceRoll;

      // 4. Check if Ava won
      const avaWon = avaTotalScore >= opponentTotalScore;

      // 5. Display the WINNER IN BIG LETTERS with battle breakdown
      battleDisplay.innerHTML = `
        <div class="battle-card ${avaWon ? 'winner-card' : 'defeat-card'}">
          <!-- WINNER TEXT IN BIG LETTERS -->
          <h2 class="battle-winner-title">
            ${avaWon ? "🏆 AVA WINS! 🏆" : "💥 REMATCH NEEDED! 💥"}
          </h2>

          <p class="battle-summary">
            🌊 <strong>Ava</strong> scored <strong>${avaTotalScore}</strong>
            (Drake Stat ${avaBaseStat} + 🎲 Dice Roll ${avaDiceRoll})<br>
            ⚔️ <strong>${opponent.name}</strong> scored <strong>${opponentTotalScore}</strong>
            (Power ${opponent.power} + 🎲 Dice Roll ${opponentDiceRoll})
          </p>

          <p class="victory-quote">
            ${avaWon
              ? '✨ "Irresistible water aura and certified Drake playlists carry the victory!"'
              : '⚡ "Close match! Recharge your Snack Power and try again!"'}
          </p>
        </div>
      `;

      // Step D: Re-enable the Battle button so the user can play again
      battleBtn.disabled = false;
      battleBtn.textContent = "⚔️ Battle Again!";
    }
  }
});
