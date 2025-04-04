let balance = 0;
let transactions = [];
let transactionId = 0;

function addTransaction(type) {
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc || isNaN(amount) || amount <= 0) return;

  transactions.push({
    id: transactionId++,
    desc,
    amount,
    type
  });

  balance += type === 'income' ? amount : -amount;

  descInput.value = '';
  amountInput.value = '';

  updateUI();
}

function deleteTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    balance -= transaction.type === 'income' ? transaction.amount : -transaction.amount;
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
  }
}

function updateUI() {
  document.getElementById('balance').textContent = balance.toFixed(2);
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.style.background = t.type === 'income'
      ? 'linear-gradient(to right, #76b852, #8DC26F)'
      : 'linear-gradient(to right, #e52d27, #b31217)';

    const span = document.createElement('span');
    span.textContent = `₹${t.amount}`;

    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');

    // Mobile click toggle
    li.addEventListener('click', () => {
      deleteBtn.classList.toggle('show');
    });

    // Prevent click bubbling when clicking on 🗑️
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTransaction(t.id);
    });

    li.append(`${t.desc} `, span, deleteBtn);
    list.appendChild(li);
  });
}