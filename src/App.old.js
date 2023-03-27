import React, { createRef, useRef } from 'react';
import './App.css'

let ThemeContext = 'light'
let squareValue = "O"

let state = 0
let clicked = 0
let theme = 0 // 1 winning

let squares = []

// 6 7 8
// 3 4 5
// 0 1 2

//x = 1
function win(a, b, c, val) {
  if (val === "") return
  console.log(`setting squares ${a},${b},${c} as winning squares for |${val}|`)
  for (const e of [a, b, c]) {
    theme |= (1<<e)
  }
  // play an animation where X/O wins
  // change board to thier color
}


function calculateWinners(i, value) {
  console.log(state.toString(2))
  // horizontally
  for (let i = 0; i < 3; i++) {
    let box1Clicked = (clicked & (1 << (3 * i))) >> 3 * i
    let box2Clicked = (clicked & (1 << (3 * i + 1))) >> 3 * i + 1
    let box3Clicked = (clicked & (1 << (3 * i + 2))) >> 3 * i + 2
    let clickedCells = (box1Clicked === 1) && (box1Clicked === box2Clicked) && (box2Clicked === box3Clicked)
    // console.log(clickedCells, box1Clicked, box2Clicked, box3Clicked, i, 3 * i, 3 * i + 1, 3 * i + 2)
    if (clickedCells) {
      let box1State = (state & (1 << (3 * i))) >> 3 * i
      let box2State = (state & (1 << (3 * i + 1))) >> 3 * i + 1
      let box3State = (state & (1 << (3 * i + 2))) >> 3 * i + 2
      let stateCells = (box1State === box2State) && (box2State === box3State)
      // console.log(stateCells, box1State, box2State, box3State, i, 3 * i, 3 * i + 1, 3 * i + 2)
      let value = stateCells ? "O" : "X"
      if (stateCells) {
        win((3 * i), (3 * i + 1), (3 * i + 2), state)
        return;
      }
    }
  }
  // vertically
  for (let i = 0; i < 3; i++) {
    let box1Clicked = (clicked & (1 << i)) >> i
    let box2Clicked = (clicked & (1 << 3 + i)) >> 3 + i
    let box3Clicked = (clicked & (1 << 6 + i)) >> 6 + i
    let clickedCells = (box1Clicked === 1) && (box1Clicked === box2Clicked) && (box2Clicked === box3Clicked)
    // console.log(clickedCells, box1Clicked, box2Clicked, box3Clicked, i, 3 * i, 3 * (i + 1), 3 * i + 2)
    if (clickedCells) {
      let box1State = (state & (1 << i)) >> i
      let box2State = (state & (1 << 3 + i)) >> 3 + i
      let box3State = (state & (1 << 6 + i)) >> 6 + i
      let stateCells = (box1State === box2State) && (box2State === box3State)
      // console.log(stateCells, box1State, box2State, box3State, i, 3 * i, 3 * i + 1, 3 * i + 2)
      let value = stateCells ? "O" : "X"
      if (stateCells) {
        win(8 - i, 8 - (3 + i), 8 - (6 + i), value)
        return;
      }
    }
  }
  // 8 7 6
  // 5 4 3
  // 2 1 0

  //x = 1
  // diagonaly 
  if (true) {
    let box1Clicked = (clicked & (1 << 0)) >> 0
    let box2Clicked = (clicked & (1 << 4)) >> 4
    let box3Clicked = (clicked & (1 << 8)) >> 8
    let clickedCells = (box1Clicked === 1) && (box1Clicked === box2Clicked) && (box2Clicked === box3Clicked)
    // console.log(clickedCells, box1Clicked, box2Clicked, box3Clicked, i, 3 * i, 3 * (i + 1), 3 * i + 2)
    if (clickedCells) {
      let box1State = (state & (1 << 0)) >> 0
      let box2State = (state & (1 << 4)) >> 4
      let box3State = (state & (1 << 8)) >> 8
      let stateCells = (box1State === box2State) && (box2State === box3State)
      // console.log(stateCells, box1State, box2State, box3State, i, 3 * i, 3 * i + 1, 3 * i + 2)
      let value = stateCells ? "O" : "X"
      if (stateCells) {
        win(0, 4, 8, value)
        return;
      }
    }
  }
  if (true) {
    let box1Clicked = (clicked & (1 << 2)) >> 2
    let box2Clicked = (clicked & (1 << 4)) >> 4
    let box3Clicked = (clicked & (1 << 6)) >> 6
    let clickedCells = (box1Clicked === 1) && (box1Clicked === box2Clicked) && (box2Clicked === box3Clicked)
    // console.log(clickedCells, box1Clicked, box2Clicked, box3Clicked, i, 3 * i, 3 * (i + 1), 3 * i + 2)
    if (clickedCells) {
      let box1State = (state & (1 << 2)) >> 2
      let box2State = (state & (1 << 4)) >> 4
      let box3State = (state & (1 << 6)) >> 6
      let stateCells = (box1State === box2State) && (box2State === box3State)
      // console.log(stateCells, box1State, box2State, box3State, i, 3 * i, 3 * i + 1, 3 * i + 2)
      let value = stateCells ? "O" : "X"
      if (stateCells) {
        win(2, 4, 6, value)
        return;
      }
    }
  }



}

class Square extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      value: "",
      theme: props.theme,
      types: props.types,
      num: props.num
    };
  }
  onClickHandler = () => {
    if (this.state.value === "") {
      this.setState({ value: squareValue })
      this.setState({ types: squareValue })
      squareValue = (squareValue === "O") ? "X" : "O"
      if (squareValue === "O") state |= (1 << (8 - this.state.num))
      clicked |= (1 << (8 - this.state.num))
      // console.log(state.toString(2))
      // console.log("set square: ", this.state.num, this.state.value);
    }
  }

  render() {
  if(theme & (1<<this.state.num) === 1<<this.state.num){
      console.log(`square ${this.state.num} won`)
      this.setState({theme: "winning"})
    }else{
    // console.log("square " + this.state.num + " " + state.toString(2) + " " + clicked.toString(2) + " refresh")
    calculateWinners(this.state.num, this.state.value)
    }
    console.log(theme.toString(2))
    
    return (
      <div className={"square-" + this.state.theme} id={this.state.types} onClick={this.onClickHandler}>
        <p>{this.state.value}</p>
      </div>
    )
  }


}

function App() {
  return (
    <div className="App">
      <Square num={0} theme={ThemeContext}/>
      <Square num={1} theme={ThemeContext}/>
      <Square num={2} theme={ThemeContext}/>
      <Square num={3} theme={ThemeContext}/>
      <Square num={4} theme={ThemeContext}/>
      <Square num={5} theme={ThemeContext}/>
      <Square num={6} theme={ThemeContext}/>
      <Square num={7} theme={ThemeContext}/>
      <Square num={8} theme={ThemeContext}/>
    </div>
  );
}

export default App;
