import React, {Fragment, Component} from 'react'
import {hot} from 'react-hot-loader'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import styles from './index.scss'

const Input = loadable(() => import('~modules/input'))
const isDev = process.env.NODE_ENV === `development`

class UserCreateForm extends Component {
    state = { phone: '', password: '', email: '', surname: '', name: '', subscription: false}

    handleChange = ({ field, value }) => this.setState({ [field]: value })

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createUser({user: this.state})
        event.target.querySelector("[class*='form-create-user-close']").click()
    }


    render() {
        const {props: {closeId}, handleSubmit, handleClose} = this
        const phoneHandle = ({value}) => this.handleChange({field: 'phone', value})
        const passwordHandle = ({value}) => this.handleChange({field: 'password', value})
        const emailHandle = ({value}) => this.handleChange({field: 'email', value})
        const surnameHandle = ({value}) => this.handleChange({field: 'surname', value})
        const nameHandle = ({value}) => this.handleChange({field: 'name', value})
        console.log( this.props);
        return <form className={styles['form-create-user']} onSubmit={handleSubmit}>
            <label className={styles['form-create-user-close']} htmlFor={closeId} />
            <Input
                placeholder="+7 900 000 0000"
                getValue={phoneHandle}
                className={styles['form-create-user-input']}
                value={isDev ? '+71234567654' : ''}
                required />
            <Input type="password"
                   placeholder="Пароль"
                   getValue={passwordHandle}
                   className={styles['form-create-user-input']}
                   value={isDev ? 'qwerty1234' :''}
                   required />
            <Input
                type="email"
                placeholder="ivanovii@mail.ru"
                pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                getValue={emailHandle}
                className={styles['form-create-user-input']}
                value={isDev ? 'temp8686@mail.ru' :''}
                required
            />
            <Input
                placeholder="Иванов"
                pattern="[A-zА-я]"
                settings="isLetter"
                getValue={surnameHandle}
                className={styles['form-create-user-input']}
                value={isDev ? 'Testov' :''}
                required
            />
            <Input
                placeholder="Иван"
                pattern="[A-zА-я]"
                settings="isLetter"
                getValue={nameHandle}
                className={styles['form-create-user-input']}
                value={isDev ? 'Test' :''}
                required
            />
            <button type='submit' className={`${styles['button']} ${styles['form-create-user-button']}`}>Создать</button>

        </form>
    }
}

const mapStateProps = state => {
    console.log( 'state ', state);
    return {}
}


export default hot(module)(connect(mapStateProps)(UserCreateForm));