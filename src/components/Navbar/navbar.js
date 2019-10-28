import React from "react";
import "./navbar.css";

function Navbar(props) {
    return (
        <nav class="navbar navbar-dark bg-primary">
            <h1>Clicky Game!</h1>
            <h1>{props.message}</h1>
            <h1>Score: {props.score} | Top Score: {props.highScore}</h1>
        </nav>

    );
}

export default Navbar;