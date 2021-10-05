import { render, screen } from '@testing-library/react';

import SuccessPage from '../pages/[id]/success';
import partners from '../../../config/partners.json';

const { partnerName, partnerLogo, homePageContent } = partners[0];

beforeEach(() => {
	render(SuccessPage(partners[0]));
});

describe('Success Page', () => {
	test('Renders successfully', () => {
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('All textual content are displayed as per config', () => {
		expect(screen.getByText("You're all set !")).toBeInTheDocument();
		expect(screen.getByRole('main')).toHaveTextContent(
			'You will have access to a professional ' +
				homePageContent.assistanceType +
				' who can provide chat support to you via text, as well as 150+ self-help tools, handpicked by ' +
				homePageContent.assistanceType +
				's to practice mindfulness and build resilience.',
		);
	});
});
