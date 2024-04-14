// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const url = 'https://apis.ccbp.in/ipl'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    const formattedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({isLoading: false, teamsData: formattedData})
  }

  renderOfLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderOfTeamCards = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          this.renderOfLoader()
        ) : (
          <div className="home-route-container">
            <div className="teams-list-container">
              <div className="ipl-dashboard-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
                  alt="ipl logo"
                  className="ipl-logo"
                />
                <h1 className="ipl-dashboard-heading">IPL DashBoard</h1>
              </div>
              {this.renderOfTeamCards()}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Home
