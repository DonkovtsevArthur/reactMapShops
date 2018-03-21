import React from 'react'
import PropTypes from 'prop-types'

const PopUpClearQuantity = ({ close, confirm, market }) => (
	<div className="popUp__background">
		<div className="popUp__window popUp__clear">
			<button className="popUp__close" onClick={() => close()}>
				<i className="fa fa-close" />
			</button>
			<div className="popUp__clear_title">
				<h3 className="popUp__title clear__title">
					<p className="popUp__text clear__text">
						Обнулить <br />
						<strong>отрицательные</strong> товарные остатки?
					</p>
					<p className="popUp__text popUp__name">{market}</p>
				</h3>
				<p className="popUp__text popUp__warning">
					Все отрицательные товарные остатки в <br /> магазине обнулятся
				</p>
			</div>
			<div className="popUp__control popUp__control_clear">
				<button onClick={() => confirm()} className="btn popUp__btn_confirm">
					Обнулить
				</button>
				<button onClick={() => close()} className="btn popUp__btn_cancel">
					Отмена
				</button>
			</div>
		</div>
	</div>
)

PopUpClearQuantity.propTypes = {
	close: PropTypes.func.isRequired,
	confirm: PropTypes.func.isRequired,
	market: PropTypes.string.isRequired
}

export default PopUpClearQuantity
