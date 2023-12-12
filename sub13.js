function loadGoogleSheetData() {
    const spreadsheetId = '1v0J4UxunI8U61H5DmdKI_3NqgnX90n5NVkuPmUJbHuY';
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'subtreze'
    }).then(function(response) {
        const data = response.result.values;
        const cardContainer = document.getElementById('card-container');

        // Limpe qualquer conteúdo existente no container de cards
        cardContainer.innerHTML = '';

        data.forEach(function(row) {
            const imgSrc = row[0];
            const descricao = row[1];

            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Imagem';
            img.style.maxWidth = '100%';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const p = document.createElement('p');
            p.className = 'card-text';
            p.textContent = descricao;

            cardBody.appendChild(p);
            card.appendChild(img);
            card.appendChild(cardBody);

            cardContainer.appendChild(card);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyCQPYlTMTw5rTYW8vKDZKfH-UA4NwtJQYo',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);