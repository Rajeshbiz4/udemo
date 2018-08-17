import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { profileAction } from './logic'
import { Loader } from '../common/components'

class Profile extends Component {

  componentDidMount () {
    this.props.profileAction(this.props.data);
  }


  render () {
    return (
      <Loader loading={this.props.profile.loading} error={this.props.profile.error}>
      <div>
         <img alt='' src={this.props.profile.data.avatar_url} /> 
         Name :{this.props.profile.data.name} <br />
         bio:{this.props.profile.data.bio} <br />
         company: {this.props.profile.data.company} <br />
         blog:{this.props.profile.data.blog} <br />
         location:{this.props.profile.data.location} <br />
         email:{this.props.profile.data.email} <br />
         public_repos:{this.props.profile.data.public_repos} <br />
         public_gists:{this.props.profile.data.public_gists} <br />
         </div>
      </Loader>
    )
  }
}

Profile.propTypes = {
  profileAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

Profile.defaultProps = {
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { profileAction })(Profile)
