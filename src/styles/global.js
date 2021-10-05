import css from 'styled-jsx/css';

export default css.global`
	@font-face {
		font-family: quicksand-bold;
		src: url(../fonts/Quicksand-Bold.ttf);
		font-weight: 700;
		font-display: swap;
	}
	@font-face {
		font-family: quicksand;
		src: url(../fonts/Quicksand-Regular.ttf);
		font-weight: 400;
		font-display: swap;
	}
	@font-face {
		font-family: roboto;
		src: url(../fonts/Roboto-Regular.ttf);
		font-weight: 400;
		font-display: swap;
	}
	@font-face {
		font-family: roboto-bold;
		src: url(../fonts/Roboto-Bold.ttf);
		font-weight: 700;
		font-display: swap;
	}
	body {
		margin: 0;
		padding: 0;
		overflow: hidden;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 100%;
	}
`;
