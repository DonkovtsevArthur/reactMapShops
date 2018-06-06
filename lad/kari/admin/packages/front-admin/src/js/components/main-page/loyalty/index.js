import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import styles from './index.scss'

class LoyaltyPage extends Component {
	componentDidMount() {}

	render() {
		return (
			<section className={`${styles['page']} ${styles['loyalty-page']}`}>
				<h1>Программы лояльности</h1>
			</section>
		)
	}
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(LoyaltyPage))
