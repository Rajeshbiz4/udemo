import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import OutsideClick from '../OutsideClick'


class SimpleDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selectedIndex: props.defaultSelected
    }
    this.onSelect = this.onSelect.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
  }

  onSelect(index) {
    this.setState({
      selectedIndex: index,
      active: false
    }, () => this.props.onSelect(index))
  }

  toggleClick() {
    this.setState(prevState => ({
      active: !prevState.active
    }))
  }

  renderDropDown() {
    return this.props.options.map((item, index) => (
      <div
        key={index}
        role='presentation'
        onClick={() => this.onSelect(index)}
        className={`simple-dropdown-option ${this.state.selectedIndex === index ? 'active' : ''}`}
      >
        {item.name || item}
      </div>
    ))
  }

  render() {
    return (
      <OutsideClick onClickOutside={() => this.setState({ active: false })}>
        <div className={`simple-dropdown ${this.state.active === true ? 'open' : ''}`}>
          <div role='presentation' onClick={this.toggleClick} className='simple-dropdown-selected'>
            <div className='simple-dropdown-title text-elips'>
              {ReactHtmlParser(this.props.title)}
            </div>
            <div className='down-arrow' />
          </div>
          <div className={`simple-dropdown-options ${this.props.DropdownClass}`}>
            {this.state.active && this.renderDropDown()}
          </div>
        </div>
      </OutsideClick>
    )
  }
}

SimpleDropDown.propTypes = {
  defaultSelected: PropTypes.number,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
  DropdownClass: PropTypes.string
}

SimpleDropDown.defaultProps = {
  defaultSelected: null,
  title: '',
  DropdownClass: ''
}

export default SimpleDropDown
