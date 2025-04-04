let balance = 0;
const transactions = [];

function addTransaction(type) {
    const descInput = document.getElementById('desc');
    const amountInput = document.getElementById('amount');
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!desc || isNaN(amount) || amount <= 0) return;

    transactions.push({ desc, amount, type });
    if (type === 'income') balance += amount;
    else balance -= amount;

    descInput.value = '';
    amountInput.value = '';

    updateUI();
}

function updateUI() {
    document.getElementById('balance').textContent = balance.toFixed(2);
    const list = document.getElementById('transaction-list');
    list.innerHTML = '';

    transactions.forEach(t => {
        const li = document.createElement('li');
        li.style.background = t.type === 'income' ? 'linear-gradient(to right, #76b852, #8DC26F)' : 'linear-gradient(to right, #e52d27, #b31217)';
        li.innerHTML = `${t.desc} <span>₹${t.amount}</span>`;
        list.appendChild(li);
    });
}