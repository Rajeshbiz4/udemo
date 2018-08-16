import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { orgAction } from './logic'
import TabsComponent from '../Tabs'
import { Loader } from '../common/components'

class Organizations extends Component {
    constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.orgAction(this.props.data);
  }

  render () {
    return (
      <Loader loading={this.props.org.loading} error={this.props.org.error}>
        {this.props.org.data.map((station,index) => <div className="well" key={index}> <img src={station.avatar_url} /> <div>Name:{station.login} description: {station.description} <br />repos_url :<a href={station.repos_url} target='_blank'>{station.repos_url}</a></div></div> )} 
      </Loader>
    )
  }
}

Organizations.propTypes = {
  orgAction: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired,
}

Organizations.defaultProps = {
}

const mapStateToProps = state => ({
  org: state.org
})

export default connect(mapStateToProps, { orgAction })(Organizations)
