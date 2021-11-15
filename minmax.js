const currentBoardState = ["X", 1, "O", 3, 4, 5, "O", 7, "X"];
const aiMark = "X";
const humanMark = "O";

function getAllEmptyCellsIndexes(currBdSt) {
    return currBdSt.filter(i => i !== "O" && i !== "X");
}

function checkIfWinnerFound(currBdSt, currMark) {
    return (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
        (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
        (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
        (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark);
}

function minimax(currBdSt, currMark) {
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    if (checkIfWinnerFound(currBdSt, humanMark)) {
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }

    const allTestPlayInfos = [];

    for (let i = 0; i < availCellsIndexes.length; i++) {
        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        currBdSt[availCellsIndexes[i]] = currMark;

        const nextPlayer = aiMark === currMark ? humanMark : aiMark
        const result = minimax(currBdSt, nextPlayer);
        currentTestPlayInfo.score = result.score;

        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        allTestPlayInfos.push(currentTestPlayInfo);
    }

    let bestTestPlay = null;

    if (currMark === aiMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    }

    return allTestPlayInfos[bestTestPlay];
}

const currentPlayer = aiMark
const bestPlayInfo = minimax(currentBoardState, currentPlayer);
console.log(`Best move for ${currentPlayer}: ${bestPlayInfo.score}/${bestPlayInfo.index}`)