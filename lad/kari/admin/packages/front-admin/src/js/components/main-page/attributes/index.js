import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import {
	getAttributes,
	createAttribute,
	getAttributesCategories,
	createAttributeCategory
} from '~store/attributes/actions'
import {
	attributesDataGetter,
	attributesListGetter,
	attributesCategoriesDataGetter,
	attributesCategoriesListGetter
} from '~store/attributes/selectors'
import styles from './index.scss'

const AttrTable = loadable(() => import('./table'))
const AttrCatTable = loadable(() => import('./categories/table'))
const Form = loadable(() => import('./form'))
const CatForm = loadable(() => import('./categories/form'))

class AttributesPage extends Component {
	componentDidMount() {
		this.props.getAttributes()
		this.props.getAttributesCategories()
	}
	render() {
		const {
			attributesData,
			attributesList,
			loadingAttributes,
			createAttribute,
			attributesCategoriesData,
			attributesCategoriesList,
			loadingAttributesCategories,
			createAttributeCategory
		} = this.props
		return (
			<section className={`${styles['page']} ${styles['attributes-page']}`}>
				<h1>Атрибуты</h1>
				<label className={`${styles['button']} ${styles['attribute-button']}`} htmlFor="form-create-attribute">
					Создать атрибут
				</label>
				<input type="checkbox" id="form-create-attribute" className={styles['checkbox-switch']} />
				<Form
					{...{
						createAttribute: attr => createAttribute(attr),
						closeId: 'form-create-attribute',
						data: { data: attributesData, list: attributesList }
					}}
				/>
				{!loadingAttributes && <AttrTable data={{ data: attributesData, list: attributesList }} />}
				<label
					className={`${styles['button']} ${styles['attribute-category-button']}`}
					htmlFor="form-create-attribute-category"
				>
					Создать категорию атрибутов
				</label>
				<input type="checkbox" id="form-create-attribute-category" className={styles['checkbox-switch']} />
				<CatForm
					{...{
						createAttributeCategory: attrCat => createAttributeCategory(attrCat),
						closeId: 'form-create-attribute-category',
						data: { data: attributesCategoriesData, list: attributesCategoriesList }
					}}
				/>
				{!loadingAttributesCategories && (
					<AttrCatTable data={{ data: attributesCategoriesData, list: attributesCategoriesList }} />
				)}
			</section>
		)
	}
}

const mapStateToProps = ({ attributes }) => ({
	loadingAttributes: attributes.loadingAttributes,
	attributesData: attributesDataGetter({ attributes }),
	attributesList: attributesListGetter({ attributes }),
	loadingAttributesCategories: attributes.loadingAttributesCategories,
	attributesCategoriesData: attributesCategoriesDataGetter({ attributes }),
	attributesCategoriesList: attributesCategoriesListGetter({ attributes })
})
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getAttributes,
			createAttribute,
			getAttributesCategories,
			createAttributeCategory
		},
		dispatch
	)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(AttributesPage))
