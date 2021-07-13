import './index.css'

const MatchCard = props => {
  const {recentMatchData} = props
  const {
    competingTeam,
    competingTeamLogo,
    matchStatus,
    result,
  } = recentMatchData

  let matchStatusColor
  if (matchStatus === 'Lost') {
    matchStatusColor = 'match-status-lost'
  } else {
    matchStatusColor = 'match-status-win'
  }

  return (
    <div className="recent-match-card">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="competing-team-logo"
      />
      <h1 className="competing-team">{competingTeam}</h1>
      <p className="result">{result}</p>
      <p className={matchStatusColor}>{matchStatus}</p>
    </div>
  )
}

export default MatchCard
