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

        <div class="liIonOptions hidden">
            <label for="ionType">Li-Ion Type:</label>
            <select class="ionType">
                <option value="P45B">P45B</option>
                <option value="P50B">P50B</option>
                <option value="custom">Eigene Eingabe</option>
            </select>

            <!-- Eingabefeld für eigene Eingabe -->
            <input type="text" class="customIonInput hidden" placeholder="Gib Deinen Typ ein">
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

        <button type="button" class="removePosition">Position entfernen</button>
    `;

    // Entfernen der Position
    newPosition.querySelector('.removePosition').addEventListener('click', function() {
        positionsContainer.removeChild(newPosition);
    });

    positionsContainer.appendChild(newPosition);

    // Event Listener für das Einblenden der Li-Ion Type-Auswahl bei Li-Ion
    const batteryTypeSelect = newPosition.querySelector('.batteryType');
    batteryTypeSelect.addEventListener('change', function() {
        const liIonOptionsDiv = newPosition.querySelector('.liIonOptions');
        const customIonInput = newPosition.querySelector('.customIonInput');
        if (this.value.includes("Li-Ion")) {
            liIonOptionsDiv.classList.remove('hidden');
        } else {
            liIonOptionsDiv.classList.add('hidden');
            customIonInput.classList.add('hidden');
        }
    });

    // Event Listener für die Auswahl „Eigene Eingabe“
    const ionTypeSelect = newPosition.querySelector('.ionType');
    ionTypeSelect.addEventListener('change', function() {
        const customIonInput = newPosition.querySelector('.customIonInput');
        if (this.value === "custom") {
            customIonInput.classList.remove('hidden');
        } else {
            customIonInput.classList.add('hidden');
        }
    });

    // Trigger für die Li-Ion Type-Auswahl
    batteryTypeSelect.dispatchEvent(new Event('change'));
});

document.getElementById('batteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTotal();
});

function calculateTotal() {
    let total = 0;
    let shippingCost = parseFloat(document.getElementById('shippingCost').value);
    const country = document.getElementById('country').value;

    let totalTax = 0;
    let totalShipping = 0;

    const positions = document.querySelectorAll('.position');

    positions.forEach(position => {
        const price = parseFloat(position.querySelector('.price').value);
        const quantity = parseInt(position.querySelector('.quantity').value);

        let taxRate = 0;

        if (country === 'DE') taxRate = 0.19;
        if (country === 'AT') taxRate = 0.20;
        if (country === 'CH') taxRate = 0.081;

        let subtotal = price * quantity;
        let tax = subtotal * taxRate;
        let positionTotal = subtotal + tax;

        total += positionTotal;

        // Aufschlüsselung
        totalTax += tax;
        totalShipping = shippingCost;
    });

    // Gesamtbetrag berechnen
    total += totalShipping;

    // Währung und Ergebnis anzeigen
    const currency = document.querySelector('.currency').value;
    const currencyLabel = document.getElementById('currencyLabel');
    currencyLabel.textContent = `Gesamtpreis in ${currency}:`;

    // Anzeigen der Steuern und Versandkosten
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    document.getElementById('shippingLabel').textContent = `Versandkosten: ${totalShipping.toFixed(2)} ${currency}`;
    document.getElementById('taxLabel').textContent = `MwSt.: ${totalTax.toFixed(2)} ${currency}`;
}
