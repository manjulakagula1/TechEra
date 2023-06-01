import {Component} from 'react'
import Loader from 'react-loader-spinner'

const viewConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechItemDetails extends Component {
  state = {data: {}, apiStatus: viewConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: viewConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      const newData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({data: newData, apiStatus: viewConstants.success})
    } else {
      this.setState({apiStatus: viewConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {data} = this.state
    const {id, name, description, imageUrl} = data
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case viewConstants.success:
        return this.renderSuccess()
      case viewConstants.failure:
        return this.renderFailure()
      case viewConstants.loading:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return <div>{this.renderStatus()}</div>
  }
}

export default TechItemDetails
