import React from "react";
import "./game.css";
import Card from "../Card/card";
import pokemon from "../../pokemon.json"
import Navbar from "../Navbar/navbar";
import Header from "../Header/header";

class Game extends React.Component {
    state = {
        pokemon,
        score: 0,
        highScore: 0,
        message: "Click an image to begin!",
        activeness: false
    }

    componentDidMount() {
        this.setState({
            pokemon: this.state.pokemon.map(thisPokemon => {
                thisPokemon.clicked = false;
                return thisPokemon;
            }
            )
        })
        this.setState({
            pokemon: this.randomizeArr(this.state.pokemon.map(thisPokemon => {
                return thisPokemon;
            }
            ))
        })
    }

    randomizeArr(arr) {
        var ctr = arr.length, temp, index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arr[ctr];
            arr[ctr] = arr[index];
            arr[index] = temp;
        }
        // console.log(arr);
        return arr;


    }

    targetCard = event => {
        const thisId = event.target.getAttribute("data-id");
        console.log("id of this pokemon: " + thisId);
        // console.log(pokemon)
        // console.log(this.state.pokemon.filter(thisPokemon => thisPokemon.id == thisId)[0].clicked)

        if (this.state.pokemon.filter(thisPokemon => thisPokemon.id == thisId)[0].clicked === false) {
            // debugger;
            // console.log(this.state.pokemon[thisId].clicked)
            this.handleCorrect();
            const newPokemon = this.state.pokemon.map(thisPokemon => {
                if (parseInt(thisPokemon.id) === parseInt(thisId)) {
                    console.log("it worked")
                    thisPokemon.clicked = true;
                    // console.log(thisPokemon.clicked)
                }

                return thisPokemon;
            })
            // console.log(newPokemon);
            this.setState({ pokemon: newPokemon })
            // console.log(pokemon)
        } else {
            this.handleIncorrect();
        }
    }

    handleCorrect = () => {

        this.setState({ score: this.state.score + 1 })
        this.setState({ pokemon: this.randomizeArr(this.state.pokemon) })
        this.setState({message: "Good Job!"})
        this.handleHighScore();
        console.log(this.state.score);
        console.log(this.state.highScore)
        console.log("correct");

    }

    handleHighScore() {
        if (this.state.score > this.state.highScore) {
            this.setState({ highScore: this.state.highScore + 1 })
        }
    }

    handleIncorrect() {

        this.setState({ score: 0 })
        this.setState({message: "Sorry that was the wrong guess, try again!"})
        console.log(this.state.highScore)
        const newPokemon = this.state.pokemon.map(thisPokemon => {
            thisPokemon.clicked = false;
            console.log(thisPokemon.clicked);
            return thisPokemon;
        })
        this.setState({ pokemon: newPokemon })
        this.setState({ pokemon: this.randomizeArr(this.state.pokemon) })
        this.shake();
        console.log("Incorrect");
    }

    shake = () => {
        this.setState({activeness: true});
        setTimeout(function(){
            this.setState({activeness: false});
       }.bind(this),200);
    }

    render() {
        return (
            <div>
            <Navbar
            message={this.state.message} 
            score={this.state.score}
            highScore={this.state.highScore}/>
            <Header />
            <div class="gameDiv" className={"gameDiv" + (this.state.activeness? "-active":"")}>
                {this.state.pokemon.map(pokemon => (
                    <Card
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        clicked={pokemon.clicked}
                        onClick={this.targetCard}
                    />
                ))}
            </div>
            </div>
        );
    }
}
export default Game;