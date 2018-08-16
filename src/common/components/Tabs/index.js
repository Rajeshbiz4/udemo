import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse, stringify } from 'query-string'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withRouter } from 'react-router-dom'

class TabView extends Component {
  constructor(props) {
    super(props)
    const query = parse(this.props.location.search)
    if (!query.currentTab) {
      const q = stringify({
        ...parse(this.props.location.search),
        currentTab: this.props.data[0].value
      })
      this.props.history.push(`?${q}`)
    }
    this.state = {
      currentTab: this.getCurrentTabIndex(parse(this.props.location.search).currentTab) || 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldTab = parse(this.props.location.search).currentTab;
    const newTab = parse(nextProps.location.search).currentTab;
    if (oldTab !== newTab) {
      this.setCurrentTab(newTab);
    }
  }

  setCurrentTab(currentTab) {
    this.setState({
      currentTab: this.getCurrentTabIndex(currentTab)
    })
  }

  getCurrentTabIndex(value) {
    return this.props.data.findIndex(tab => tab.value === value);
  }

  setStateParams(index) {
    const q = stringify({
      ...parse(this.props.location.search),
      currentTab: this.props.data[index].value
    })
    this.props.history.push(`?${q}`)
  }

  renderTabList() {
    return this.props.data.map((item, i) => (
      <Tab key={i}>{item.name}</Tab>
    ))
  }

  renderContentList() {
    return this.props.data.map((item, i) => (
      <TabPanel key={i}>
        {/* {this.props.childComponent} */}
      </TabPanel>
    ))
  }

  render() {
    return (
      <div>
        <Tabs selectedIndex={this.state.currentTab} onSelect={index => this.setStateParams(index)}>
          <TabList>
            {this.renderTabList()}
          </TabList>
          <div className='tab-container tab-ontology tab-content'>
            { this.props.childComponent }
          </div>
          { this.renderContentList()}
        </Tabs>
      </div>
    );
  }
}
TabView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  childComponent: PropTypes.object.isRequired
}

TabView.defaultProps = {
  location: PropTypes.shape({
    search: null
  }),
  history: {
    push: () => ''
  }
}

export default withRouter(TabView);
