import React from 'react'
import PropTypes from 'prop-types'

const Printer = ({ message, changePrinter, printers, selectedPrinter, printerStatus }) => (
	<div className="printer__select">
		<span className="label">Принтер:</span>
		<select
			defaultValue={selectedPrinter.uid}
			onChange={e => changePrinter(e.target.value)}
			className="settings__select_printer"
		>
			{printers.map(printer => (
				<option value={printer.uid} key={printer.uid}>
					{`${printer.name} | ${printer.connection}`}
				</option>
			))}
		</select>
		<span className={printerStatus === 'warning' ? 'printer__warning' : 'printer__success'}>
			{message}
		</span>
	</div>
)

Printer.propTypes = {
	printers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired
		})
	).isRequired,
	message: PropTypes.string.isRequired,
	changePrinter: PropTypes.func.isRequired,
	selectedPrinter: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired,
	printerStatus: PropTypes.string.isRequired
}

export default Printer
