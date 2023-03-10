/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.APP_URL,
		APP_ENV: process.env.APP_ENV,
		APP_SERVER_URL: process.env.APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://online-cinema.herokuapp.com/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'https://online-cinema.herokuapp.com/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
