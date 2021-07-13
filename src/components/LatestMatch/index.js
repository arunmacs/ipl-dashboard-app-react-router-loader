import './index.css'

const LatestMatch = props => {
  const {latestMatchData} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    secondInnings,
    result,
    umpires,
    venue,
  } = latestMatchData

  return (
    <div className="latest-match-card">
      <div className="latest-match-details-container">
        <div className="match-details-container">
          <h1 className="competing-team">{competingTeam}</h1>
          <p className="date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="result">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={competingTeam}
          className="competing-team-logo"
        />
      </div>
      <div className="match-summary-container">
        <p className="summary-title">First Innings</p>
        <p className="summary-info">{firstInnings}</p>
        <p className="summary-title">Second Innings</p>
        <p className="summary-info">{secondInnings}</p>
        <p className="summary-title">Man OfThe Match</p>
        <p className="summary-info">{manOfTheMatch}</p>
        <p className="summary-title">Umpires</p>
        <p className="summary-info">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
