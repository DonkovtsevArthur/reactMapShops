import React from 'react'
import { PropTypes } from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import { getMaxCode, validate } from '../../helperFunction'
import RenderInput from '../RenderInput'

let Form = ({ handleClickAndMore, handleClickAndClose, valid }) => (
	<form>
		<div className="form__row">
			<div className="form__column form__group_name">
				<div className="form__block">
					<label className="form__label" htmlFor="name">
						Наименование
						<span className="form__requaired"> * </span>
					</label>
					<Field name="name" type="text" component={RenderInput} placeholder="" />
				</div>
			</div>
		</div>

		<div className="form__row">
			<div className="form__column form__group_column">
				<div className="form__block">
					<label className="form__label" htmlFor="code">
						Код
					</label>
					<Field name="code" type="text" component="input" />
				</div>
			</div>
			<div className="form__column form__group_column">
				<div className="form__block">
					<label className="form__label" htmlFor="articleNumber">
						Артикул
					</label>
					<Field name="articleNumber" type="text" component="input" />
				</div>
			</div>
		</div>

		<div className="form__row form__control">
			<div className="form__control_left">
				<div className="form__info">
					Поля помеченные
					<span className="form__requaired"> * </span>
					обязательны для заполнения
				</div>
			</div>
			<div className="form__control_right">
				<Link to="/settings" className="btn btn__cancel form__cancel">
					Отмена
				</Link>
				<Link to="" className="btn btn__control" onClick={handleClickAndMore} disabled={!valid}>
					Сохранить и Добавить еще
				</Link>
				<Link
					to="/settings"
					className="btn btn__control"
					onClick={handleClickAndClose}
					disabled={!valid}
				>
					Сохранить и закрыть
				</Link>
			</div>
		</div>
	</form>
)

Form.propTypes = {
	handleClickAndMore: PropTypes.func.isRequired,
	handleClickAndClose: PropTypes.func.isRequired,
	valid: PropTypes.bool.isRequired
}

Form = reduxForm({
	form: 'addGroup',
	validate
})(Form)

Form = connect(state => ({
	initialValues: {
		...state.formActions.defaultValue,
		measureName: '',
		group: true,
		uuid: state.formActions.defaultValue.uuid || uuid.v4(),
		code:
			state.formActions.defaultValue.code ||
			getMaxCode(state.products.productList) + state.formActions.count + 1,
		parentUuid: state.products.navGroup.length
			? state.products.navGroup[state.products.navGroup.length - 1]
			: null
	}
}))(Form)

export default Form
