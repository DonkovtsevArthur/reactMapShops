import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import DayPicker, { DateUtils } from 'react-day-picker'
import styles from './index.scss'

function DayPickerWrapper() {
	return (
		<DayPicker
			className="Range"
			numberOfMonths={2}
			fromMonth={from}
			//selectedDays={selectedDays}
			//disabledDays={disabledDays}
			//modifiers={modifiers}
			// onDayClick={this.handleDayClick}
			//onDayMouseEnter={this.handleDayMouseEnter}
		/>
	)
}

export default hot(module)(DayPickerWrapper)
