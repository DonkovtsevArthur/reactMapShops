import React from 'react'
import PropTypes from 'prop-types'

const MenuButton = ({ showFuncBlock, funcBlockShow, openPopUp, exportFile }) => (
	<div className="munu__wrap">
		<button className="menu__button" onClick={funcBlockShow}>
			<i className="fa fa-bars" />
		</button>
		{showFuncBlock ? (
			<div className="menu__block">
				<button className="menu__item" onClick={openPopUp}>
					Обнуление остатков
				</button>
				<button className="menu__item" onClick={() => exportFile('csv')}>
					Экспорт в csv
				</button>
				<button className="menu__item" onClick={() => exportFile('xls')}>
					Экспорт в xls
				</button>
			</div>
		) : null}
	</div>
)

MenuButton.propTypes = {
	funcBlockShow: PropTypes.func.isRequired,
	showFuncBlock: PropTypes.bool.isRequired,
	openPopUp: PropTypes.func.isRequired,
	exportFile: PropTypes.func.isRequired
}

export default MenuButton
