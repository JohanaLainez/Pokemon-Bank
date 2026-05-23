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

function generarComprobantePDF(tipo, monto, detalle) {
        if (!window.jspdf) {
        console.error("Error: La librería jsPDF no está cargada en este archivo HTML.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const user = getUser(); 
    const saldoActual = getBalance();

    doc.setFontSize(22);
    doc.setTextColor(42, 109, 181); 
    doc.setFont('helvetica', 'bold'); 
    doc.text("POKEMON BANK ATM", 105, 25, null, null, "center");

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("----------------------------------------------------------------", 105, 35, null, null, "center");

    doc.text(`Fecha y Hora: ${new Date().toLocaleString()}`, 20, 45);

    doc.text(`Cliente: ${user.nombre}`, 20, 55);
    doc.text(`N° Cuenta: ${user.cuenta}`, 20, 65);

    doc.text("----------------------------------------------------------------", 105, 75, null, null, "center");
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Transacción: ${tipo}`, 20, 85);
    doc.text(`Detalle: ${detalle}`, 20, 95);
    
    doc.setFont('helvetica', 'normal');
    doc.setFont(undefined, 'bold');
    doc.text(`Monto: $${Number(monto).toFixed(2)}`, 20, 110);
    doc.text(`Saldo Disponible: $${Number(saldoActual).toFixed(2)}`, 20, 120);

    
    doc.save(`Ticket_${tipo.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
    
}

iniciarDatos();