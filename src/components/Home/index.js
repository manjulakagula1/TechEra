import Loader from 'react-loader-spinner'

import {Component} from 'react'
import TechItem from '../TechItem'

const viewConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {techList: [], apiStatus: viewConstants.initial}

  componentDidMount() {
    this.getTechList()
  }

  getTechList = async () => {
    this.setState({apiStatus: viewConstants.loading})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      const {courses, total} = data
      const newData = courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({techList: newData, apiStatus: viewConstants.success})
    } else {
      this.setState({apiStatus: viewConstants.failure})
    }
  }

  renderSuccess = () => {
    const {techList} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {techList.map(eachItem => (
            <TechItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
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
      <button type="button" onClick={this.getTechList}>
        Retry
      </button>
    </div>
  )

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

export default Home
