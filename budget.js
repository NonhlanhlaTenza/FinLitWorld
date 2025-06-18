$(document).ready(function () {
    // Add a click handler for the budget action
    $('#budget-action').click(function () {
      $('.transactions').html(getBudgetHtml());
      initializeBudgetHandlers();
    });
  
    function getBudgetHtml() {
      return `
        <div id="budget-section">
          <h1>Budget Tracker</h1>
          <form id="expense-form">
            <label for="expense-name">Expense Name:</label>
            <input type="text" id="expense-name" placeholder="e.g., Groceries" required>
  
            <label for="expense-amount">Amount:</label>
            <input type="number" id="expense-amount" min="1" placeholder="e.g., 500" required>
  
            <label for="expense-category">Category:</label>
            <select id="expense-category" required>
              <option value="groceries">Groceries</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
  
            <button type="button" id="add-expense">Add Expense</button>
          </form>
  
          <h2>Expenses Summary</h2>
          <table id="expenses-table">
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
  
          <h3>Total Expenses by Category</h3>
          <div id="category-summary"></div>
        </div>
      `;
    }
  
    function initializeBudgetHandlers() {
      let expenses = [];
  
      $('#add-expense').click(function () {
        const name = $('#expense-name').val().trim();
        const amount = parseFloat($('#expense-amount').val());
        const category = $('#expense-category').val();
  
        if (!name || isNaN(amount) || amount <= 0) {
          alert('Please fill out all fields correctly.');
          return;
        }
  
        // Add expense to the array
        const expense = { name, amount, category };
        expenses.push(expense);
  
        // Clear inputs
        $('#expense-name').val('');
        $('#expense-amount').val('');
        $('#expense-category').val('groceries');
  
        // Update the table
        updateExpensesTable();
        updateCategorySummary();
      });
  
      function updateExpensesTable() {
        const tbody = $('#expenses-table tbody');
        tbody.empty(); // Clear the table
  
        expenses.forEach((expense, index) => {
          const row = `
            <tr>
              <td>${expense.name}</td>
              <td>R${expense.amount.toFixed(2)}</td>
              <td>${capitalize(expense.category)}</td>
              <td><button class="delete-expense" data-index="${index}">Delete</button></td>
            </tr>
          `;
          tbody.append(row);
        });
  
        // Add delete functionality
        $('.delete-expense').click(function () {
          const index = $(this).data('index');
          expenses.splice(index, 1); // Remove the expense
          updateExpensesTable();
          updateCategorySummary();
        });
      }
  
      function updateCategorySummary() {
        const summary = {};
        expenses.forEach((expense) => {
          summary[expense.category] = (summary[expense.category] || 0) + expense.amount;
        });
  
        const summaryHtml = Object.keys(summary)
          .map((category) => `<p>${capitalize(category)}: R${summary[category].toFixed(2)}</p>`)
          .join('');
        $('#category-summary').html(summaryHtml);
      }
  
      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  });
  