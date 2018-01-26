import React, { Component } from 'react';

//create global variables to be used on board
const EMPTY = 0
const MISS = 'Miss'
const HIT = 'Hit'
const DESTROYER = 2
const SUBMARINE = 3
const BATTLESHIP = 4
const AIRCRAFTCARRIER = 5



class BattleshipBoard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			board: this.setupBoard(),
			torpedoesRemaining: 20,
			torpedoesUsed: 0,
		}
	}

	//calls functions to place different sizes of ships
	componentWillMount(){
			this.Destroyer()
			this.Submarine()
			this.Submarine()
			this.Battleship()
			this.AircraftCarrier()

		//TODO check placement of ship is not overlapping
		}

	//creates rows and colums of 10 by 10 grid box
	setupBoard() {
    	let board = []

    	for(let row = 0; row < 10; row++){
      		board.push([])
		  	for(let col = 0; col < 10; col++) {
			 	board[row][col] = EMPTY
		  	}
		}
		console.log(board);

    	return board
  	}



	// renders rows and columns for the view
	renderRows(){
		var rows = []
		for (let i = 0; i < 10; i++) {
			rows.push(<tr id={i} key={i}>{this.renderRow(i)}</tr>)
		}
		return rows
	}

	//renders square column and changes className for ships, empty field or field that got hit or missed
	renderRow(rowNumber) {
		var status = "square"
		var row = []

		for (let i = 0; i < 10; i++) {
			if(this.state.board[rowNumber][i] === EMPTY){
				status = "empty"
			}else if(this.state.board[rowNumber][i] === DESTROYER){
				status = "destroyer"
			}else if(this.state.board[rowNumber][i] === SUBMARINE){
				status = "submarine"
			}else if(this.state.board[rowNumber][i] === BATTLESHIP){
				status = "battleship"
			}else if(this.state.board[rowNumber][i] === AIRCRAFTCARRIER){
				status = "aircraftCarrier"
			}else if(this.state.board[rowNumber][i] === MISS){
				status = "miss"
			}else if(this.state.board[rowNumber][i] === HIT){
				status = "hit"
			}

			let theXY = rowNumber + "_" + i
			row.push(
				<td className={status} onClick={this.clickHandler.bind(this, i, rowNumber)}
				id={theXY}
				key={theXY} >{this.state.board[rowNumber][i]} </td>
			)
		}
		return row
	}

	//places destroyer randomly on board
	Destroyer() {
		const { board } = this.state
		var row = Math.floor(Math.random() * 9)
		var col = Math.floor(Math.random() * 9)

		if (board[row][col] === board[row][col]){
			for (let i = 0; i < DESTROYER; i++){
				board[row][col + i] = DESTROYER
			}
		this.setState({
			board:board
		})
		}
	}

	//places submarine randomly on board
	Submarine() {
		const { board } = this.state
		var row = Math.floor(Math.random() * 9)
		var col = Math.floor(Math.random() * 9)

		if (board[row][col] === board[row][col]){
			for (let i = 0; i < SUBMARINE; i++){
				board[row][col + i] = SUBMARINE
			}
		}
		this.setState({
			board:board
		})
	}

	//places battleship randomly on board
	Battleship() {
		const { board } = this.state
		var row = Math.floor(Math.random() * 9)
		var col = Math.floor(Math.random() * 9)

		if (board[row][col] === board[row][col]){
			for (let i = 0; i < BATTLESHIP; i++){
				board[row][col + i] = BATTLESHIP
			}
		}
		this.setState({
			board:board
		})
	}

	//places aircraftCarrier randmoly on board
	AircraftCarrier() {
		const { board } = this.state
		var row = Math.floor(Math.random() * 9)
    	var col = Math.floor(Math.random() * 9)

		if (board <= this.renderRows()){
			for (let i = 0; i < AIRCRAFTCARRIER; i++){
				board[row][col + i] =AIRCRAFTCARRIER
			}
		}
		this.setState({
			board:board
		})
	}

	//handles logic when a user clicks on a square column
	clickHandler(col, row, e) {
		const { board, torpedoesRemaining, torpedoesUsed } = this.state

		if (torpedoesRemaining <= 0){
			alert("Game Over")
			return
		}

		if(board[row][col] === DESTROYER){
			board[row][col] = HIT
		}else if(board[row][col] === SUBMARINE){
			board[row][col] = HIT
		}else if(board[row][col] === BATTLESHIP){
			board[row][col] = HIT
		}else if(board[row][col] === AIRCRAFTCARRIER){
			board[row][col] = HIT
		}else if (board[row][col] === EMPTY){
			board[row][col] = MISS
		}else if (HIT === HIT && MISS === MISS) {
			alert('Already Clicked Square')
			return
		}

		this.setState({
			board: board,
			torpedoesRemaining: torpedoesRemaining-1,
			torpedoesUsed: torpedoesUsed+1
		})

		console.log(board);
  	}


  	render() {
    	return(
			<div>
      			<table >
        			<tbody>
          				{ this.renderRows() }
        			</tbody>
      			</table>
	  			<h2>Remaining Torpedoes: { this.state.torpedoesRemaining }</h2>
				<h2>Torpedoes Used: { this.state.torpedoesUsed } </h2>
			</div>
    	)
  	}
}

export default BattleshipBoard;
