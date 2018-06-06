import React, {Fragment, Component} from 'react'
import {hot} from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import loadable from 'loadable-components'
import * as shopsActions from '~store/shops/actions'
import styles from './index.scss'
import get from 'lodash/get'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./tablePopup'))

class ShopsPage extends Component {
    render() {
        const {shops: {loadingShops}} = this.props
        if (loadingShops !== false) <div/>
        const columns = [
            {label: '№', styleName: styles['number-column'], field: ''},
            {
                label: 'Название',
                styleName: styles['name-column'],
                fieldFormat: ({name}) => name
            },
            {
                label: 'Страна',
                styleName: styles['country-column'],
                fieldFormat: ({param}) => get(param, 'country', '')
            },
            {
                label: 'Город',
                styleName: styles['city-column'],
                fieldFormat: ({param}) => get(param, 'city', '')
            },
            {
                label: 'Адрес',
                styleName: styles['address-column'],
                fieldFormat: ({param}) => {
                    let address = get(param, 'street', '');
                    [get(param, 'house'), get(param, 'office')].map(step => {
                        (typeof step !== 'undefined') && address += `, ${step}`;
                    })
                    return address
                }
            }
        ]

        return <section className={`${styles['page']} ${styles['shops-page']}`}>
            <h1>Магазины</h1>
            <button onClick={this.createShop} className={`${styles['button']} ${styles['shops-button']}`}>Создать магазин</button>
            <Table
                {...{
                    data: this.props.shops,
                    columns: columns,
                    TablePopup,
                    styleName: styles['shops-table']
                }}
            />
        </section>
    }

    componentDidMount() {
        this.props.getShops({isAdmin: true})
    }

    createShop = () => {
        const shop = {
            name: 'Секретный магазин',
            devices: [],
            users: [],
            tags: [],
            param: {
                country: 'Альбион',
                city: 'Камелот'
            }
        }
        this.props.createShop({shop})
    }
}


const mapStateToProps = ({auth, shops}) => ({auth, shops})
const mapDispatchToProps = dispatch =>
    bindActionCreators({...shopsActions}, dispatch)


export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(ShopsPage))