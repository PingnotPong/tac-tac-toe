const contentDiv = document.getElementById('content');
let tableHTML = '<table>';

let playingField = [
    null,
    'circle',
    null,
    null,
    'cross',
    null,
    null,
    null,
    null
]

function init() {
    render(playingField)
}

function render() {
    for (let row = 0; row < 3; row++) {
        tableHTML += '<tr>';
        for (let col = 0; col < 3; col++) {
            const cellIndex = row * 3 + col;
            const cellValue = playingField[cellIndex];
            setSymbols(cellValue)
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function setSymbols(cellValue) {
    let cellContent = '';
    if (cellValue === 'circle') {
        cellContent = 'o'; // Kreis
    } else if (cellValue === 'cross') {
        cellContent = 'x'; // Kreuz
    }
    tableHTML += `<td>${cellContent}</td>`;
}