import React from 'react';

import partners from '../../../../config/partners.json';
import Success from '../../components/Success';

export async function getStaticPaths() {
	return {
		paths: partners.map(partner => {
			return {
				params: {
					id: `${''}`,
				},
			};
		}),
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	let foundPartner: any;
	partners.forEach((partner: any) => {
		if (!foundPartner && partner.id == params.id) {
			foundPartner = partner;
		}
	});

	return {
		props: foundPartner,
	};
}

export default function SuccessPage(partner: any) {
	return <Success {...partner} />;
}
