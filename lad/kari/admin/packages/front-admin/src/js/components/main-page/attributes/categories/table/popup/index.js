import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import styles from './index.scss'
import { deleteAttributeCategory, bindAttributeCategory } from '~store/attributes/actions'
import { attributesDataGetter, attributesListGetter } from '~store/attributes/selectors'

const Select = loadable(() => import('~modules/select'))

class TablePopup extends Component {
	constructor(props) {
		super(props)
		this.state = { attrs: props.data.attrs.map(({ _id }) => _id) }
		this.handleDelete = this.handleDelete.bind(this)
		this.handleBind = this.handleBind.bind(this)
	}
	handleDelete() {
		this.props.deleteAttributeCategory(this.props.data._id)
	}
	handleBind(attrs) {
		this.props.bindAttributeCategory({ attrs, uuidCategory: this.props.data._id, uuidsAtributes: this.state.attrs })
	}
	handleChangeBind = attrs => {
		this.setState({ attrs: attrs.map(({ value }) => value) })
	}
	render() {
		const attrToSelect = this.props.attributesList.map(item => ({
			value: this.props.attributesData[item]._id,
			label: this.props.attributesData[item].name
		}))
		const selectValue = this.state.attrs.map(attr => attrToSelect.find(({ value }) => value === attr))
		const selectedAttrs = this.state.attrs.map(attr => this.props.attributesData[attr])
		return (
			<div>
				<button className={styles['button']} onClick={this.handleDelete}>
					Удалить категорию
				</button>
				<Select
					className={styles['bind-select']}
					value={selectValue}
					placeholder="Атрибуты"
					options={attrToSelect}
					onChange={this.handleChangeBind}
					isMulti
				/>
				<button className={styles['button']} onClick={() => this.handleBind(selectedAttrs)}>
					Привязать
				</button>
			</div>
		)
	}
}

const mapStateToProps = ({ attributes }) => ({
	attributesData: attributesDataGetter({ attributes }),
	attributesList: attributesListGetter({ attributes })
})
const mapDispatchToProps = dispatch => bindActionCreators({ deleteAttributeCategory, bindAttributeCategory }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
