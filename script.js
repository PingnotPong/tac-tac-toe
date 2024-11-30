const contentDiv = document.getElementById('content');
let tableHTML = '<table>';
let currentPlayer = 'circle';
let gameOver = false;

let playingField = [
    null, null, null,
    null, null, null,
    null, null, null,
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
                <td onclick="handleCellClick(${cellIndex}, this)" data-index="${cellIndex}">
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
    if (gameOver || playingField[cellIndex] !== null) return;
    if (playingField[cellIndex] !== null) return;
    playingField[cellIndex] = currentPlayer;
    if (currentPlayer === 'circle') {
        cellElement.innerHTML = generateCircle();
    } else if (currentPlayer === 'cross') {
        cellElement.innerHTML = generateCross();
    }
    cellElement.onclick = null;
    const winnerCombination = checkWinner();
    if (winnerCombination) {
        gameOver = true;
        drawWinningLine(winnerCombination);
        alert(`${currentPlayer.toUpperCase()} hat gewonnen!`);
        return;    }
    if (isBoardFull()) {
        gameOver = true;
        alert('Das Spiel endet unentschieden!');
        return;
    }
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            playingField[a] &&
            playingField[a] === playingField[b] &&
            playingField[a] === playingField[c]
        ) {
            return combination;
        }
    }

    return null;
}

function isBoardFull() {
    return playingField.every(cell => cell !== null);
}

function drawWinningLine(winningCombination) {
    const [start, middle, end] = winningCombination;
    const table = document.querySelector('table');
    const startCell = document.querySelector(`td[data-index="${start}"]`);
    const endCell = document.querySelector(`td[data-index="${end}"]`);

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    const startX = startRect.left - tableRect.left + startRect.width / 2;
    const startY = startRect.top - tableRect.top + startRect.height / 2;
    const endX = endRect.left - tableRect.left + endRect.width / 2;
    const endY = endRect.top - tableRect.top + endRect.height / 2;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const line = document.createElementNS(svgNS, 'line');

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = 0;
    svg.style.left = 0;

    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5');

    svg.appendChild(line);
    table.style.position = 'relative';
    table.appendChild(svg);
}

