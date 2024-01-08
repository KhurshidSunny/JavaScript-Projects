'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Khurshid Khan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Sahil Khan',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Mustafa Qarar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Babar Azam',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const date = new Date(acc.movementsDates[i]);
    const now = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const displayDate = ` ${day < 10 ? ` 0${day}` : day}/${
      month < 9 ? `0${month}` : month
    }/${year}`;

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.innerHTML = `${acc.balance.toFixed(2)} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = incomes.toFixed(2);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((mov, cur) => mov + cur, 0);
  labelSumOut.textContent = Math.abs(out).toFixed(2);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = interest.toFixed(2);
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    return (acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.at(0))
      .join(''));
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display the UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Current Date
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day < 10 ? `0${day}` : day}/${
      month < 9 ? `0${month}` : month
    }/${year}, ${hour}:${min}`;

    // clearing the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // udpate UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = inputTransferAmount.value;
  const receivedAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // clearing the fields
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receivedAcc &&
    currentAccount.balance >= amount &&
    receivedAcc?.username !== currentAccount.username
  ) {
    receivedAcc.movements.push(Number(amount));
    currentAccount.movements.push(Number(-amount));

    // also push current date
    currentAccount.movementsDates.push(new Date().toISOString());
    receivedAcc.movementsDates.push(new Date().toISOString());

    // update UI
    updateUI(currentAccount);
  }
});

// transfer amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= mov * 0.1)) {
    // Add the amount to the current user movement
    currentAccount.movements.push(amount);

    // also push current date
    currentAccount.movementsDates.push(new Date().toISOString());

    // update the UI
    updateUI(currentAccount);
  }
});

// Delete the account from bank
btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    String(currentAccount.pin) === inputClosePin.value
  ) {
    // find the index of the this account
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );

    // Deleting the account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }

  // clearing the fields
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sort the movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const x = new Array(7);

// fill it up with 74 only in all locations
x.fill(74);

// fill it up onward 3rd index (index 3 is included)
x.fill(29, 3);

x.fill(99, 4, 6);
console.log(x);

*/

///////////// Array.from() //////////////////
/*
labelBalance.addEventListener('click', function () {
  // so querySelectorAll returns an object and we'll convert it to array
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent
  );

  console.log(movementsUI);
});
*/

// const randomInt = function (min, max) {
//   const rand = Math.floor(Math.random() * (max - min) + 1) + min;
//   return rand;
// };

// console.log(randomInt(10, 20));
