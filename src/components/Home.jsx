import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

import globalStyles from '../styles/styles.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import SlideShow from './SlideShow';
import AboutUs from './AboutUs';
import Amenities from './Amenities';
import VirtualTour from './VirtualTour';
import Gallery from './Gallery';
import FloorPlan from './FloorPlan';
import ContactUs from './ContactUs';
import EnquiryForm from './EnquiryForm';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		// var settings = {
		// 	themeColor : '#0A0A0A'
		// }
		this.setStyleOfWholeBody({});
	}

	// Set font family of our choice for whole body
	setStyleOfWholeBody = (settings) => {
		var r = document.querySelector('.microsite-content');
		if(settings.fontFamily) r.style.setProperty('--fontFamily', settings.fontFamily);
		if(settings.lineHeight) r.style.setProperty('--lineHeight', settings.lineHeight);
		if(settings.themeColor) r.style.setProperty('--themeColor', settings.themeColor);
		if(settings.fontColor) r.style.setProperty('--fontColor', settings.fontColor);
	}

	render() {
		
		const { sections } = this.props.projectData.websiteMenus;

		return (
		<div className="microsite-content">
			<style jsx global>
					{globalStyles}
			</style>
			<nav className="navbar fixed-top navbar-expand-sm themeColor ">
				<a className="navbar-brand" href="#">
					<img 
						className="logo"
						src="https://cp.kohinoorsquare.in/praful-jadhav/wp-content/uploads/2020/08/logo-kohinoor.png" alt="" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fa fa-bars navbarIcon"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav d-flex justify-content-end">
						{
							sections.map((section, index) => {
								const sectionName = section.title.toLocaleUpperCase();
								if(index == 0){
									return <li className="nav-item active" key={section.id}>
												<a className="nav-link" href={`#${section.id}`}>{sectionName}
												</a>
											</li>
								} else if(section.id !== 'footer'){
									return <li className="nav-item" key={section.id}>
												<a className="nav-link" href={`#${section.id}`}>{sectionName}</a>
											</li>
								}
							})
						}
					</ul>
				</div>
			</nav>
			{
				sections.map((section) => {
						switch (section.id) {
							case 'banner':
								return <SlideShow 
											key={section.id} 
											section={section.id}
											imgArray={section.images} 
											cssClass={"bannerContainer"}>
										</SlideShow>
								break;

							case 'about':
								return <AboutUs 
											key={section.id}
											section={section.id} 
											aboutUsData={section} 
											cssClass={"verticallyMiddle"}>
										</AboutUs>
								break;

							case 'amenities':
								return <Amenities 
											key={section.id}
											section={section.id} 
											amenitiesData={section} 
											imageCss="amenityIcon" 
											containerCss="verticallyMiddle">
										</Amenities>
								break;

							case 'virtualTour':
								return <VirtualTour
											key={section.id}
											section={section.id}
											virtualTourData={section}>
										</VirtualTour>
								break;

							case 'gallery':
								return <Gallery 
											key={section.id}
											section={section.id} 
											galleryData={section}>
										</Gallery>
								break;
						
							case 'floorPlans':
								return <FloorPlan
											key={section.id}
											section={section.id}
											floorPlanData={section}
										></FloorPlan>
								break;
					
							case 'contactUs':
								return <ContactUs
											key={section.id}
											section={section.id}
											contactUsData={section}
											brokerData={this.props.brokerData}
										></ContactUs>
								break;
					
							case 'footer':
								return <Footer
											key={section.id}
											section={section.id}
											footerData={section}
											cssClass={"verticallyMiddle"}
										></Footer>
								break;
						
							default:
								break;
						}
				})
			}
			<ModalContainer id="enquiryFormId" title="Get In Touch">
				<EnquiryForm isFromModal={true}></EnquiryForm>
			</ModalContainer>
		</div>
		);
	}
}

export default withRouter(Home);


function Footer(props){
	const [show, setShow] = useState(false);

	const { description, disclaimer } = props.footerData;
	
	return (
		<div>
			<div className="row footer">
				<strong>
					{description}
					<br />
					<br />
					<div onClick={() => setShow(true)} style={{cursor : 'pointer'}}>Disclaimer</div>
					<Modal
						show={show}
						onHide={() => setShow(false)}
						backdrop="static"
						keyboard={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>Disclaimer</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="disclaimer">
								{disclaimer}
							</div>
						</Modal.Body>
					</Modal>						
				</strong>
			</div>
		</div>
	);
}

function ModalContainer(props) {

	const [show, setShow] = useState(false);
	
	console.log("came in modal container")
		return (
			<>
				<div id="enquire-now" className="enquire-now" onClick={() => setShow(true)}>
					<a href="#" className="enquire-now-btn btn  btn-lg" >ENQUIRE NOW</a>
				</div>
				<Modal
					show={show}
					onHide={() => setShow(false)}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{props.children}
					</Modal.Body>
				</Modal>
			</>
		)
}
