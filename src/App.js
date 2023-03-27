import React, { useState } from 'react';
import './App.css'

let ThemeContext = 'light'
let squareValue = "O"
// 6 7 8
// 3 4 5
// 0 1 2

function win(a, b, c, val) {
  console.log(`${a} ${b} ${c} won!!`)
  // play an animation where X/O wins
  // change board to thier color
}

function App() {
  let [values, setValues] = useState(Array(9).fill(""))
  let [themes, setThemes] = useState(Array(9).fill(ThemeContext))



  function calculateWinners() {
    // vert
    for (let i = 0; i < 3; i++) {
      // console.log(`${values[3 * i]}, ${values[3 * i + 1]}, ${values[3 * i + 2]}`)
      if (values[3 * i] != "" && values[3 * i] === values[3 * i + 1] && values[3 * i + 1] === values[3 * i + 2]) {
        win(3 * i, 3 * i + 1, 3 * i + 2, values[3 * i])

      }
    }
    // hor
    for (let i = 0; i < 3; i++)
      if (values[i] != "" && values[i] === values[3 + i] && values[3 + i] === values[6 + i])
        win(i, 3 + i, 6 + i, values[i])
    // dia

  }

  class Square extends React.Component {

    constructor(props, context) {
      super(props, context)
      this.state = {
        value: props.value,
        num: props.num,
        theme: props.theme
      };
    }
    onClickHandler = () => {
      if (this.state.value === "") {
        this.setState({ value: squareValue })
        values[this.state.num] = squareValue
        setValues(values)

        this.setState({ theme: squareValue })
        themes[this.state.num] = squareValue
        setThemes(themes)

        console.log(values)
        squareValue = (squareValue === "O") ? "X" : "O"
      } else {
        //play an animation where the box jiggles and it transitions to red and back
      }
    }

    render() {
      calculateWinners()
      return (
        <div className={"square-" + this.state.theme} onClick={this.onClickHandler}>
          <p>{this.state.value}</p>
        </div>
      )
    }
  }


  return (
    <div className="App">
      <Square num={0} value={values[0]} theme={themes[0]} />
      <Square num={1} value={values[1]} theme={themes[1]} />
      <Square num={2} value={values[2]} theme={themes[2]} />
      <Square num={3} value={values[3]} theme={themes[3]} />
      <Square num={4} value={values[4]} theme={themes[4]} />
      <Square num={5} value={values[5]} theme={themes[5]} />
      <Square num={6} value={values[6]} theme={themes[6]} />
      <Square num={7} value={values[7]} theme={themes[7]} />
      <Square num={8} value={values[8]} theme={themes[8]} />
    </div>
  );


}
export default App;
