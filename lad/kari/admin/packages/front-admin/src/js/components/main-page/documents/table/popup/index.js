import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function TablePopup({ data }) {
	const { deviceUuid, transactions } = data

	return (
		<div>
			<p>Device: {deviceUuid}</p>
			<br />
			{transactions.length && (
				<table className={styles['table']}>
					{/* <caption>Операции</caption> */}
					<thead className={styles['thead']}>
						<tr className={styles['tr']}>
							<th>Тип</th>
							<th>Имя продукта</th>
							<th>Цена</th>
							<th>Кол-во</th>
							<th>Ед.изм</th>
							<th>Сумма</th>
							<th>Тип оплаты</th>
							<th>odd</th>
							<th>rrn</th>
						</tr>
					</thead>
					<tbody className={styles['tbody']}>
						{transactions.map(
							(
								{ type, productName, price, quantity, measureName, sum, paymentType, odd, rrn, productUuid, ...rest },
								index
							) => {
								Object.keys(rest).length && console.log('неучтённые операции', rest)
								return (
									<tr className={styles['tr']} key={`transaction-${index}`}>
										<td>{getWrapperForType({ type })}</td>
										<td>{productName}</td>
										<td>{price}</td>
										<td>{quantity}</td>
										<td>{measureName}</td>
										<td>{sum}</td>
										<td>{paymentType}</td>
										<td>{odd}</td>
										<td>{rrn}</td>
									</tr>
								)
							}
						)}
					</tbody>
				</table>
			)}
		</div>
	)
}

const getWrapperForType = ({ type }) => {
	switch (type) {
		case 'DOCUMENT_OPEN': {
			return 'Открытие документа'
		}
		case 'DOCUMENT_CLOSE': {
			return 'Закрытие документа'
		}
		case 'DOCUMENT_PAYMENT': {
			return 'Документ оплаты'
		}
		case 'REGISTER_POSITION': {
			return 'Регистрация позиции'
		}
		case 'DISCOUNT_DOCUMENT': {
			return 'Документ скидки'
		}
		case 'DISCOUNT_POSITION': {
			return 'Скидка на позицию'
		}
		case 'POSITION_TAX': {
			return 'POSITION_TAX'
		}

		default: {
			return type
		}
	}
}

export default hot(module)(TablePopup)
