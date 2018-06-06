const path = require('path')
const root = path.resolve(__dirname, '../../')

module.exports = ({ file, options, env }) => {
  const isProd = env === 'production'

  return {
    parser: 'postcss-scss',
    plugins: {
      'postcss-import': {
        resolve: (id, basedir) => {
          const alias = [
            { name: '~css', toPath: 'src/css' },
            { name: '~img', toPath: 'src/img' },
            { name: 'node_modules', toPath: 'node_modules' }
          ]

          for (let { name, toPath } of alias)
            if (id.substr(0, name.length) === name)
              return `${root}/${toPath}/${id.substr(name.length + 1)}`

          return path.resolve(basedir, id)
        }
      },
      'postcss-nested': { preserveEmpty: true },
      'postcss-advanced-variables': {},
      'postcss-custom-media': {},
      'postcss-color-function': {},
      'postcss-selector-not': {},
      'postcss-selector-matches': {},
      'postcss-svg': { dirs: [`${root}/src/img`], svgo: {} },
      'postcss-aspect-ratio': {},
      'postcss-line-height-px-to-unitless': {},
      'postcss-pxtorem': { rootValue: 16, mediaQuery: false },
      'postcss-scale': {},
      'css-mqpacker': { sort: true },
      'postcss-preset-env': {},
      'postcss-flexbugs-fixes': {},
      autoprefixer: {
        browsers: ['last 2 versions', 'IE >= 11'],
        grid: true,
        flexbox: 'no-2009',
        remove: true
      }
    }
  }
}
