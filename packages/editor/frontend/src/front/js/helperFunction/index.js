import validator from 'validator'

export function convertInches(size) {
	const mmInInches = 25.4
	const width = size.split('x')[0]
	const height = size.split('x')[1]
	return `${width / mmInInches}x${height / mmInInches}`
}

export function getMaxCode(products) {
	const sortProducts = products.sort((a, b) => b.code - a.code)
	if (sortProducts.length > 0) {
		for (let i = 0; i < sortProducts.length; i += 1) {
			if (Number(sortProducts[i].code)) return Number(sortProducts[i].code)
		}
		return 0
	}
	return 0
}

export function getTitle(products, stores, navigation, uuidStore) {
	if (navigation.length > 0) {
		return products.filter(item => item.uuid === navigation[navigation.length - 1])[0].name
	}
	return stores.filter(item => item.uuid === uuidStore)[0].name
}

function getName(parentUuid, productList) {
	const product = productList.filter(parent => parent.uuid === parentUuid)[0]
	if (product.parentUuid) {
		getName(product.parentUuid, productList)
	}
	return product.name
}

export function getNameString(parentUuid, productList, marketList, market) {
	const storeName = marketList.filter(store => store.uuid === market)[0].name
	const path = [storeName]
	if (parentUuid) {
		path.push(getName(parentUuid, productList))
	}
	return path.join(' / ')
}

export const validate = values => {
	const errors = {}
	if (!values.code) {
		errors.code = 'Обязательное поле'
	} else if (values.code && values.code.length > 10) {
		errors.code = 'Максимум 10 символов'
	}
	if (!values.name) {
		errors.name = 'Обязательное поле'
	} else if (values.name.length > 100) {
		errors.name = 'Максимум 100 символов'
	}
	if (!values.price && values.price !== 0) {
		errors.price = 'Обязательное поле'
	} else if (
		!validator.isFloat(String(values.price), { min: 0.0, max: 9999999999.99 }) &&
		!validator.isInt(String(values.price), { min: 0, max: 100000000000 })
	) {
		errors.price = 'Неверное значение'
	}
	if (!values.quantity) {
		errors.quantity = 'Обязательное поле'
	} else if (
		!validator.isFloat(String(values.quantity), { min: 0.001, max: 999.999 }) &&
		!validator.isInt(String(values.quantity), { min: 0, max: 1000 })
	) {
		errors.quantity = 'Неверное значение'
	}
	if (!values.costPrice && values.costPrice !== 0) {
		errors.costPrice = 'Обязательное поле'
	} else if (
		!validator.isFloat(String(values.costPrice), { min: 0.0, max: 9999999999.99 }) &&
		!validator.isInt(String(values.costPrice), { min: 0, max: 100000000000 })
	) {
		errors.costPrice = 'Неверное значение'
	}
	if (values.articleNumber && values.articleNumber.length > 20) {
		errors.articleNumber = 'Больше максимального значения'
	}
	if (!values.alcoholByVolume) {
		errors.alcoholByVolume = 'Обязательное поле'
	} else if (
		!validator.isFloat(String(values.alcoholByVolume), { min: 0.001, max: 99.999 }) &&
		!validator.isInt(String(values.alcoholByVolume), { min: 0, max: 100 })
	) {
		errors.alcoholByVolume = 'Неверное значение'
	}
	if (!values.tareVolume) {
		errors.tareVolume = 'Обязательное поле'
	} else if (
		!validator.isFloat(String(values.tareVolume), { min: 0.001, max: 99.999 }) &&
		!validator.isInt(String(values.tareVolume), { min: 0, max: 100 })
	) {
		errors.tareVolume = 'Неверное значение'
	}
	if (!values.alcoholProductKindCode) {
		errors.alcoholProductKindCode = 'Обязательное поле'
	} else if (!validator.isInt(String(values.alcoholProductKindCode), { min: 0, max: 999 })) {
		errors.alcoholProductKindCode = 'Неверное значение'
	}
	return errors
}

export const currency = (value, prev) => {
	const replacedValue = value.replace(/[^\d.,]/g, '').replace(',', '.')
	if (replacedValue.length > prev.length) {
		if (prev.length > 3 && prev[prev.length - 3] === '.') {
			const dotValue = replacedValue.indexOf('.')
			const dotPrev = prev.indexOf('.')
			if (dotPrev === dotValue) {
				return prev
			}
			return replacedValue
		}
		return replacedValue
	}
	return replacedValue
}

export const addCop = value => {
	const dotValue = value.indexOf('.')
	switch (dotValue) {
		case -1:
			return `${value}.00`
		default:
			if (value.length - 1 === dotValue) {
				return `${value}00`
			}
			if (value.substring(dotValue + 1).length === 1) return `${value}0`
			return value
	}
}
