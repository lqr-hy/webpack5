const plugins = process.env.PRODUCTION === 'true' ? [
  "react-refresh/babel"
] : []

module.exports = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    [
      "@babel/preset-react"
    ],
    [
      '@babel/preset-typescript'
    ]
  ],
  plugins
}