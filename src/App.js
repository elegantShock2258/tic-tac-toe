import React from 'react';
import './App.css'

let ThemeContext = 'light'
let squareValue = "O"

let squares = []
class Square extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: "",
      theme: props.theme,
      types: props.types,
      num: props.num
    };
    squares.push(this)
  }
  win = (a, b, c, val) => {
    if (val === "") return
    console.log(`setting squares ${a},${b},${c} as winning squares for |${val}|`)
    for (const e of [a, b, c]) {
      squares[e].setState({ types: "winning" })
    }
    // play an animation where X/O wins

    // change board to thier color
  }
  calculateWinners = () => {
    for (let i = 0; i < 3; i++) {
      // if (i === 1 && squareValue[0] != "") {
      //   if (squares[0].state.value === squares[4].state.value && squares[4].state.value === squares[8].state.value) {
      //     console.log(`square 1 is not empty`)
      //     this.win(0, 4, 8, squares[1].state.value)
      //   }
      // }
      for (let j = 0; j < 3; j++) {
        if (squares[3 * j + i].state.value === "") {
          console.log(`square ${3 * j + i} is empty`)
          continue;
        } if (i === 1) {
          console.log("checking horizontally")
            console.log(squares[3 * j + i].state.value + " " + squares[3 * j + i + 1].state.value + " " + squares[3 * j + i + 2].state.value)
          if (squares[3 * j + i].state.value === squares[3 * j + i + 1].state.value && squares[3 * j + i + 1].state.value === squares[3 * j + i + 2].state.value) {
            this.win(3 * j + i, 3 * j + i + 1, 3 * j + i + 2, squares[3 * j + i].state.value)
          }
        } if (j === 1) {
          console.log("checking vertically")
          console.log(squares[3 * j + i].state.value + " " + squares[3 * j + i + 3].state.value + " " + squares[3 * j + i + 6].state.value)
          if (squares[3 * j + i].state.value === squares[3 * (j + 1) + i].state.value && squares[3 * (j + 1) + i].state.value === squares[3 * (j + 2) + i].state.value) {
            this.win(3 * j + i, 3 * (j + 1) + i, 3 * (j + 2) + i, squares[3 * j + i].state.value)
          }
        }
      }
    }
  }

  onClickHandler = () => {
    console.log("set square: ", this.state.num, this.state.value);
    if (this.state.value === "") {
      this.setState({ value: squareValue })
      this.setState({ types: squareValue })
      squareValue = (squareValue === "O") ? "X" : "O"


      this.calculateWinners()
    }
  }

  render() {
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
      <Square num={0} theme={ThemeContext} />
      <Square num={1} theme={ThemeContext} />
      <Square num={2} theme={ThemeContext} />
      <Square num={3} theme={ThemeContext} />
      <Square num={4} theme={ThemeContext} />
      <Square num={5} theme={ThemeContext} />
      <Square num={6} theme={ThemeContext} />
      <Square num={7} theme={ThemeContext} />
      <Square num={8} theme={ThemeContext} />
    </div>
  );
}

export default App;
