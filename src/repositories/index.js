import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { repoAction } from './logic'
import TabsComponent from '../Tabs'
import { Loader } from '../common/components'

class Repositories extends Component {
    constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.repoAction(this.props.data);
  }
 
 
  render () {
    return (
      <Loader loading={this.props.repo.loading} error={this.props.repo.error}>
      <div>
      {this.props.repo.data.map((station,index) => 
         <div className="well" key={index}>
         <img src={station.owner.avatar_url} />
          <div>Name:{station.name}, Full name: {station.full_name}<br />description : {station.description}</div>
         </div> )} 
        </div>
      </Loader>
    )
  }
}

Repositories.propTypes = {
  repoAction: PropTypes.func.isRequired,
  repo: PropTypes.object.isRequired,
}

Repositories.defaultProps = {
}

const mapStateToProps = state => ({
  repo: state.repo
})

export default connect(mapStateToProps, { repoAction })(Repositories)
