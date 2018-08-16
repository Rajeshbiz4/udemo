import React, { Component } from 'react'
import { connect } from 'react-redux'
import Organizations from '../organizations'
import Repositories from '../repositories'
import Profile from '../profile'

class TabsComponent extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      inputValue: ''
    };
    this.openCity = this.openCity.bind(this)
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  getuserDetails() {
     this.setState({
       flag : true
     })
    this.props.geneAction(this.state.inputValue)
  }

  openCity(b){
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(b).style.display = "block";
  }
  render() {
    return (
      <div>
        <div class="tab">
          <button className="repositories tablinks" onClick={() => this.openCity('repositories')}>repositories</button>
          <button className="organisations tablinks" onClick={() => this.openCity('organisations')}>organisations</button>
          <button className="Profile tablinks" onClick={() => this.openCity('Profile')} >Profile</button>
        </div>

        <div id="repositories" className="tabcontent">
          <h3>Repositories</h3>
          <Repositories data={this.props.data}/>
        </div>

        <div id="organisations" className="tabcontent">
          <h3>Organisations</h3>
          <Organizations data={this.props.data}/>
        </div>

        <div id="Profile" className="tabcontent">
          <h3>Profile</h3>
          <Profile data={this.props.data} />
        </div>
      </div>
    )
  }
}

TabsComponent.propTypes = {
}

TabsComponent.defaultProps = {
}

export default connect()(TabsComponent)
