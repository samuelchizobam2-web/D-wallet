// ===============================
// DEMO WALLET
// ===============================

// Get saved balance, or start at ₦3,000
let walletBalance = Number(localStorage.getItem("walletBalance")) || 3000;

// Get balance display
const balanceElement = document.getElementById("balance");

// Get Send Money elements
const sendMoneyBtn = document.getElementById("sendMoneyBtn");
const sendForm = document.getElementById("sendForm");
const transferBtn = document.getElementById("transferBtn");
const recipient = document.getElementById("recipient");
const amount = document.getElementById("amount");

// Get transaction history
const transactionHistory =
    document.getElementById("transactionHistory");

// Get saved transactions
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// ===============================
// SHOW BALANCE
// ===============================

balanceElement.textContent =
    "₦" + walletBalance.toFixed(2);


// ===============================
// SHOW SEND MONEY FORM
// ===============================

sendMoneyBtn.addEventListener("click", function () {
    sendForm.style.display = "block";
});


// ===============================
// TRANSFER MONEY
// ===============================

transferBtn.addEventListener("click", function () {

    const sendAmount = Number(amount.value);

    // Check recipient
    if (recipient.value === "") {
        alert("Please enter Recipient Account Number.");
        return;
    }

    // Check amount
    if (isNaN(sendAmount) || sendAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Check balance
    if (sendAmount > walletBalance) {
        alert("Insufficient balance.");
        return;
    }

    // Remove money from balance
    walletBalance -= sendAmount;

    // Save new balance
    localStorage.setItem("walletBalance", walletBalance);

    // Add transaction
    transactions.push({
        recipient: recipient.value,
        amount: sendAmount,
        date: new Date().toLocaleString()
    });

    // Save transactions
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    // Update balance on screen
    balanceElement.textContent =
        "₦" + walletBalance.toFixed(2);

    // Show success message
    alert("Transfer Successful");

    // Clear inputs
    amount.value = "";
    recipient.value = "";

    // Update transaction history
    showTransactions();
});


// ===============================
// TRANSACTION HISTORY
// ===============================

function showTransactions() {

    transactionHistory.innerHTML = "";

    if (transactions.length === 0) {
        transactionHistory.innerHTML =
            "<p>No transactions yet.</p>";
        return;
    }

    transactions.forEach(function (tx) {

        transactionHistory.innerHTML += `
            <p>
                Sent ₦${tx.amount.toFixed(2)}
                to ${tx.recipient}
                <small>${tx.date}</small>
            </p>
        `;

    });
}


// Show saved transactions when page loads
showTransactions();