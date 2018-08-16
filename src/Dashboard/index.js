import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { geneAction } from './logic'
import TabsComponent from '../Tabs'

import { Loader, NoDataFound } from '../common/components'

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      flag: false
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  getuserDetails() {
    if (this.state.inputValue) {
      this.props.geneAction(this.state.inputValue)
      this.setState({
        flag: true
      })
    }
  }
  render() {
    return (
      <div>
        <h1>github</h1>
        <form>
          Enter Github username:<br />
          <input type="text" name="firstname" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
          <br />
          <input type="button" value="Submit" onClick={() => this.getuserDetails()} />
        </form>
        <Loader loading={this.props.gene.loading} error={this.props.gene.error}>
          {this.props.gene.flag ? <TabsComponent data={this.state.inputValue} /> : this.state.flag ? <NoDataFound /> : null}
        </Loader>
      </div>
    )
  }
}

Summary.propTypes = {
  geneAction: PropTypes.func.isRequired,
  gene: PropTypes.object.isRequired,
}

Summary.defaultProps = {
}

const mapStateToProps = state => ({
  gene: state.gene
})

export default connect(mapStateToProps, { geneAction })(Summary)
