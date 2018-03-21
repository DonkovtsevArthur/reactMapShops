import React from 'react'
import { Link } from 'react-router-dom'

// components
import ChangeTableColumn from '../../ChangeTableColumn'

const columns = ({
	setNavGroup,
	upNavGroup,
	controlVisible,
	controlInvisible,
	toggleColumn,
	toggleVisible,
	columns,
	visible,
	toggleProduct,
	openPopUp
}) => [
	{
		id: 'check',
		header: '',
		width: 35,
		className: 'cell__check',
		render: ({ row }) => {
			if (row.id !== 'up') {
				return (
					<div className="control__checkbox_group control__checkbox_table">
						<input
							type="checkbox"
							checked={row.active}
							key={row.uuid}
							id={row.uuid}
							className="control__checkbox"
							onClick={() => toggleProduct(row)}
						/>
						<label htmlFor={row.uuid} className="control__label" />
					</div>
				)
			}
			return ''
		},
		sortable: false
	},
	{
		id: 'icon',
		className: 'cell__icon_folder',
		header: '',
		width: 35,
		render: ({ row }) => {
			if (row.id === 'up') {
				return (
					<a
						href=""
						onClick={e => {
							e.preventDefault()
							upNavGroup(row.uuid)
						}}
					>
						<img src="../img/back.svg" alt="Назад" />
					</a>
				)
			}
			return row.group ? (
				<a
					href=""
					className="group__link"
					onClick={e => {
						e.preventDefault()
						setNavGroup(row.uuid)
					}}
				>
					<img src="../img/folder.svg" alt="Папка" />
				</a>
			) : null
		}
	},
	{
		accessor: 'name',
		id: 'name',
		minWidth: 200,
		headerClassName: 'sort__icon',
		render: ({ row }) => {
			if (row.id === 'up') {
				return (
					<a
						href=""
						className="group__link_up"
						onClick={e => {
							e.preventDefault()
							upNavGroup(row.uuid)
						}}
					>
						{row.name}
					</a>
				)
			}
			return row.group ? (
				<a
					href=""
					className="group__link"
					onClick={e => {
						e.preventDefault()
						setNavGroup(row.uuid)
					}}
				>
					{row.name}
				</a>
			) : (
				<span>{row.name}</span>
			)
		}
	},
	{
		id: 'code',
		accessor: 'code',
		minWidth: 50
	},
	{
		id: 'article',
		accessor: 'articleNumber',
		minWidth: 100
	},
	{
		id: 'price',
		accessor: 'price',
		minWidth: 100,
		render: ({ row }) => (row.group ? '' : row.price)
	},
	{
		id: 'measure',
		accessor: 'measureName',
		minWidth: 80
	},
	{
		id: 'quantity',
		accessor: 'quantity',
		minWidth: 50,
		render: ({ row }) =>
			row.group ? (
				''
			) : (
				<span>
					<span>{row.quantity}</span>
					<button onClick={() => openPopUp(row.uuid)} className="popUpButton column__edit">
						<i className="fa fa-pencil pencil__quantity" title="Изменить остаток" />
					</button>
				</span>
			)
	},
	{
		id: 'costPrice',
		accessor: 'costPrice',
		minWidth: 100,
		render: ({ row }) => (row.group ? '' : row.costPrice)
	},
	{
		id: 'allowToSell',
		minWidth: 50,
		accessor: 'allowToSell',
		render: ({ row }) => {
			if (row.group) return ''
			return row.allowToSell ? 'Да' : 'Нет'
		}
	},
	{
		id: 'barCodes',
		minWidth: 50,
		accessor: 'barCodes',
		render: ({ row }) => {
			if (row && row.barCodes && !row.group) {
				switch (row.barCodes.length) {
					case 0:
						return 'Нет'
					case 1:
						return 'Есть'
					default:
						return `Есть (${row.barCodes.length})`
				}
			}
			return ''
		}
	},
	{
		id: 'controlHead',
		minWidth: 25,
		header: (
			<ChangeTableColumn
				controlVisible={controlVisible}
				controlInvisible={controlInvisible}
				toggleVisible={toggleVisible}
				toggleColumn={toggleColumn}
				columns={columns}
				visible={visible}
			/>
		),
		className: 'column__edit_cell',
		render: ({ row }) => {
			if (row.id !== 'up') {
				if (row.group) {
					return (
						<Link to={`/addGroup/${row.uuid}`} className="column__edit">
							<i className="fa fa-pencil pencil__edit" title="Редактировать" />
						</Link>
					)
				}
				return (
					<div>
						<Link to={`/addPosition/${row.uuid}`} className="column__edit">
							<i className="fa fa-pencil pencil__edit" title="Редактировать" />
						</Link>
					</div>
				)
			}
			return ''
		},
		sortable: false
	}
]

export default columns
