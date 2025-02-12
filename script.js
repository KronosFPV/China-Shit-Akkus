document.getElementById('addPosition').addEventListener('click', function() {
    const positionsContainer = document.getElementById('positionsContainer');
    const newPosition = document.createElement('div');
    newPosition.classList.add('position');
    
    newPosition.innerHTML = `
        <label for="batteryType">Battery Type:</label>
        <select class="batteryType" required>
            <option value="Lipo">Lipo</option>
            <option value="Li-Ion 6s1p">Li-Ion 6s1p</option>
            <option value="Li-Ion 6s2p">Li-Ion 6s2p</option>
            <option value="Li-Ion 6s3p">Li-Ion 6s3p</option>
        </select>

        <div class="ionOptions hidden">
            <label for="ionType">Ion Type:</label>
            <select class="ionType">
                <option value="P45B">P45B</option>
                <option value="P50B">P50B</option>
                <option value="custom">Eigene Eingabe</option>
            </select>
        </div>

        <label for="currency">Währung:</label>
        <select class="currency" required>
            <option value="USD">US Dollar</option>
            <option value="CHF">CHF</option>
            <option value="EUR">Euro</option>
        </select>

        <label for="price">Preis pro Battery Pack (in Währung):</label>
        <input type="number" class="price" required>

        <label for="quantity">Menge:</label>
        <input type="number" class="quantity" required>
    `;

    positionsContainer.appendChild(newPosition);

    // Event Listener für das Einblenden der Ion-Type-Auswahl bei Li-Ion
    const batteryTypeSelect = newPosition.querySelector('.batteryType');
    batteryTypeSelect.addEventListener('change', function() {
        const ionOptionsDiv = newPosition.querySelector('.ionOptions');
        if (this.value.includes("Li-Ion")) {
            ionOptionsDiv.classList.remove('hidden');
        } else {
            ionOptionsDiv.classList.add('hidden');
        }
    });

    // Trigger für die Ion-Type-Auswahl
    batteryTypeSelect.dispatchEvent(new Event('change'));
});

document.getElementById('batteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTotal();
});

function calculateTotal() {
    let total = 0;
    const positions = document.querySelectorAll('.position');

    positions.forEach(position => {
        const batteryType = position.querySelector('.batteryType').value;
        const price = parseFloat(position.querySelector('.price').value);
        const quantity = parseInt(position.querySelector('.quantity').value);
        
        const country = document.getElementById('country').value;
        const shippingCost = parseFloat(document.getElementById('shippingCost').value);

        let taxRate = 0;

        if (country === 'DE') taxRate = 0.19;
        if (country === 'AT') taxRate = 0.20;
        if (country === 'CH') taxRate = 0.081;

        let subtotal = price * quantity;
        subtotal += subtotal * taxRate;

        total += subtotal;
    });

    const shippingCost = parseFloat(document.getElementById('shippingCost').value);
    total += shippingCost;

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

