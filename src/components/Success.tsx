import React, { Component } from 'react';
import Head from 'next/head';
import GA4React from 'ga-4-react';

import { gaInit, logEventToGA } from '../../../common/ga';
import styles from '../styles/Success.module.css';
import globalStyles from '../styles/global.js';

interface MyProps {
	id: string;
	partnerName: string;
	partnerLogo: string;
	homePageContent: any;
	logoStyle: string;
}

interface MyState {
	email: string;
	patient_code: string;
	patient_therapy_link: string;
}

class Success extends Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = { email: '', patient_code: '', patient_therapy_link: '' };
	}

	componentDidMount() {
		gaInit(process.env.gtagId, this.props.id, GA4React);

		this.setState({
			email: localStorage.getItem('email') || '',
			patient_code: localStorage.getItem('patient_code') || '',
			patient_therapy_link: localStorage.getItem('patient_therapy_link') || '',
		});
	}

	logEvent = (type: string, event: any, logLevel = 'ga') => {
		logEventToGA(type, event);
	};

	render() {
		const { partnerName, partnerLogo, homePageContent = {}, logoStyle } = this.props;
		const { email } = this.state;

		return (
			// prettier-ignore
			<React.Fragment>
				<Head>
					<title>{partnerName} - Success</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="icon" href="/assets/images/mascot.svg" sizes="any" type="image/svg+xml" />
				</Head>
				<style jsx global>
					{globalStyles}
				</style>
				<main id={styles['container']}>
					<div id={styles['header']}>
						<div id={styles['partner-logo-wrapper']}>
							<img id={styles['partner-logo']} src={partnerLogo}/>
						</div>
						<div id={styles['wysa-logo-wrapper']}>
							<img id={styles['wysa-logo']} src={'/assets/images/wysa_logo.svg'}/>
						</div>
					</div>
					<div id={styles['content']}>
						<div id={styles['right-content-wrapper']}>
							<div id={styles['rcw-title']}>
								You're all set !
							</div>
							<div className={styles['rcw-description']}>
								You will have access to a <strong>professional {homePageContent.assistanceType}</strong> who can provide chat support to you <strong>via text,</strong> as well as <strong>150+ self-help tools,</strong>{' '} handpicked by {homePageContent.assistanceType}s to <strong>practice mindfulness</strong> and <strong>build resilience.</strong>
							</div>
							<div className={styles['rcw-description']}>
								We have sent you an email at <span id={styles['user-email']} style={{color: '#4896E9'}}>{email}</span>{' '} with the link to install and redeem your benefits.
							</div>
							<div className={styles['rcw-description']}>
								Please check your spam or search for <span style={{ color: '#4896E9' }}> wysa.io </span>{' '} in your mail.
							</div>
							<div className={styles['rcw-description']}>
								Issues? Email <a style={{color: '#4896E9'}} href="mailto:partner@wysa.io">partner@wysa.io</a>
							</div>
						</div>
						<div className={styles['left-content-wrapper']} id={styles['left-image']}>
							<img className={styles['partner1-' + logoStyle]} id={styles['phone-partner1-logo']} src={partnerLogo}/>
						</div>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default Success;
