const USER_KEY = "pokemonBankUser";
const TRANS_KEY = "pokemonBankTransactions";
const BALANCE_KEY = "pokemonBankBalance";

const defaultUser = {
    nombre: "Ash Ketchum",
    pin: "1234",
    cuenta: "0987654321",
    saldoInicial: 500
};

function iniciarDatos() {
    if (!localStorage.getItem(USER_KEY)) {
        localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
    }

    if (!localStorage.getItem(BALANCE_KEY)) {
        localStorage.setItem(BALANCE_KEY, defaultUser.saldoInicial);
    }

    if (!localStorage.getItem(TRANS_KEY)) {
        localStorage.setItem(TRANS_KEY, JSON.stringify([]));
    }
}

function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

function getTransactions() {
    return JSON.parse(localStorage.getItem(TRANS_KEY)) || [];
}

function saveTransactions(transactions) {
    localStorage.setItem(TRANS_KEY, JSON.stringify(transactions));
}

function getBalance() {
    return Number(localStorage.getItem(BALANCE_KEY)) || 0;
}

function saveBalance(balance) {
    localStorage.setItem(BALANCE_KEY, balance);
}

iniciarDatos();