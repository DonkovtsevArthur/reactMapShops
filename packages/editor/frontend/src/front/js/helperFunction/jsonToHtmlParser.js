export default (column, columnLang, objectArr) => {
	const table = ['<table>']
	const header = columnLang.map(item => `<td>${item}</td>`).join('')
	table.push(`<th style="color:red">${header}</th>`)
	const bodyArr = objectArr.map(element => column.map(col => `<td>${element[col]}</td>`))
	const body = bodyArr.map(row => `<tr>${row.join('')}</tr>`)
	table.push(body.join(''))
	table.push('</table>')
	return table.join('')
}
