const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './_site/**/*.html',
    './_site/**/*.vue',
    './_site/dist/lattespirit.js',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}
