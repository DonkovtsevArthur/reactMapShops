import React from 'react'
import { PropTypes } from 'prop-types'
import { FieldArray, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import SliderInput from '../SliderInput'
import AddBarcode from '../AddBarcode'
import AddBarcodeAlco from '../AddBarcodeAlco'
import { getMaxCode, validate, currency, addCop } from '../../helperFunction'
import RenderInput from '../RenderInput'
import * as formActions from '../../actions/formActions'

let Form = ({ handleClickAndMore, handleClickAndClose, alcoholSelect, valid, changeFormValue }) => (
	<form>
		<div className="form__row">
			<div className="form__column form__column_name">
				<div className="form__block form__block_name">
					<label className="form__label" htmlFor="name">
						Наименование
						<span className="form__requaired"> * </span>
					</label>
					<Field name="name" type="text" component={RenderInput} placeholder="" />
				</div>
				<div className="form__block form__block_measure">
					<Field name="measureName" type="text" component="select">
						<option value="шт">шт</option>
						<option value="кг">кг</option>
						<option value="л">л</option>
						<option value="м">м</option>
						<option value="км">км</option>
						<option value="м2">м2</option>
						<option value="м3">м3</option>
						<option value="компл">компл</option>
						<option value="упак">упак</option>
						<option value="ед">ед</option>
						<option value="дроб">дроб</option>
					</Field>
				</div>
			</div>
			<div className="form__column form__column_allow">
				<div className="switcher__block">
					<label htmlFor="allowToSell" className="switch">
						<Field name="allowToSell" component={SliderInput} />
					</label>
					<span className="form__label_slider">Разрешить продажу</span>
				</div>
			</div>
		</div>

		<div className="form__row">
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="code">
						Код
					</label>
					<Field name="code" type="text" component={RenderInput} placeholder="" />
				</div>
			</div>
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="articleNumber">
						Артикул
					</label>
					<Field name="articleNumber" type="text" component={RenderInput} placeholder="" />
				</div>
			</div>
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="type">
						Вид продукта
					</label>
					<Field name="type" type="text" component="select">
						<option value="NORMAL">Обычный</option>
						<option value="ALCOHOL_MARKED">Маркированный алкоголь</option>
						<option value="ALCOHOL_NOT_MARKED">Не маркированный алкоголь</option>
						<option value="SERVICE">Услуга</option>
					</Field>
				</div>
			</div>
		</div>

		<div className="form__row">
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="price">
						Цена продажи
					</label>
					<Field
						name="price"
						type="text"
						component="input"
						placeholder=""
						normalize={(value, previousValue) => currency(value, previousValue)}
						onBlur={(e, value) => {
							e.preventDefault()
							changeFormValue(e.target.name, addCop(value))
						}}
					/>
				</div>
			</div>
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="costPrice">
						Цена закупки
					</label>
					<Field
						name="costPrice"
						type="text"
						component={RenderInput}
						placeholder=""
						normalize={(value, previousValue) => currency(value, previousValue)}
						onBlur={(e, value) => {
							e.preventDefault()
							changeFormValue(e.target.name, addCop(value))
						}}
					/>
				</div>
			</div>
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="tax">
						Ставка НДС
					</label>
					<Field name="tax" type="text" component="select">
						<option value="NO_VAT">Без НДС</option>
						<option value="VAT_10">НДС 10%</option>
						<option value="VAT_18">НДС 18%</option>
						<option value="VAT_0">НДС 0%</option>
						<option value="VAT_18_118">НДС 18/118</option>
						<option value="VAT_10_110">НДС 10/110</option>
					</Field>
				</div>
			</div>
		</div>
		{alcoholSelect !== 'NORMAL' && alcoholSelect !== 'SERVICE' ? (
			<div className="form__row">
				<div className="form__column">
					<div className="form__block">
						<label className="form__label" htmlFor="alcoholProductKindCode">
							Код вида продукции
						</label>
						<Field
							name="alcoholProductKindCode"
							type="number"
							component={RenderInput}
							placeholder={'999'}
						/>
					</div>
				</div>
				<div className="form__column">
					<div className="form__block">
						<label className="form__label" htmlFor="alcoholByVolume">
							Крепость (градусы)
						</label>
						<Field name="alcoholByVolume" type="number" component={RenderInput} />
					</div>
				</div>
				<div className="form__column">
					<div className="form__block">
						<label className="form__label" htmlFor="tareVolume">
							Емкость тары (литры)
						</label>
						<Field name="tareVolume" type="number" component={RenderInput} />
					</div>
				</div>
			</div>
		) : null}

		<div className="form__row form__row_barcode">
			<div className="form__column">
				<div className="form__block">
					<label className="form__label" htmlFor="barCodes">
						Штрихкоды
					</label>
					<FieldArray name="barCodes" type="text" component={AddBarcode} />
				</div>
			</div>
			<div className="form__column">
				<div className="form__block">
					{alcoholSelect !== 'NORMAL' && alcoholSelect !== 'SERVICE' ? (
						<div className="form__column_1_2">
							<label className="form__label" htmlFor="alcoCodes">
								Алкокоды ЕГАИС
							</label>
							<FieldArray name="alcoCodes" type="text" component={AddBarcodeAlco} />
						</div>
					) : (
						<div className="form__column_1_2" />
					)}
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
				<Link
					to="/addPosition"
					className="btn btn__control"
					onClick={handleClickAndMore}
					disabled={!valid}
				>
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
	alcoholSelect: PropTypes.string.isRequired,
	changeFormValue: PropTypes.func.isRequired,
	valid: PropTypes.bool.isRequired
}

Form = reduxForm({
	form: 'addPosition',
	validate
})(Form)

Form = connect(
	state => ({
		initialValues: {
			...state.formActions.defaultValue,
			uuid: state.formActions.defaultValue.uuid || uuid.v4(),
			code:
				state.formActions.defaultValue.code ||
				getMaxCode(state.products.productList) + state.formActions.count + 1,
			parentUuid: state.products.navGroup.length
				? state.products.navGroup[state.products.navGroup.length - 1]
				: null
		}
	}),
	dispatch => bindActionCreators(formActions, dispatch)
)(Form)

export default Form
