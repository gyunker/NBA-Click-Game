import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
    state = {
    friends,
    guesses: [],
    score: 0,
    highScore: 8
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return array;
}

  handleIncrement = () => {
    const newScore = this.state.score +1;
    if(newScore > this.state.highScore) {
      this.state.score = newScore;
      this.state.highScore = newScore;
    }
    this.state.score = newScore;
  };

  handleReset = () => {
    this.setState({
      friends,
      guesses: [],
      score: 0,
      });
    this.render();
  };

  removeFriend = id => {
   if (this.state.guesses.indexOf(id) === -1) {
      const guesses = this.state.guesses.concat(id);
      this.setState({ guesses });
      this.handleIncrement();
      this.shuffleArray(friends);
      this.render();
   } else {
     this.handleReset();
   };
  };
  


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>
          <div>NBA Player Match Game</div>
          <div className="score">
          Score: { this.state.score } | Top Score: { this.state.highScore }
          {/* <p>guesses: { this.state.guesses }</p> */}
          </div>
        </Title>
        
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
