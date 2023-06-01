import {Link} from 'react-router-dom'

const TechItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <Link to={`/courses/${id}`}>
      <li>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default TechItem
