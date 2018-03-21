const settings = {
	js: {
		entries: './src/front/js/App.jsx',
		buildFileName: 'bundle.js',
		buildDir: './public/js/',
		errorMsg: '----js error----'
	},
	css: {
		src: './src/front/scss/style.scss',
		build: './public/css/'
	},
	img: {
		src: ['./src/front/**/*.svg', './src/front/**/*.png'],
		build: './public/img/'
	},
	font: {
		src: './src/front/font/*.*',
		build: './public/font/'
	},
	media: {
		src: './src/front/media/*.*',
		build: './public/media/'
	},
	template: {
		src: './src/front/template/*.html',
		build: './public/'
	},
	watch: {
		js: [
			'./src/front/js/**/*.jsx',
			'./src/front/js/**/*.js',
			'./src/js/**/*.ts',
			'./src/js/**/*.tsx'
		],
		css: './src/front/**/*.scss',
		font: './src/front/font/*.*',
		img: './src/front/img/*.*',
		media: './src/front/media/*.*',
		browserSync: './public/**/*.*'
	},
	server: {
		baseDir: './public'
	}
}

export default settings
