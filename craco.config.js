const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CracoCSSModules = require('craco-css-modules');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, "src")
		},
		performance: {
			hints: 'error',
			maxAssetSize: 300000000, // 整数类型（以字节为单位）
			maxEntrypointSize: 500000000 // 整数类型（以字节为单位）
		},
		sourcemap: false,
		// 更改build打包文件名称为dist
		configure: (webpackConfig, { _, paths }) => {
			webpackConfig.output.path = path.resolve(__dirname, 'dist')
			paths.appBuild = path.resolve(__dirname, 'dist')
			webpackConfig.optimization.minimizer = [
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {},
						mangle: true,
						module: false,
						output: null,
						toplevel: false,
						nameCache: null,
						ie8: false,
						keep_classnames: undefined,
						keep_fnames: false,
						safari10: false,
					},
				}),
			];
			return webpackConfig
		},
	},
	paths: {
		appSrc: path.resolve(__dirname, "src")
	},
	devServer: {
		host: '0.0.0.0',
		port: 8001,
		open: false,
		proxy: {
			'/api': {
				target: 'http://localhost:8005',
				changeOrigin: true
			}
		}
	},
	plugins: [
		{plugin: CracoCSSModules}
	]
};
