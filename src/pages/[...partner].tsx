import React from 'react';

// import partners from '../../config/partners.json';
// import brokers from '../../config/brokers.json';

import partners from '../../config/data-project.json';
import brokers from '../../config/data-broker.json';

// import Home from '../components/Home_1';
import Home from '../components/Home';

export async function getStaticPaths() {
	const pathArray = new Array();
	const allPartners = JSON.parse(JSON.stringify(partners));
	allPartners.forEach((partner: any) => {
		partner.brokers = brokers.filter((broker) => partner.partnerName == broker.partnerName);
		partner.brokers.forEach((broker: any, index: any) => {
			let brokerName = broker.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
			const paramObj = {
				params : {
					partner: [`${partner.partnerName}`, `${index}`, `${brokerName}`]
				}
			}
			pathArray.push(paramObj);
		});
	})
	// console.log(JSON.stringify(pathArray))
	return {
		paths: pathArray,
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	let foundPartner: any;
	let foundBroker: any;
	brokers.forEach((brokeObj: any) => {
		let brokerName = brokeObj.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
		if (brokerName == params.partner[2]) {
			foundBroker = brokeObj;
		}
	});
	partners.forEach((partner: any) => {
		console.log(params)
		if (!foundPartner && partner.partnerName == params.partner[0]) {
			foundPartner = partner;
		}
	});
	return {
		props: {
			projectData: foundPartner,
			brokerData: foundBroker
		}
	};
}

export default function HomePage(data: any) {
	return <Home projectData={data.projectData} brokerData={data.brokerData}/>;
}
