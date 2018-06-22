# Webpack loader
#### Style Url

Replace object url to require

```js
From
{
styleUrl: './index.scss'
}
To
{
styleUrl: require('./index.scss')
}
```

###  webpack
**install:**    npm i -D style-url-webpack
```js
{
	test: /\.js$/,
	loader:  'style-url-webpack',
	exclude: ['node_modules'],
	include: [path.resolve(__dirname, 'src')]
},
```