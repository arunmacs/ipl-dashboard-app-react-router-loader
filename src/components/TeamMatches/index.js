import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const teamBgColors = {
  RCB: '#a4261d',
  KKR: '#5755a7',
  KXP: '#d91c1f',
  CSK: '#f7db00',
  RR: '#da237b',
  MI: '#13418b',
  SH: '#f26d22',
  DC: '#4f5db0',
}

class TeamMatches extends Component {
  state = {teamMatchData: {}, stillLoading: true}

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getFormattedResponseData = data => ({
    latestMatchDetails: data.latest_match_details,
    recentMatches: data.recent_matches,
    teambannerUrl: data.team_banner_url,
  })

  getFormattedLatestRecentMatches = data => ({
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    date: data.date,
    firstInnings: data.first_innings,
    id: data.id,
    manOfTheMatch: data.man_of_the_match,
    matchStatus: data.match_status,
    result: data.result,
    secondInnings: data.second_innings,
    umpires: data.umpires,
    venue: data.venue,
  })

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_URL = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(API_URL)
    const data = await response.json()
    const updatedData = this.getFormattedResponseData(data)

    const {latestMatchDetails, recentMatches, teambannerUrl} = updatedData
    const formattedLatestMatchDetails = this.getFormattedLatestRecentMatches(
      latestMatchDetails,
    )
    const formattedRecentMatches = recentMatches.map(item =>
      this.getFormattedLatestRecentMatches(item),
    )
    const updatedStateData = {
      latestMatchDetails: formattedLatestMatchDetails,
      recentMatches: formattedRecentMatches,
      teamBannerUrl: teambannerUrl,
    }
    this.setState({teamMatchData: updatedStateData, stillLoading: false})
  }

  renderTeamMatchDetails = () => {
    const {teamMatchData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchData
    console.log(latestMatchDetails, recentMatches)

    return (
      <>
        <div className="banner-container">
          <img src={teamBannerUrl} alt={teamBannerUrl} className="banner" />
        </div>
        <p className="title-text">Latest Matches</p>
        <LatestMatch
          latestMatchData={latestMatchDetails}
          key={latestMatchDetails.id}
        />
        <div className="recent-matches-card-container">
          {recentMatches.map(match => (
            <MatchCard recentMatchData={match} key={match.id} />
          ))}
        </div>
      </>
    )
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
    const {stillLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bgColor = teamBgColors[id]

    return (
      <div
        className="team-matches-container"
        style={{backgroundColor: bgColor}}
      >
        {stillLoading
          ? this.renderLoaderAnimation()
          : this.renderTeamMatchDetails()}
      </div>
    )
  }
}

export default TeamMatches
