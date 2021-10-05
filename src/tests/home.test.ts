import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import HomePage from '../pages/[...partner]';
import partners from '../../../config/partners.json';

// const { partnerName, partnerLogo, homePageContent } = partners;

let inputElems: any;
let buttonElems: any;

process.env.gtagId = 'G-DGZ0JBX7VB';
process.env.redirectUrl = window.location.href;
process.env.botHost = 'https://dev.bot.touchkin.com' || '';

beforeEach(() => {
	render(HomePage(partners[0]));
	inputElems = screen.queryAllByRole('textbox');
	buttonElems = screen.queryAllByRole('button');
});

describe('Home Page', () => {
	test('Renders successfully', () => {
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('All textual content are displayed as per config', () => {
		expect(screen.getByText('')).toBeInTheDocument();

		// expect(screen.getByText(homePageContent.text2)).toBeInTheDocument();

		// expect(screen.getByText(homePageContent.text3 + homePageContent.assistanceType + '.')).toBeInTheDocument();

		// expect(screen.getByText(homePageContent.text4)).toBeInTheDocument();
	});

	test('Email input displayed with a proper placeholder', () => {
		inputElems.forEach((e: any) => {
			expect(e).toBeInTheDocument();
			expect(e).toHaveAttribute('placeholder', 'Enter your valid ' + '' + ' email ID');
		});
	});

	test('Submit button is displayed and is disabled', () => {
		buttonElems.forEach((e: any) => {
			expect(e).toBeInTheDocument();
			expect(e).toHaveAttribute('disabled');
		});
	});
});

describe('Email validation', () => {
	describe('Submit button', () => {
		test('is disabled and warning message is displayed when the entered email is invalid', () => {
			inputElems.forEach((e: any) => {
				userEvent.type(e, 'test');
			});
			buttonElems.forEach((e: any) => {
				expect(e).toHaveAttribute('disabled');
				expect(
					screen.queryAllByText('*Please enter your valid ' + '' + ' email ID')[0],
				).toBeInTheDocument();
				expect(
					screen.queryAllByText('*Please enter your valid ' + '' + ' email ID')[1],
				).toBeInTheDocument();
			});
		});

		test('is enabled when the entered email is valid', () => {
			inputElems.forEach((e: any) => {
				userEvent.type(e, 'test@gmail.com');
			});

			buttonElems.forEach((e: any) => {
				expect(e).not.toHaveAttribute('disabled');
			});
		});
		jest.setTimeout(5000);

		test('shows error message if entered email is unauthorized', async () => {
			inputElems.forEach((e: any) => {
				userEvent.type(e, 'test@gmail.com');
			});
			const mock = new MockAdapter(axios);
			mock.onPost('https://dev.bot.touchkin.com/bwx9d55moelvirnz0tuh1y9ewof3g2kd', {
				email: 'test@touchkin.com',
				partner: 'bni',
			}).reply(400, {});
			userEvent.click(buttonElems[0]);

			await waitFor(() => {
				expect(
					screen.queryAllByText('Could not verify email. Try again or write to partner@wysa.io for help')[0],
				).toBeInTheDocument();
			});
		});

		//ToDO: This test case is not working as expected. Throwing error at router.push() Need to update
		// test('redirects user to a new page if entered email is authorized', async () => {
		// 	inputElems.forEach((e: any) => {
		// 		userEvent.type(e, 'test@touchkin.com');
		// 	});

		// 	const mock = new MockAdapter(axios);
		// 	mock.onPost('https://dev.bot.touchkin.com/bwx9d55moelvirnz0tuh1y9ewof3g2kd',{
		// 		email: 'test@touchkin.com',
		// 		partner: 'bni',
		// 	}).reply(200, { response: true });

		// 	userEvent.click(buttonElems[0]);

		// 	await waitFor(() => {
		// 		expect(window.location.pathname).toEqual('/success');
		// 	});
		// });
	});
});
