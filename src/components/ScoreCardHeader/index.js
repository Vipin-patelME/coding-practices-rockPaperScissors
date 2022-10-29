import {Component} from 'react'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const Header = props => {
  const {yourScore} = props
  return (
    <div className="header-card">
      <div className="game-item-cont">
        <h1>
          <span>Rock</span> <br /> <span>Paper</span> <br />
          <span>Scissors</span>
        </h1>
      </div>
      <div className="score-cont">
        <p>Score</p>
        <h1>{yourScore}</h1>
      </div>
    </div>
  )
}

const GameBtnCont = props => {
  const {choice, turnMove} = props
  const {id, imageUrl} = choice

  const onCheckId = () => {
    turnMove(id)
  }

  return (
    <li>
      <button onClick={onCheckId} className="btn-image" type="button">
        <img className="btn-image-style" src={imageUrl} alt={id} />
      </button>
    </li>
  )
}

class ScoreCardHeader extends Component {
  state = {
    gameStatus: '',
    choiceItems: choicesList,
    isPlayed: false,
    yourScore: 0,
    yourMove: [],
    opponentChoiceImage: [],
  }

  onPlayGame = id => {
    const {choiceItems} = this.state
    const yourChoice = choiceItems.find(perChoice => perChoice.id === id)

    this.setState({yourMove: yourChoice}, this.onYourMove)
  }

  onYourMove = () => {
    const randomNo = Math.ceil(Math.random() * 0.1)
    // console.log(randomNo)
    const newList = this.getShuffledchoiceList()
    const opponentChoice = newList[randomNo]
    // console.log(opponentChoice)
    const {yourMove} = this.state
    const yourFinalMove = yourMove.id
    const opponentFinalMove = opponentChoice.id

    if (yourFinalMove === opponentFinalMove) {
      this.setState(prevState => ({
        yourScore: prevState.yourScore,
        isPlayed: true,
        gameStatus: 'IT IS DRAW',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'ROCK' && opponentFinalMove === 'PAPER') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore - 1,
        isPlayed: true,
        gameStatus: 'YOU LOSE',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'PAPER' && opponentFinalMove === 'ROCK') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore + 1,
        isPlayed: true,
        gameStatus: 'YOU WIN',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'ROCK' && opponentFinalMove === 'SCISSORS') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore + 1,
        isPlayed: true,
        gameStatus: 'YOU WIN',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'SCISSORS' && opponentFinalMove === 'ROCK') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore - 1,
        isPlayed: true,
        gameStatus: 'YOU LOSE',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'PAPER' && opponentFinalMove === 'SCISSORS') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore - 1,
        isPlayed: true,
        gameStatus: 'YOU LOSE',
        opponentChoiceImage: opponentChoice,
      }))
    } else if (yourFinalMove === 'SCISSORS' && opponentFinalMove === 'PAPER') {
      this.setState(prevState => ({
        yourScore: prevState.yourScore + 1,
        isPlayed: true,
        gameStatus: 'YOU WIN',
        opponentChoiceImage: opponentChoice,
      }))
    }
  }

  onPlayAgain = () => {
    this.setState({isPlayed: false})
  }

  renderResultCard = () => {
    const {yourMove, opponentChoiceImage, gameStatus} = this.state
    const yourImgUrl = yourMove.imageUrl

    const opponentImgUrl = opponentChoiceImage.imageUrl
    return (
      <div className="main-result-cont">
        <div className="choice-image-cont">
          <div className="result-img-card">
            <p>YOU</p>
            <img className="choosed-img" src={yourImgUrl} alt={yourMove.id} />
          </div>
          <div className="result-img-card">
            <p>OPPONENT</p>
            <img
              className="choosed-img"
              src={opponentImgUrl}
              alt={opponentChoiceImage.id}
            />
          </div>
        </div>
        <div className="play-again-btn-cont">
          <p className="status-para">{gameStatus}</p>
          <button
            onClick={this.onPlayAgain}
            className="play-again-btn"
            type="button"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  getShuffledchoiceList = () => choicesList.sort(() => Math.random() - 0.5)

  render() {
    const {yourScore, gameStatus, isPlayed} = this.state
    console.log(gameStatus)
    return (
      <>
        <div className="main-cont">
          <Header yourScore={yourScore} />
          {isPlayed ? (
            this.renderResultCard()
          ) : (
            <>
              <ul className="rock-scissors-cont">
                {choicesList.map(choice => (
                  <GameBtnCont
                    choice={choice}
                    key={choice.id}
                    turnMove={this.onPlayGame}
                  />
                ))}
              </ul>
              <div className="rules-btn-cont">
                <button className="rules-btn" type="button">
                  RULES
                </button>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default ScoreCardHeader
