export default [
	{
		name: '30x20',
		active: true,
		templates: [
			{
				active: true,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW232^LL0152^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 0,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY2,2,30^FT30,75^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = '1000') => `^FT30,135^ASN,59,45,^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT30,28^A@N,22,16,^CI28^FD${name}^FS`
					}
				]
			},
			{
				active: false,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW232^LL0152^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 1,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY2,2,30^FT30,120^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = '1000') => `^FT30,70^ASN,59,45,^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT30,28^A@N,22,16,^CI28^FD${name}^FS`
					}
				]
			}
		]
	},
	{
		name: '43x25',
		active: false,
		templates: [
			{
				active: true,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW344^LL0200^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 0,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY3,2,50^FT38,95^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = '1000') => `^FT30,175^AUN,0,0,^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT30,28^A@N,22,16,^CI28^FD${name}^FS`
					}
				]
			},
			{
				active: false,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW344^LL0200^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 1,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY3,2,50^FT38,160^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = '1000') => `^FT30,85^AUN,0,0,^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT30,28^A@N,22,16,^CI28^FD${name}^FS`
					}
				]
			}
		]
	},
	{
		name: '60x58',
		active: false,
		templates: [
			{
				active: true,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW484^LL0354^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 0,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY4,2,180^FT55,400^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = 1000) => `^FT35,175^ATN,80,80^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT35,60^A@,35,34,TT0003M_^CI28^FD${name}^FS`
					}
				]
			},
			{
				active: false,
				getMainTemplate: (body = '') =>
					`^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ^XA^MMT^PW484^LL0354^LS0${body}^PQ1,0,1,Y^XZ`,
				id: 1,
				elements: [
					{
						id: 'barCodes',
						name: 'Баркод',
						active: true,
						getTemplate: (code = '0000000000') => `^BY4,2,140^FT55,255^BE,,Y,N^FD${code}^FS`
					},
					{
						id: 'price',
						name: 'Цена',
						active: true,
						getTemplate: (price = 1000) => `^FT35,395^AUN,90,90^CI28^FD${price} p.^FS`
					},
					{
						id: 'name',
						name: 'Наименование',
						active: true,
						getTemplate: (name = 'Cok') => `^FT35,60^A@,35,34,TT0003M_^CI28^FD${name}^FS`
					}
				]
			}
		]
	}
]

export const PRODUCT_DEFAULT_VALUE = {
	uuid: '390067bf-e8d3-4fcc-8c30-fbfd77a0a70d',
	code: '999999',
	barCodes: [],
	alcoCodes: [],
	name: '',
	price: 0,
	quantity: 0,
	costPrice: 0,
	measureName: '',
	tax: 'NO_VAT',
	allowToSell: true,
	description: '',
	articleNumber: '',
	parentUuid: null,
	group: false,
	type: 'NORMAL',
	alcoholByVolume: 0,
	alcoholProductKindCode: 0,
	tareVolume: 0
}

export const PRODUCT_FIELDS = [
	'name',
	'code',
	'articleNumber',
	'price',
	'measureName',
	'quantity',
	'costPrice',
	'allowToSell',
	'barCodes',
	'parentUuid'
]

export const PRODUCT_FIELDS_LOCAL = [
	'Наименование',
	'Код',
	'Артикул',
	'Цена',
	'Ед.изм.',
	'Остаток',
	'Цена закупки',
	'Продажа разрешена',
	'Штрих-код',
	'Путь'
]

// 'alcoCodes',
// 'tax',
// 'description',
// 'group',
// 'type',
// 'alcoholByVolume',
// 'alcoholProductKindCode',
// 'tareVolume',
