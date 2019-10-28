import React from "react";
import "./card.css";

function Card(props) {
    return (
        <div class="cardWrapperWrapper">
            <div class="cardWrapper">
                <img alt={props.name} src={props.image}  onClick={props.onClick} data-clicked={props.clicked} data-id={props.id} class="cardImg" />
            </div>
        </div>
    );
}
export default Card;