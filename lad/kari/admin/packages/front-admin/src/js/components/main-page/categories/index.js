import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { getCategories, createCategory } from '~store/categories/actions'
import { categoriesDataGetter, categoriesListGetter } from '~store/categories/selectors'
import styles from './index.scss'

const CategoriesTable = loadable(() => import('./table'))
const FormCreateCategory = loadable(() => import('./formCreateCategory'))

class CategoriesPage extends Component {
	componentDidMount() {
		this.props.getCategories()
	}
	render() {
		const { categoriesData, categoriesList, loadingCategories, createCategory } = this.props
		return (
			<section className={`${styles['page']} ${styles['categories-page']}`}>
				<h1>Категории</h1>
				<label className={`${styles['button']} ${styles['category-button']}`} htmlFor="form-create-category">
					Создать категорию
				</label>
				<input type="checkbox" id="form-create-category" className={styles['checkbox-switch']} />
				<FormCreateCategory
					{...{
						createCategory: category => createCategory(category),
						closeId: 'form-create-category',
						data: { data: categoriesData, list: categoriesList }
					}}
				/>
				{!loadingCategories && <CategoriesTable data={{ data: categoriesData, list: categoriesList }} />}
			</section>
		)
	}
}

const mapStateToProps = ({ categories }) => ({
	loadingCategories: categories.loadingCategories,
	categoriesData: categoriesDataGetter({ categories }),
	categoriesList: categoriesListGetter({ categories })
})
const mapDispatchToProps = dispatch => bindActionCreators({ getCategories, createCategory }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(CategoriesPage))
