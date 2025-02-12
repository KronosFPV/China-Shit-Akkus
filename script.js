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
        const li
