import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { promotionsListGetter } from '~store/promotions/selectors'
import { getPromotions } from '~store/promotions/actions'
import { NavLink } from 'react-router-dom'
import get from 'lodash/get'
import styles from './index.scss'

const PromotionItem = loadable(() => import('./item'))

class PromotionsList extends Component {
	state = { openItemId: '' }

	componentDidMount() {
		this.props.getPromotions({})
	}

	handleOpenPromotion = ({ promotionId }) => this.setState({ openItemId: promotionId })

	render() {
		const { path } = this.props.match
		return (
			<section className={styles['page']}>
				<h1>Акции</h1>
				<NavLink
					to={`${path.substring(0, path.length - 1)}/create`}
					className={`${styles['button']} ${styles['add-button']}`}
					activeClassName={styles['active']}
				>
					Добавить
				</NavLink>
				<section className={styles['promotions-list']}>
					{!!this.props.promotionsList.length &&
						this.props.promotionsList.map(promotionId => (
							<PromotionItem
								{...{
									promotionId,
									handleOpenPromotion: this.handleOpenPromotion,
									isOpen: promotionId === this.state.openItemId,
									key: promotionId
								}}
							/>
						))}
				</section>
			</section>
		)
	}
}

const mapStateToProps = (store, props) => ({ promotionsList: promotionsListGetter(store, { sortBy: 'priority' }) })
const mapDispatchToProps = dispatch => bindActionCreators({ getPromotions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(PromotionsList))
