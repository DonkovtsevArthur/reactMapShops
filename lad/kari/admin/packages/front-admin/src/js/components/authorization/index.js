import React, {Fragment, Component} from 'react'
import loadable from 'loadable-components'
import {hot} from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from '~store/auth/actions'
import styles from './authorization.scss'

const isDev = process.env.NODE_ENV === `development`
const Input = loadable(() => import('~modules/input'))

class Authorization extends Component {
    state = { phone: '', password: ''}

    handleChange = ({ field, value }) => this.setState({ [field]: value })

    handleSubmit = (event) => {
        event.preventDefault()
        const {phone, password} = this.state
        this.props.setAuthorization({ phone, password })
    }

    render() {
        const phoneHandle = ({ value }) => this.handleChange({ field: 'phone', value })
        const passwordHandle = ({ value }) =>  this.handleChange({ field: 'password', value })


        return <form className={styles['auth-form']} onSubmit={this.handleSubmit}>
            <Input
                placeholder="+7 900 000 0000"
                // pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}"
                // settings="isPhone"
                getValue={phoneHandle}
                className={styles['auth-form-input']}
                value={isDev ? '+79999999999' :''}
                required
            />
            <Input type="password"
                   getValue={passwordHandle}
                   className={styles['auth-form-input']}
                   value={isDev ? 'qwerty' : ''}
                   required />
            <button type='submit' className={styles['auth-form-button']}>Отправить</button>
        </form>
    }
}


const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...authActions }, dispatch)


export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Authorization))