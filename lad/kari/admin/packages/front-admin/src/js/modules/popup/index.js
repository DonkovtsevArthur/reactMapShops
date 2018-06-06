import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

class Popup extends Component {
  render() {
    const { closeId, popupClass, closeClass } = this.props
    return <form className={`${styles['popup']} ${popupClass}`} onSubmit={this.handleSubmit}>
      <label className={`${styles['label-close']} ${closeClass}`} htmlFor={closeId} />
      {this.props.children}
    </form>
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit({ event })
    this.closePopup(event)
  }
  closePopup = (event) => event.target.querySelector(`[class*='label-close']`).click()
}

export default hot(module)(Popup)