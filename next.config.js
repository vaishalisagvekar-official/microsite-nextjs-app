// prettier-ignore
let gtagId = process.env.BUILD_ENV === 'production' ? 'G-0JBZFDWCX3' : 'G-DGZ0JBX7VB';
// prettier-ignore
let redirectUrl = process.env.BUILD_ENV === 'production' ? 'https://partner.wysa.io/' : 'https://dev-partner.wysa.io/';
// prettier-ignore
let botHost = process.env.BUILD_ENV === 'production' ? "https://bot.touchkin.com" : "https://dev.bot.touchkin.com";

module.exports = {
	generateEtags: true,
	env: {
		gtagId: gtagId,
		redirectUrl: redirectUrl,
		botHost: botHost,
	},
	future: {
		webpack5: true,
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.(png|jpeg|svg)$/,
			loader: 'url-loader',
		});

		return config;
	},
};
