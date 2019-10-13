class TicTacToe {
    constructor() {
			this.board =  [ [null, null, null], 
											[null, null, null], 
											[null, null, null] ];
			this.players = [
				{
					// name: 'one',
					symbol: 'x',
					// index: 1
				},
				{
					// name: 'two',
					symbol: 'o',
					// index: 2
				}
			];
			this.currentPlayer = this.players[0];
			this.winner = null;
    }

    getCurrentPlayerSymbol() {
			return this.currentPlayer.symbol;
		}

    nextTurn(rowIndex, columnIndex) {
			if (!this.board[rowIndex][columnIndex]) {
				this.board[rowIndex][columnIndex] = this.currentPlayer.symbol;

        this.currentPlayer = this.players[
					(this.currentPlayer.symbol === this.players[0].symbol) ? 1 : 0
			];
			}
			function inspectionBoard(board){
				let cellsForCheck = [
					{coordCheckCell: [0, 1], arrowCouples: [ 'w_e' ]},
					{coordCheckCell: [1, 0], arrowCouples: [ 'n_s' ]},
					{coordCheckCell: [1, 1], arrowCouples: [ 'n_s', 'w_e', 'nw_se', 'sw_ne' ]},
					{coordCheckCell: [1, 2], arrowCouples: [ 'n_s' ]},
					{coordCheckCell: [2, 1], arrowCouples: [ 'w_e' ]}
				];
				let coupleCompass = {
					n_s:   [[-1,  0],[ 1, 0]],
					w_e:   [[ 0, -1],[ 0, 1]],
					nw_se: [[-1, -1],[ 1, 1]],
					sw_ne: [[ 1, -1],[-1, 1]]
				};
				function inspectionCells(cellsArr, couplesArr, board){
					let win = null;
					cellsArr.forEach(cell => {
							let coordCell = cell.coordCheckCell;
							cell.arrowCouples.forEach(arrowNeighbours => {
									let coordLeftNeighbour = couplesArr[arrowNeighbours][0]
										.map((el, index) => el + coordCell[index]);
									let coordRightNeighbour = couplesArr[arrowNeighbours][1]
										.map((el, index) => el + coordCell[index]);
									let qq = [
										(board[coordLeftNeighbour[0]][coordLeftNeighbour[1]]),
										(board[coordCell[0]][coordCell[1]]),
										(board[coordRightNeighbour[0]][coordRightNeighbour[1]])
									]
										.sort();
									if (qq[0] === qq[2]) {
										win = qq[0];
									}
							}); 
					})
					return win;
				}	
				return inspectionCells(cellsForCheck, coupleCompass, board);
			}
			this.winner = inspectionBoard(this.board) ? inspectionBoard(this.board) : null;
	
    }

    isFinished() {
			return (this.noMoreTurns() || this.winner !== null) ? true : false;
    }

    getWinner() {
			return this.winner;
    }

    noMoreTurns() {
			return this.board.every(iArr => iArr.every(el => !!el));
    }

    isDraw() {
			return (this.noMoreTurns() && !this.getWinner()) ? true : false;
    }

    getFieldValue(rowIndex, colIndex) {
			return this.board[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
