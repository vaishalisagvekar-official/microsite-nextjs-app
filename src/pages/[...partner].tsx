import React from 'react';

import projects from '../../config/project.json';
import brokers from '../../config/broker.json';

import Home from '../components/Home';

export async function getStaticPaths() {
	const pathArray = new Array();
	const allProjects = JSON.parse(JSON.stringify(projects));
	allProjects.forEach((project: any, index: any) => {
		if(project.isDeleted) return false;

		project.brokers = brokers.filter((broker) => project._id == broker.projectId);
		project.brokers.forEach((broker: any) => {
			if(broker.isDeleted) return false;
			
			let brokerName = broker.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
			const paramObj = {
				params : {
					partner: [`${index}`, `${brokerName}`]
				}
			}
			pathArray.push(paramObj);
		});
	})
	console.log(pathArray.length)
	// console.log(JSON.stringify(pathArray))
	return {
		paths: pathArray,
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	console.log(params)
	let foundPartner: any;
	let foundBroker: any;
	brokers.forEach((brokeObj: any) => {
		let brokerName = brokeObj.fullName.replace(' ','-');
			brokerName = brokerName.toLowerCase();
		if (!foundBroker && brokerName == params.partner[1]) {
			foundBroker = brokeObj;
		}
	});
	foundPartner = projects[params.partner[0]];
	// projects.forEach((partner: any) => {
	// 	console.log(params)
	// 	if (!foundPartner && partner.projectName == params.partner[0]) {
	// 		foundPartner = partner;
	// 	}
	// });
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
