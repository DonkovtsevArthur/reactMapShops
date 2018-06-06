import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

class LazyImg extends Component {
	state = {
		src: '',
		pathImage: ''
	}

	componentDidMount() {
		// const { image } = this
		const { src, trace } = require(`~img/${this.props.imgName}`)
		this.setState({
			pathImage: src,
			src: trace
		})
	}

	handleLoad = event => {
		event.preventDefault()
		const { image, state: { pathImage } } = this
		this.setState({ src: pathImage })
	}

	render() {
		const { className, alt = '', decoding = 'async' } = this.props
		return (
			<img
				{...{
					src: this.state.src,
					alt,
					decoding,
					className,
					onLoad: this.handleLoad,
					ref: img => {
						this.image = img
					}
					// onError: () => console.log('Ошибка загрузки изображения', this.src)
					//styleName: `${!pathImage.length && 'loading'} `
				}}
			/>
		)
	}
}

export default hot(module)(LazyImg)
