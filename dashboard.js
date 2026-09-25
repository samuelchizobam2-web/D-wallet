// ===============================
// D-WALLET DASHBOARD
// ===============================

// Get saved balance
let walletBalance = Number(localStorage.getItem("walletBalance"));

if (isNaN(walletBalance)) {
    walletBalance = 3000;
}

// Get elements
const balanceElement = document.getElementById("balance");
const toggleBalanceBtn = document.getElementById("toggleBalanceBtn");

const addMoneyBtn = document.getElementById("addMoneyBtn");

const sendMoneyBtn = document.getElementById("sendMoneyBtn");
const sendForm = document.getElementById("sendForm");
const transferBtn = document.getElementById("transferBtn");

const recipient = document.getElementById("recipient");
const amount = document.getElementById("amount");

const transactionHistory =
    document.getElementById("transactionHistory");

// ===============================
// GET SAVED TRANSACTIONS
// ===============================

let transactions = [];

try {
    transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];
} catch (error) {
    transactions = [];
}


// ===============================
// SHOW BALANCE
// ===============================

function showBalance() {
    balanceElement.textContent =
        "₦" + walletBalance.toFixed(2);
}

showBalance();


// ===============================
// HIDE / SHOW BALANCE
// ===============================

let balanceHidden = false;

toggleBalanceBtn.onclick = function () {

    if (balanceHidden === false) {

        balanceElement.textContent = "₦••••••";
        balanceHidden = true;

    } else {

        showBalance();
        balanceHidden = false;

    }
};


// ===============================
// ADD MONEY
// ===============================

addMoneyBtn.onclick = function () {

    const amountToAdd =
        Number(prompt("Enter amount to add:"));

    if (isNaN(amountToAdd) || amountToAdd <= 0) {

        alert("Please enter a valid amount.");
        return;
    }

    walletBalance += amountToAdd;

    localStorage.setItem(
        "walletBalance",
        walletBalance
    );

    showBalance();

    transactions.push({
        type: "deposit",
        amount: amountToAdd,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    showTransactions();

    alert("Money added successfully.");
};


// ===============================
// SHOW SEND MONEY FORM
// ===============================

sendMoneyBtn.onclick = function () {

    sendForm.style.display = "block";

};
const returnBtn= document.getElementById("returnBtn");
returnBtn.onclick=function(){
    sendForm.style.display="none";
}


// ===============================
// SEND MONEY
// ===============================

transferBtn.onclick = function () {

    const sendAmount =
        Number(amount.value);

    if (recipient.value === "") {

        alert("Please enter Recipient Account Number.");
        return;
    }

    if (isNaN(sendAmount) || sendAmount <= 0) {

        alert("Please enter a valid amount.");
        return;
    }

    if (sendAmount > walletBalance) {

        alert("Insufficient balance.");
        return;
    }

    walletBalance -= sendAmount;

    localStorage.setItem(
        "walletBalance",
        walletBalance
    );

    transactions.push({
        type: "sent",
        recipient: recipient.value,
        amount: sendAmount,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    showBalance();

    amount.value = "";
    recipient.value = "";

    showTransactions();

    alert("Transfer Successful");
};


// ===============================
// TRANSACTION HISTORY
// ===============================

function showTransactions() {

    transactionHistory.innerHTML = "";

    if (transactions.length === 0) {

        transactionHistory.innerHTML =
            "<p>No transactions yet</p>";

        return;
    }

    transactions.forEach(function (tx) {

        if (tx.type === "deposit") {

            transactionHistory.innerHTML += `
                <p>
                    Added ₦${tx.amount.toFixed(2)}
                    <small>${tx.date}</small>
                </p>
            `;

        } else {

            transactionHistory.innerHTML += `
                <p>
                    Sent ₦${tx.amount.toFixed(2)}
                    to ${tx.recipient}
                    <small>${tx.date}</small>
                </p>
            `;
        }

    });
}

showTransactions();