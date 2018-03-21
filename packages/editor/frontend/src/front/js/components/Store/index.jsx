import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Store extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.markets.storeBlockShow) {
			global.document.addEventListener('click', this.props.hideStoreBlock)
		}
		if (!nextProps.markets.storeBlockShow && this.props.markets.storeBlockShow) {
			global.document.removeEventListener('click', this.props.hideStoreBlock)
		}
	}
	render() {
		return (
			<div>
				<div className="store__select_wraper">
					<button className="store__select" onClick={this.props.showStoreBlock}>
						{this.props.selectedName}
						<i
							className={classnames({
								fa: true,
								'fa-chevron-down': true,
								chevron__left: this.props.markets.storeBlockShow,
								store__chevron: true
							})}
						/>
					</button>
					{this.props.markets.storeBlockShow ? (
						<div className="store__block">
							{this.props.markets.marketList.map(market => (
								<button
									className="store__block_item"
									key={market.uuid}
									value={market.uuid}
									onClick={e => this.props.changeMarket(e.target.value)}
								>
									{market.name}
								</button>
							))}
						</div>
					) : null}
				</div>
				{/* <select
      name="storeSelect"
      id="storeSelect"
      className="print__select"
      defaultValue={selected}
      onChange={e => changeMarket(e.target.value)}
    >
      {
        markets.map(market =>
          <option
            value={market.uuid}
            key={market.uuid}
          >
            {market.name}
          </option>)
      }
    </select>
    <span className={status === 'error' && 'store__error'}>
      {status === 'error' && message}
    </span> */}
			</div>
		)
	}
}

Store.propTypes = {
	markets: PropTypes.shape({
		marketList: PropTypes.arrayOf(
			PropTypes.shape({
				uuid: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})
		).isRequired,
		message: PropTypes.string,
		selected: PropTypes.string,
		storeBlockShow: PropTypes.bool
	}).isRequired,
	changeMarket: PropTypes.func,
	selectedName: PropTypes.string.isRequired,
	showStoreBlock: PropTypes.func.isRequired,
	hideStoreBlock: PropTypes.func.isRequired
}

Store.defaultProps = {
	message: '',
	changeMarket: () => {},
	selected: ''
}

export default Store
