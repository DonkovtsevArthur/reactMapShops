export const removeElement = ({ arr, obj, value, keys }) => {
	switch (true) {
		case typeof arr !== 'undefined': {
			return arr.filter(el => el !== value)
		}
		case typeof obj !== 'undefined': {
			let newObj = { ...obj }
			;[keys].forEach(key => delete newObj[key])
			return newObj
		}
	}
}

export const immutableSort = (arr, callback) => [...arr].sort(callback)

function insertToArray({ array, index, value }) {}
