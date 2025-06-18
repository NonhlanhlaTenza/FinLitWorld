$(document).ready(function () {
    $('#savings-action').click(function () {
      $('.transactions').html(getSavingsHtml());
      initializeSavingsHandlers();
    });
  
    function getSavingsHtml() {
      return `
        <h3>Set Your Savings Goal</h3>
        <form id="savings-form">
          <label for="goal-name">Goal Name:</label>
          <input type="text" id="goal-name" placeholder="e.g., Vacation">
  
          <label for="goal-amount">Goal Amount:</label>
          <input type="number" id="goal-amount" placeholder="e.g., 1000">
  
          <label for="monthly-saving">Monthly Saving:</label>
          <input type="number" id="monthly-saving" placeholder="e.g., 200">
  
          <button type="button" id="set-goal">Set Goal</button>
        </form>
  
        <div id="progress-section" style="display: none; margin-top: 20px;">
          <h3>Your Progress</h3>
          <div id="progress-bar-container">
            <div id="progress-bar"></div>
          </div>
          <p id="progress-text"></p>
          <button type="button" id="add-monthly-saving">Add This Month's Saving</button>
  
          <h3 id="monthly-breakdown">Monthly Breakdown</h3>
          <table id="breakdown-table" border="1">
            <thead>
              <tr>
                <th>Month</th>
                <th>Saved Amount</th>
                <th>Total Savings</th>
                
              </tr>
            </thead>
            <tbody></tbody>
          </table>
  
          <div id="reward-section" style="margin-top: 20px;"></div>
        </div>
      `;
    }
  
    function initializeSavingsHandlers() {
      $('#set-goal').off('click').on('click', function () {
        const goalName = $('#goal-name').val();
        const goalAmount = parseFloat($('#goal-amount').val());
        const monthlySaving = parseFloat($('#monthly-saving').val());
  
        if (!goalName || !goalAmount || goalAmount <= 0 || !monthlySaving || monthlySaving <= 0) {
          alert('Please enter valid values for the goal and savings.');
          return;
        }
  
        $('#progress-section').show();
        $('#progress-text').text(
          `You've saved R0 out of R${goalAmount} for "${goalName}". Monthly saving is set at R${monthlySaving}.`
        );
  
        let savedAmount = 0;
        let months = 0;
  
        $('#add-monthly-saving').off('click').on('click', function () {
          if (savedAmount < goalAmount) {
            savedAmount += monthlySaving;
            months++;
            const progressPercentage = Math.min((savedAmount / goalAmount) * 100, 100);
  
            $('#progress-bar').css('width', `${progressPercentage}%`);
            $('#progress-text').text(
              `You've saved R${savedAmount.toFixed(2)} out of R${goalAmount} for "${goalName}".`
            );
  
            $('#breakdown-table tbody').append(`
              <tr>
                <td>Month ${months}</td>
                <td>R${monthlySaving.toFixed(2)}</td>
                <td>R${savedAmount.toFixed(2)}</td>
              </tr>
            `);
  
            if (savedAmount >= goalAmount) {
              $('#progress-bar').css('width', '100%');
              $('#progress-text').text(
                `Goal Complete! You've saved R${savedAmount.toFixed(2)} for "${goalName}".`
              );
              triggerCelebration();
            }
          } else {
            alert('You\'ve already reached your savings goal!');
          }
        });
      });
  
      function triggerCelebration() {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.5 },
        });
  
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 0.3, y: 0.4 },
          });
  
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 0.7, y: 0.4 },
          });
        }, 500);
      }
    }
  });
  