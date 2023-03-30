import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './App.css'

let ThemeContext = 'light'
let squareValue = "O"
// 6 7 8
// 3 4 5
// 0 1 2

function App() {
  let [values, setValues] = useState(Array(9).fill(""))
  let [themes, setThemes] = useState(Array(9).fill("light"))
  let [anim, setAnim] = useState(Array(9).fill(""))
  let [won, setWon] = useState(Array(3))

  function win(a, b, c, val) {
    console.log(`${a} ${b} ${c} won!!`)
    won = [a, b, c]
    setWon(won)
    for(let i = 0; i <9;i++) {
      anim[i] = "lose"
      if(values[i] === "") values[i] = " "
    }
    anim[a] = "win"
    anim[b] = "win"
    anim[c] = "win"
    setAnim(anim)
    console.log(anim)
    return true;
    // play an animation where X/O wins
  }




  function calculateWinners() {
    // vert
    for (let i = 0; i < 3; i++)
      if (values[3 * i] !== "" && values[3 * i] === values[3 * i + 1] && values[3 * i + 1] === values[3 * i + 2])
        return win(3 * i, 3 * i + 1, 3 * i + 2, values[3 * i])

    // hor
    for (let i = 0; i < 3; i++)
      if (values[i] !== "" && values[i] === values[3 + i] && values[3 + i] === values[6 + i])
        return win(i, 3 + i, 6 + i, values[i])

    // dia
    if (values[2] !== "" && values[2] === values[4] && values[4] === values[6])
      return win(2, 4, 6, values[2])
    if (values[0] !== "" && values[0] === values[4] && values[4] === values[8])
      return win(0, 4, 8, values[0])

    return false
  }

  class Square extends React.Component {

    variants = {
      lose: { scale: 0.8, backgroundColor: '#aeafb094', color: 'rgb(0,0,0)' },
      hover: { scale: 1.1, backgroundColor: 'rgba(219, 151, 80,0.5)', color: 'rgb(32,32,32)', borderColor: 'rgb(255,255,255)' },
      win: { borderStyle: "none", color: 'aliceblue', scale: 1, border: 'solid 3px green', backgroundColor: '#43cc21' },
      light: { scale: 0.9, backgroundColor: 'rgb(255, 255, 2552)', color: 'rgb(0,0,0)' }
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        anim: props.anim,
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

        console.log(values)
        squareValue = (squareValue === "O") ? "X" : "O"


        anim[this.state.num] = "light"
        setAnim(anim)
        this.setState({ anim: "light" })
      } else {
        // play an animation where the box jiggles and it transitions to red and back
      }
    }
    render() {
      return (
        <motion.div animate={this.state.anim} onClick={this.onClickHandler} className={"square-" + this.state.theme} variants={this.variants} whileHover={(this.state.value === "") ? "hover" : ""}>
          <p>{this.state.value}</p>
        </motion.div>
      )
    }
    shouldComponentUpdate() {
      if (calculateWinners())
          console.log("won")
      return true
    }
  }


  return (
    <div className="App">
      <Square num={0} value={values[0]} theme={themes[0]} anim={anim[0]} />
      <Square num={1} value={values[1]} theme={themes[1]} anim={anim[1]} />
      <Square num={2} value={values[2]} theme={themes[2]} anim={anim[2]} />
      <Square num={3} value={values[3]} theme={themes[3]} anim={anim[3]} />
      <Square num={4} value={values[4]} theme={themes[4]} anim={anim[4]} />
      <Square num={5} value={values[5]} theme={themes[5]} anim={anim[5]} />
      <Square num={6} value={values[6]} theme={themes[6]} anim={anim[6]} />
      <Square num={7} value={values[7]} theme={themes[7]} anim={anim[7]} />
      <Square num={8} value={values[8]} theme={themes[8]} anim={anim[8]} />
    </div>
  );


}
export default App;
