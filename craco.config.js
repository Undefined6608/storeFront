const path = require('path');

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
		// 更改build打包文件名称为dist
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.output.path = path.resolve(__dirname, 'dist')
			paths.appBuild = path.resolve(__dirname, 'dist')
			return webpackConfig
		},
	},
	paths: {
		appSrc: path.resolve(__dirname, "src")
	},
	devServer: {
		host: '0.0.0.0',
		port: 8001,
		proxy: {
			'/api': {
				target: 'http://localhost:8005',
				changeOrigin: true
			}
		}
	}
};
