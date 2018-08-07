# Webpack loader
#### Style Url

Replace object url to string css

> **Spoiler**
> Process performed with [node-sass](https://github.com/sass/node-sass) and [postcss](https://github.com/postcss/postcss) using the plugins [autoprefixer](https://github.com/postcss/autoprefixer) and [postcss-preset-env](https://github.com/csstools/postcss-preset-env) 

**Example**
```scss
.main {
	color: red;

	&.top {
		color: blue;
	}
}
```
```js
From
{
styleUrl: './index.scss'
}
To
{
styleUrl: `.main{color:red}.main.top{color:blue}`
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