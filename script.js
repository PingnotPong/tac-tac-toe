const contentDiv = document.getElementById('content');
let tableHTML = '<table>';
let currentPlayer = 'circle';

let playingField = [
    null,
    null,
    null,
    null,
    null,
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
            setSymbols(cellValue, cellIndex)
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function setSymbols(cellValue, cellIndex) {
    let cellContent = '';
    if (cellValue === 'circle') {
        cellContent = generateCircle();
    } else if (cellValue === 'cross') {
        cellContent = generateCross();
    }
    tableHTML += `
                <td onclick="handleCellClick(${cellIndex}, this)">
                    ${cellContent}
                </td>`;
}

function generateCircle() {
    return `
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx="32" 
                cy="32" 
                r="27" 
                fill="none" 
                stroke="#0135A7" 
                stroke-width="5" 
                stroke-dasharray="170" 
                stroke-dashoffset="170"
                style="animation: loadCircle 250ms linear forwards;">
            </circle>
        </svg>
        <style>
            @keyframes loadCircle {
                to {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    `;
}

function generateCross() {
    return `
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <line 
                x1="10" y1="10" x2="54" y2="54" 
                stroke="#7C0707" 
                stroke-width="5" 
                stroke-linecap="round"
                stroke-dasharray="62.5"
                stroke-dashoffset="62.5"
                style="animation: drawLine1 250ms linear forwards;">
            </line>
            <line 
                x1="54" y1="10" x2="10" y2="54" 
                stroke="#7C0707" 
                stroke-width="5" 
                stroke-linecap="round"
                stroke-dasharray="62.5"
                stroke-dashoffset="62.5"
                style="animation: drawLine2 250ms linear 250ms forwards;">
            </line>
        </svg>
        <style>
            @keyframes drawLine1 {
                to {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes drawLine2 {
                to {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    `;
}

function handleCellClick(cellIndex, cellElement) {
    if (playingField[cellIndex] !== null) return;
    playingField[cellIndex] = currentPlayer;
    if (currentPlayer === 'circle') {
        cellElement.innerHTML = generateCircle();
    } else if (currentPlayer === 'cross') {
        cellElement.innerHTML = generateCross();
    }
    cellElement.onclick = null;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}
