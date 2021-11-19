const { humanMark, aiMark } = require('./constants')
const { checkIfWinnerFound, getAllEmptyCellsIndexes } = require('./utils')


function negamax(currBdSt, currMark, alpha, beta) {
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    if (checkIfWinnerFound(currBdSt, humanMark)) {
        if (currMark === humanMark) return {score: 1}
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        if (currMark === humanMark) return {score: -1}
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }

    const allTestPlayInfos = [];

    let bestTestPlay = null;
    let bestScore = -Infinity;

    for (let i = 0; i < availCellsIndexes.length; i++) {
        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        currBdSt[availCellsIndexes[i]] = currMark;

        const nextMark = aiMark === currMark ? humanMark : aiMark
        const result = negamax(currBdSt, nextMark, beta * -1, alpha * -1);
        currentTestPlayInfo.score = result.score * -1;

        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        allTestPlayInfos.push(currentTestPlayInfo);

        const score = currentTestPlayInfo.score
        if (score > bestScore) {
            bestScore = score;
            bestTestPlay = i;
        }

        alpha = Math.max(alpha, bestScore);
        if (alpha >= beta) {
            console.log(`Cutting ${alpha} >= ${beta}`)
            break
        }
    }

    return allTestPlayInfos[bestTestPlay];
}


const currentBoardState = ["X", 1, "O", 3, 4, 5, "O", 7, "X"];
const currentPlayer = aiMark;
const alpha = -Infinity;
const beta = +Infinity;

const bestPlayInfo = negamax(currentBoardState, currentPlayer, alpha, beta);
console.log(`Best move for '${currentPlayer}' mark is to add to the cell number ${bestPlayInfo.index} - score: ${bestPlayInfo.score}`)