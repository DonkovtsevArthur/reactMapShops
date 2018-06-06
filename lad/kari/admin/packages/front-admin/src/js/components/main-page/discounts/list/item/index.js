import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePromotion, updatePromotion } from '~store/promotions/actions'
import { NavLink } from 'react-router-dom'
import { promotionFactory } from '~store/promotions/selectors'
import loadable from 'loadable-components'
import get from 'lodash/get'
import { dateToDMY } from '~utils/date'
import styles from './index.scss'

class PromotionItem extends Component {
	state = {
		isOpenUpdateForm: false
	}

	toggleUpdateForm = () => this.setState({ isOpenUpdateForm: !this.state.isOpenUpdateForm })

	render() {
		const {
			name = '',
			description = '',
			promotionTarget = '',
			priority = -1,
			isEnabled = false,
			created = '',
			dateFrom = '',
			dateTo = ''
		} = this.props.promotion
		const {
			promotionId,
			deletePromotion,
			location: { pathname }
		} = this.props
		const articleId = `promotion-item-${promotionId}`
		const handleOpen = () => this.props.handleOpenPromotion({ promotionId })
		const handleClose = () => this.props.handleOpenPromotion({ promotionId: '' })
		const handleDelete = () => deletePromotion({ promotionId })

		return (
			<article className={`${styles['promotion-item']} ${!isEnabled ? styles['disable'] : ''}`}>
				<div className={`${styles['promotion-item-content']}`}>
					{name && (
						<button className={styles['promotion-item-title']} onClick={handleOpen}>
							{name}
						</button>
					)}
					{description && <p className={styles['promotion-item-description']}>{description}</p>}
					{!!priority && <div className={styles['promotion-item-priority']}>{`Приоритет: ${priority}`}</div>}
					{promotionTarget && (
						<div className={styles['promotion-item-target']}>{`Для ${
							promotionTarget === 'offlineStore' ? 'оффлайн' : 'интернет'
						}-магазина`}</div>
					)}
					<div className={styles['promotion-item-dates']}>
						{`${dateTo ? '' : 'с'}${dateToDMY({ date: dateFrom })}${dateFrom ? ` — ` : 'по'}${dateToDMY({
							date: dateTo
						})}`}
					</div>
				</div>
				<div className={`${styles['promotion-item-menu']} ${this.props.isOpen ? styles['open'] : ''}`}>
					<button className={styles['button']} onClick={handleDelete}>
						Удалить
					</button>
					<NavLink
						to={`${pathname.substring(0, pathname.length - 1)}/${promotionId}/update/`}
						className={styles['button']}
					>
						Обновить
					</NavLink>
					<button className={styles['promotion-item-menu-close']} onClick={handleClose} />
				</div>
			</article>
		)
	}
}

const mapStateToProps = (store, props) => {
	const promotionSelector = promotionFactory()
	return (store, props) => ({
		promotion: promotionSelector(store, props),
		location: store.routing.location
	})
}
const mapDispatchToProps = dispatch => bindActionCreators({ deletePromotion, updatePromotion }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(PromotionItem))
