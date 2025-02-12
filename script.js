document.getElementById('batteryType').addEventListener('change', function() {
    if (this.value.includes("Li-Ion")) {
        document.getElementById('ionOptions').classList.remove('hidden');
    } else {
        document.getElementById('ionOptions').classList.add('hidden');
    }
});

document.getElementById('batteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTotal();
});

function calculateTotal() {
    const batteryType = document.getElementById('batteryType').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const country = document.getElementById('country').value;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value);

    let taxRate = 0;

    if (country === 'DE') taxRate = 0.19;
    if (country === 'AT') taxRate = 0.20;
    if (country === 'CH') taxRate = 0.081;

    let total = (price * quantity) + shippingCost;
    total += total * taxRate;

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function addPosition() {
    const positionsContainer = document.getElementById('positionsContainer');
    const newPosition = document.createElement('div');
    newPosition.innerHTML = `
        <label for="position">Position:</label>
        <input type="text" id="position" placeholder="Position hinzufügen" />
    `;
    positionsContainer.appendChild(newPosition);
}
