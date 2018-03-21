export function productUuidGenerate({ products }) {
	const activeProducts = getToggleProducts({ products })
	if (Object.is(activeProducts, null)) return null
	const { productArray, groupArray } = activeProducts
	const { productList } = products

	const arr1 = productArray.map(product => product.uuid)
	const arr2 = []

	groupArray.map(group => {
		const sub = productList.filter(product => product.parentUuid === group.uuid)
		recursivelyGetGroupUuid({
			products: productList,
			group: sub,
			result: arr2
		})
	})

	const resultArray = arr1.concat(arr2)

	if (!resultArray.length) return null

	return resultArray.map(uuid => `productUuid='${uuid}'`)
}

function recursivelyGetGroupUuid({ products, group, result }) {
	group.map(el => {
		if (!el.group) {
			result.push(el.uuid)
		} else {
			const sub = products.filter(product => product.parentUuid === el.uuid)
			recursivelyGetGroupUuid({ products, group: sub, result })
		}
	})
}

function getToggleProducts({ products }) {
	const { productList, activePosition, navGroup } = products
	const productArray = []
	const groupArray = []

	if (!activePosition.group && !activePosition.product) {
		if (navGroup.length) {
			const selectedGroup = productList.filter(
				product => product.parentUuid === navGroup[navGroup.length - 1]
			)
			if (!selectedGroup.length) return null
			selectedGroup.map(el => {
				if (el.group) {
					groupArray.push(el)
				} else {
					productArray.push(el)
				}
			})
			return { productArray, groupArray }
		} else return null
	}

	productList.map(el => {
		if (el.group) {
			if (el.active) groupArray.push(el)
		} else {
			if (el.active) productArray.push(el)
		}
	})

	return { productArray, groupArray }
}
