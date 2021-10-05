import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { withRouter, NextRouter } from 'next/router';
import GA4React from 'ga-4-react';

import { gaInit, logEventToGA } from '../../../common/ga';
import styles from '../styles/Home.module.css';
import globalStyles from '../styles/global.js';

interface WithRouterProps {
	router: NextRouter;
}

interface MyProps extends WithRouterProps {
	id: string;
	partnerName: string;
	partnerLogo: string;
	homePageContent: any;
}

interface MyState {
	email: string;
	emailValidateRequestSent: boolean;
	showEmailInputWarning: boolean;
	showEmailInputError: boolean;
	arrowStyleFill: any;
	submitButtonClass: string;
}

class Home extends Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			email: '',
			emailValidateRequestSent: false,
			showEmailInputWarning: false,
			showEmailInputError: false,
			arrowStyleFill: { display: 'block', fill: '' },
			submitButtonClass: 'lpc-col-1-email-submit-inactive',
		};
		Home.successPageLink = props.id + '/success';
		Home.botHost = process.env.botHost || '';
	}

	componentDidMount() {
		gaInit(process.env.gtagId, this.props.id, GA4React);
	}

	static successPageLink = '';
	static botHost = '';

	logEvent = (type: string, event: any, logLevel = 'ga') => {
		logEventToGA(type, event);
	};

	validateEmail = (value: string) => {
		const mailformat = /^\w+([\.-]\w+)*@\w+([\.-]\w+)*(\.\w{2,3})+$/;
		return value.match(mailformat);
	};

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ email: event.target.value }, () => {
			this.refreshSubmitButton();
		});
	};

	handleEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			this.onClickOnSubmitEmail();
		}
		if (this.state.emailValidateRequestSent) {
			return;
		}
	};

	refreshSubmitButton = () => {
		this.setState({
			showEmailInputWarning: false,
			showEmailInputError: false,
			submitButtonClass: 'lpc-col-1-email-submit-active',
		});

		if (this.validateEmail(this.state.email)) {
			this.setState({
				arrowStyleFill: { display: 'block', fill: 'white' },
				submitButtonClass: 'lpc-col-1-email-submit-active',
				showEmailInputWarning: false,
			});
		} else {
			this.setState({
				arrowStyleFill: { display: 'block', fill: '#A1A1A1' },
				submitButtonClass: 'lpc-col-1-email-submit-inactive',
			});

			if (this.state.email !== '') {
				this.setState({
					showEmailInputWarning: true,
				});
			}
		}
	};

	onClickOnSubmitEmail = () => {
		if (!this.validateEmail(this.state.email)) {
			return;
		}

		this.logEvent('EMAIL_SUBMITTED', {
			gaCategory: 'engagement',
		});

		this.setState({
			emailValidateRequestSent: true,
			submitButtonClass: 'lpc-col-1-email-submit-loading',
			arrowStyleFill: { display: 'none', fill: '' },
		});

		const email = this.state.email;
		localStorage.setItem('email', email);
		this.getEmailConfirmation(email);
	};

	getEmailConfirmation = (email: string) => {
		const url = Home.botHost + '/bwx9d55moelvirnz0tuh1y9ewof3g2kd';
		const body = {
			email: email,
			partner: this.props.id,
		};
		axios
			.post(url, body)
			.then(response => {
				this.setState({
					emailValidateRequestSent: false,
				});
				this.props.router.push(Home.successPageLink);
			})
			.catch(error => {
				this.refreshSubmitButton();
				this.setState({
					emailValidateRequestSent: false,
					showEmailInputError: true,
				});
			});
	};

	render() {
		const { partnerName, partnerLogo, homePageContent = {} } = this.props;
		const { showEmailInputError, showEmailInputWarning, arrowStyleFill, submitButtonClass, email } = this.state;

		return (
			// prettier-ignore
			<React.Fragment>
				<Head>
					<title>{partnerName}</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="icon" href="/assets/images/mascot.svg" sizes="any" type="image/svg+xml" />
				</Head>
				<style jsx global>
					{globalStyles}
				</style>
				<main id={styles['container']}>
					<div id={styles['landing-page-header']}>
						<div id={styles['partner-logo-wrapper']}>
							<img id={styles['partner-logo']} src={partnerLogo}/>
						</div>
						<div id={styles['wysa-logo-wrapper']}>
							<img id={styles['wysa-logo']} src="/assets/images/wysa_logo.svg"/>
						</div>
					</div>
					<div id={styles['landing-page-content']}>
						<div id={styles['lpc-col-2']}>
							<img id={styles['lpc-col-2-partner-logo']} src={partnerLogo}/>
							<img id={styles['lpc-col-2-collab-logo']} src="/assets/images/collab.png"/>
							<div id={styles['recognition-wrapper']}>
								<img id={styles['lpc-col-2-orcha-logo']} src="/assets/images/orcha.svg"/>
								<img id={styles['lpc-col-2-rating-image']} src="/assets/images/wysa_downloads.svg"/>
							</div>
						</div>
						<div id={styles['lpc-col-1']}>
							<div id={styles['lpc-col-1-title']}>
								{homePageContent.text1}
							</div>
							<div className={styles['lpc-col-1-description']}>
								{homePageContent.text2}
							</div>
							<div className={styles['lpc-col-1-description']}>
								{homePageContent.text3} {homePageContent.assistanceType}.
							</div>
							<div className={styles['lpc-col-1-description']}>
								{homePageContent.text4}
							</div>

							<div id={styles['lpc-col-1-email-input-container']}>
								{showEmailInputWarning ?
									(<div id={styles['desktop-email-input-warning']} className={styles['lpc-col-1-email-input-warning']}>
										{"*Please enter your valid " + partnerName + " email ID"}
									</div>) :
									<div />
								}
								<div
									id={styles['lpc-col-1-email-input-wrapper']}>
									<input id={styles['desktop-email-input']} className={styles['lpc-col-1-email-input'] + " " + (showEmailInputError ? styles["lpc-col-1-email-input-red"] : "")} placeholder={"Enter your valid " + partnerName + " email ID"} onChange={this.handleChange} onKeyPress={this.handleEnter} value={email}/>
									<button
										id={styles['desktop-submit-btn']}
										className={`${styles['lpc-col-1-email-submit']} ${styles[submitButtonClass]}`} onClick={this.onClickOnSubmitEmail}
										disabled = {submitButtonClass == 'lpc-col-1-email-submit-inactive'}>
										<svg id={styles['arrow-desktop']} style={arrowStyleFill} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
											<path d="M0 0h24v24H0z" fill="none"/>
											<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
										</svg>
									</button>
								</div>
								<div id={styles['desktop-email-input-error']} className={styles['lpc-col-1-email-input-error']}>
									{showEmailInputError ? "Could not verify email. Try again or write to partner@wysa.io for help": ""}
								</div>
							</div>
						</div>
						<div id={styles['partner1-lpc-col-0']}>
							<div id={styles['lpc-col-0-curve']}></div>
						</div>
					</div>
					<div id={styles['floating-email-input-wrapper']}>
						<div id={styles['floating-email-input-container']}>
							{showEmailInputWarning ?
								(<div id={styles['mobile-email-input-warning']} className={styles['lpc-col-1-email-input-warning']}>
									{"*Please enter your valid " + partnerName + " email ID"}
								</div>):
								<div/>
							}
							<div id={styles['lpc-col-1-email-input-wrapper']}>
								<input id={styles['mobile-email-input']} className={styles['lpc-col-1-email-input']} placeholder={"Enter your valid " + partnerName + " email ID"} onChange={this.handleChange} onKeyPress={this.handleEnter} />
								<button id={styles['mobile-submit-btn']} className={styles['lpc-col-1-email-submit'] + ' ' +  styles[submitButtonClass]} onClick={this.onClickOnSubmitEmail} 
								disabled = {submitButtonClass == 'lpc-col-1-email-submit-inactive'}>
									<svg id={styles['arrow-mobile']} style= {arrowStyleFill} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
										<path d="M0 0h24v24H0z" fill="none"/>
										<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
									</svg>
								</button>
							</div>
							<div id={styles['mobile-email-input-error']} className={styles['lpc-col-1-email-input-error']}>
							{showEmailInputError ? "Could not verify email. Try again or write to partner@wysa.io for help": ""}
							</div>
						</div>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default withRouter(Home);
