import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamCardsData: [], stillLoading: true}

  componentDidMount() {
    this.getTeamCardsData()
  }

  getTeamCardsData = async () => {
    const API_URL = 'https://apis.ccbp.in/ipl'
    const response = await fetch(API_URL)
    const {teams} = await response.json()
    const formattedTeamCardsData = teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))

    this.setState({teamCardsData: formattedTeamCardsData, stillLoading: false})
  }

  renderLoaderAnimation = () => (
    <div testid="loader">
      <Loader
        type="Oval"
        className="loader"
        color="#00bfff"
        height={80}
        width={80}
      />
    </div>
  )

  render() {
    const {teamCardsData, stillLoading} = this.state

    return (
      <div className="home-container">
        <div className="ipl-img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl-logo"
            className="ipl-image"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <div className="team-cards-container">
          {stillLoading
            ? this.renderLoaderAnimation()
            : teamCardsData.map(card => (
                <TeamCard teamCard={card} key={card.id} />
              ))}
        </div>
      </div>
    )
  }
}

export default Home
