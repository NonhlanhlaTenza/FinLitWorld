
$(document).ready(function () {
$('#microloans-action').click(function () {
  const formHtml = `
    <h3 id="apply-heading">Apply for a Microloan</h3>
    <div id="loan-report" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color:  #02130b; display: none; color: white"></div>
    <form id="microloan-form">
      <div class="form-field">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-field">
        <label for="surname">Surname</label>
        <input type="text" id="surname" name="surname" required>
      </div>
      <div class="form-field">
        <label for="id">ID</label>
        <input type="text" id="id" name="id" required>
      </div>
      <div class="form-field">
        <label for="loan-amount">Loan Amount</label>
        <input type="number" id="loan-amount" name="loan_amount" min="1000" max="20 000"  required>
      </div>
      <div class="form-field">
        <label for="interest-rate">Interest Rate (%)</label>
        <input type="number" id="interest-rate" name="interest_rate" step="0.01" value="8" readonly>
      </div>
      <div class="form-field">
        <label for="payment-period">Payment Period (Months)</label>
        <input type="number" id="payment-period" name="payment_period" min="1" max="36" required>
      </div>
      <div class="responses">
         <div class="form-actions">
           <button type="button" id="check-loan">Check</button>
         </div>
         
         <div class="form-actions">
           <button type="button" id="submit-loan">Apply</button>
         </div>
         
      </div>
    </form>
  `;
  $('.transactions').html(formHtml);

  $('#check-loan').click(function () {
    const loanAmount = parseFloat($('#loan-amount').val());
    const interestRate = parseFloat($('#interest-rate').val());
    const paymentPeriod = parseInt($('#payment-period').val());

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(paymentPeriod)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = paymentPeriod;
    const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalPayments));
    const totalRepayment = monthlyPayment * totalPayments;
    const totalInterest = totalRepayment - loanAmount;

    const reportHtml = `
      <h3 id="loan-repayment">Loan Repayment Details</h3>
      <p><strong>Name:</strong> ${$('#name').val()}</p>
      <p><strong>Surname:</strong> ${$('#surname').val()}</p>
      <p><strong>ID:</strong> ${$('#id').val()}</p>
      <p><strong>Loan Amount:</strong> R${loanAmount.toFixed(2)}</p>
      <p><strong>Interest Rate:</strong> ${interestRate}%</p>
      <p><strong>Payment Period:</strong> ${paymentPeriod} months</p>
      <p><strong>Monthly Payment:</strong> R${monthlyPayment.toFixed(2)}</p>
      <p><strong>Total Repayment:</strong> R${totalRepayment.toFixed(2)}</p>
      <p><strong>Total Interest Paid:</strong> R${totalInterest.toFixed(2)}</p>
    `;
    $('#loan-report').html(reportHtml).show();
  });

  $('#submit-loan').click(function () {
    const name = $('#name').val();
    const surname = $('#surname').val();
    const id = $('#id').val();
    const loanAmount = $('#loan-amount').val();
    const paymentPeriod = $('#payment-period').val();

    // Ensure all required fields are filled
    if (!name || !surname || !id || !loanAmount || !paymentPeriod) {
      alert('Please fill out all fields before applying.');
      return;
    }

    // Display thank-you message and refresh the page
    alert('Thank you for applying!');
    location.reload();
  });
});
});
