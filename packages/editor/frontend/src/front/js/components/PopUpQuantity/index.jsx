import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PopUpQuantity extends Component {
	constructor() {
		super()
		this.handleChangeOffsetValue = this.handleChangeOffsetValue.bind(this)
		this.handleMinusOne = this.handleMinusOne.bind(this)
		this.handleMinusTen = this.handleMinusTen.bind(this)
		this.handlePlusOne = this.handlePlusOne.bind(this)
		this.handlePlusTen = this.handlePlusTen.bind(this)
	}
	handleChangeOffsetValue(e) {
		let value = 0
		const measureName = this.props.product.measureName
		const quantity = this.props.product.quantity
		const intValue = ['шт', 'компл', 'упак', 'ед']
		if (intValue.indexOf(measureName) >= 0) {
			value = global.parseInt(e.target.value)
		} else {
			value = global.parseFloat(global.parseFloat(e.target.value).toFixed(3))
		}
		const newValue = global.parseFloat((quantity + value).toFixed(3))
		this.props.changeValue(newValue, value)
	}
	handlePlusTen() {
		const value = global.parseFloat((this.props.value + 10).toFixed(3))
		this.props.changeValue(value, this.props.offsetValue + 10)
	}
	handleMinusTen() {
		const value = global.parseFloat((this.props.value - 10).toFixed(3))
		this.props.changeValue(value, this.props.offsetValue - 10)
	}
	handlePlusOne() {
		const value = global.parseFloat((this.props.value + 1).toFixed(3))
		this.props.changeValue(value, this.props.offsetValue + 1)
	}
	handleMinusOne() {
		const value = global.parseFloat((this.props.value - 1).toFixed(3))
		this.props.changeValue(value, this.props.offsetValue - 1)
	}
	render() {
		return (
			<div className="popUp__background">
				<div className="popUp__window">
					<button className="popUp__close" onClick={() => this.props.close()}>
						<i className="fa fa-close" />
					</button>
					<h3 className="popUp__title">
						<p className="popUp__text">Изменить остаток</p>
						<p className="popUp__text popUp__name">{this.props.product.name}</p>
					</h3>
					<div className="popUp__form">
						<input
							type="number"
							value={this.props.offsetValue}
							className="popUp__input"
							onChange={this.handleChangeOffsetValue}
						/>
						<div className="change">
							<div className="popUp__change">
								<button className="popUp__up" onClick={this.handlePlusOne}>
									<i className="fa fa-chevron-up" />
									<span className="popUp__help">+1</span>
								</button>
								<button className="popUp__down" onClick={this.handleMinusOne}>
									<i className="fa fa-chevron-down" />
									<span className="popUp__help">-1</span>
								</button>
							</div>
							<div className="popUp__change">
								<button className="popUp__up" onClick={this.handlePlusTen}>
									<i className="fa fa-chevron-up" />
									<span className="popUp__help">+10</span>
								</button>
								<button className="popUp__down" onClick={this.handleMinusTen}>
									<i className="fa fa-chevron-down" />
									<span className="popUp__help">-10</span>
								</button>
							</div>
							<button
								className="popUp__button_clear"
								onClick={() => this.props.changeValue(0, -this.props.product.quantity)}
								title="Обнулить остаток"
							>
								<i className="fa fa-refresh" />
							</button>
						</div>
					</div>
					<div className="popUp__info">
						<div className="popUp__info_left">
							<span>Текущее значение</span>
							<span>Новое значение</span>
						</div>
						<div className="popUp__info_right">
							<span className="popUp__result">{this.props.product.quantity}</span>
							<span className="popUp__result">{this.props.value || 0}</span>
						</div>
					</div>
					<div className="popUp__control">
						<button
							onClick={() => this.props.changeQuantity()}
							disabled={this.props.offsetValue === 0}
							className="btn popUp__btn popUp__success"
						>
							{(() => {
								switch (true) {
									case this.props.offsetValue === 0:
										return 'Изменить'
									case this.props.offsetValue > 0:
										return 'Добавить'
									case this.props.offsetValue < 0:
										return 'Списать'
									default:
										return 'Изменить'
								}
							})()}
						</button>
						<button onClick={() => this.props.close()} className="btn popUp__btn popUp__cancel">
							Отмена
						</button>
					</div>
				</div>
			</div>
		)
	}
}

PopUpQuantity.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		measureName: PropTypes.string.isRequired
	}).isRequired,
	value: PropTypes.number.isRequired,
	offsetValue: PropTypes.number.isRequired,
	close: PropTypes.func.isRequired,
	changeValue: PropTypes.func.isRequired,
	changeQuantity: PropTypes.func.isRequired
}

export default PopUpQuantity
