import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import pino from 'pino';
import * as actionsPrinter from '../actions/printerSettings'
import * as actionsTemplates from '../actions/templates'
import Printer from '../components/Printer'

// const logger = pino();

class PrinterSettings extends Component {
	componentWillMount() {
		this.props.getListPrinter()
	}

	componentWillReceiveProps(nextProps) {
		const newPrinter = nextProps.selectedPrinter
		const oldPrinter = this.props.selectedPrinter
		const firstStatus = !oldPrinter && newPrinter
		const changePrinter = oldPrinter && oldPrinter !== newPrinter

		if (firstStatus || changePrinter) {
			this.props.getPrinterStatus(newPrinter)
		}
	}

	getPrinter() {
		switch (this.props.printerStatus) {
			case 'error_no_programm':
				return (
					<td>
						<span className="label">Принтер:</span>
						<span className="printer__error">
							Не найдена программа{' '}
							<a href="http://165104.selcdn.ru/static/printlabels/zebra-browser-print-setup.exe">
								{this.props.message}
							</a>
						</span>
					</td>
				)
			case 'error':
				return (
					<td>
						<span className="label">Принтер:</span>
						<span className="printer__error">{this.props.message}</span>
					</td>
				)
			case 'warning':
				return <Printer {...this.props} />
			case 'load':
				return (
					<td>
						<i className="fa fa-cog fa-spin fa-2x fa-fw" />
					</td>
				)
			case 'success':
				return <Printer {...this.props} />
			default:
				return false
		}
	}

	render() {
		return <div className="printer__settings">{this.getPrinter()}</div>
	}
}

PrinterSettings.propTypes = {
	getListPrinter: PropTypes.func.isRequired,
	getPrinterStatus: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	printerStatus: PropTypes.string.isRequired,
	selectedPrinter: PropTypes.shape({
		uid: PropTypes.string
	}).isRequired
}

PrinterSettings = connect(
	state => ({
		...state.printerSettings,
		...state.templates
	}),
	dispatch => bindActionCreators({ ...actionsPrinter, ...actionsTemplates }, dispatch)
)(PrinterSettings)

export default PrinterSettings
