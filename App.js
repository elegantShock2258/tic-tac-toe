import { useState } from "react";



function Square({value,onClick}){
    return( 
        <div className="square" onClick={onClick}>
            {value}
        </div>
    )
}

function Board(){
    const board = (
        <>
            <Square value="" onClick={onSquareClick(0)}/>
            <Square value="" onClick={onSquareClick(1)}/>
            <Square value="" onClick={onSquareClick(2)}/>
            <Square value="" onClick={onSquareClick(3)}/>
            <Square value="" onClick={onSquareClick(4)}/>
            <Square value="" onClick={onSquareClick(5)}/>
            <Square value="" onClick={onSquareClick(6)}/>
            <Square value="" onClick={onSquareClick(7)}/>
            <Square value="" onClick={onSquareClick(8)}/>
        </>
    )
}