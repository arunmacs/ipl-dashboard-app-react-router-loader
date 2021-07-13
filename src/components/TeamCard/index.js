import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCard} = props
  const {id, name, teamImageUrl} = teamCard

  return (
    <Link to={`/team-matches/${id}`} className="card-link">
      <div className="team-card-container">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <h1 className="team-name">{name}</h1>
      </div>
    </Link>
  )
}

export default TeamCard
