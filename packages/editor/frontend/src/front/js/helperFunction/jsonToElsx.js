import SimpleExcel from 'simple-excel-js'

export default (column, columnLang, objectArr) => {
	const xlsxWriter = new SimpleExcel.Writer.XLSX()
	const XlsxSheet = new SimpleExcel.Sheet()
	var Cell = SimpleExcel.Cell
	xlsxSheet.setRecord([
		[new Cell('ID', 'TEXT'), new Cell('Nama', 'TEXT'), new Cell('Kode Wilayah', 'TEXT')],
		[new Cell(1, 'NUMBER'), new Cell('Kab. Bogor', 'TEXT'), new Cell(1, 'NUMBER')],
		[new Cell(2, 'NUMBER'), new Cell('Kab. Cianjur', 'TEXT'), new Cell(1, 'NUMBER')],
		[new Cell(3, 'NUMBER'), new Cell('Kab. Sukabumi', 'TEXT'), new Cell(1, 'NUMBER')],
		[new Cell(4, 'NUMBER'), new Cell('Kab. Tasikmalaya', 'TEXT'), new Cell(2, 'NUMBER')]
	])
	xlsxWriter.insertSheet(xlsxSheet)
	xlsxWriter.saveFile()
	const table = ['<table>']
	const header = columnLang.map(item => `<td>${item}</td>`).join('')
	table.push(`<th style="color:red">${header}</th>`)
	const bodyArr = objectArr.map(element => column.map(col => `<td>${element[col]}</td>`))
	const body = bodyArr.map(row => `<tr>${row.join('')}</tr>`)
	table.push(body.join(''))
	table.push('</table>')
	return table.join('')
}
