import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./style.css";

let score = 0;
let highscore = 0;
let clickMessage ="Lets Test Your Memory!!! Click on the image to gain points! Click on the same one twice and you loose!";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score,
    highscore,
    clickMessage
  };

  setClicked = id => {
    const cards = this.state.cards;

    const clikedCard = cards.filter(card => card.id === id);

    if(clikedCard[0].clicked){
      score = 0;
      clickMessage =" OOPS! Same image clicked Twice. Game Over!!!"
      
      for (let i = 0; i < cards.length; i++){
        cards[i].clicked = false;
      }
      this.setState( {clickMessage});
      this.setState( {score});
      this.setState( {cards});

    } else if(score < 11){
      clikedCard[0].clicked = true;

      score++;

      clickMessage = "Good Job! You haven't click on that one yet! Keep Going!";

      if (score > highscore){
        highscore = score;
        this.setState( { highscore});
      }
     cards.sort(function(a,b){return 0.5 - Math.random()});
     this.setState({ cards});
     this.setState({ score});
     this.setState({clickMessage});

    } else {
      clikedCard[0].clicked = true;

      score = 0;
      clickMessage = "WOW!!! You got All of them!!! Now, let's see if you can do it again!";
      highscore = 12;
      this.setState({ highscore});

      for(let i = 0; i < cards.length; i++){
        cards[i].clicked = false;
      }
      cards.sort(function(a,b){return 0.5 - Math.random()});
      this.setState({cards});
      this.setState({score});
      this.setState({clickMessage});
    }
  };

  
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
                <Title>Formula1 Racer Clicky Game</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="card-header">
                    Score: {this.state.score} 
                    <br />
                    <br />
                    HighScore: {this.state.highscore} 
                    
                </h3>
                <div id="card-container">
                {this.state.cards.map(card => (
                    <Card
                        setClicked={this.setClicked}
                        id={card.id}
                        key={card.id}
                        image={card.image}
                    />
                ))}
                </div>
                

            </Wrapper>
     
      
    );
  }
}

export default App;