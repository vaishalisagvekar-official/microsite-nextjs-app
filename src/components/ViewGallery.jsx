import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

class ViewGallery extends React.Component {
	constructor(props) {
		super(props);
		this.viewGalleryRef = React.createRef();
		this.state = {
			slideIndex : props.imgIndex
		}
		for (let index = 0; index < props.images.length; index++) {
			this[`myGallerySlides${index}`] = React.createRef();
			this[`demoRef${index}`] = React.createRef();
		}
		this.galleryListRowRef = React.createRef();
	}

	componentDidMount() {
		$(`#viewgalleryId`).modal('show');
		this.showSlides(this.state.slideIndex);
	}

	// Show next images in bottom list(scroll forward bottom list view)
	scrollNext = () => {
		this.galleryListRowRef.current.scrollLeft = this.galleryListRowRef.current.scrollLeft + this.galleryListRowRef.current.offsetWidth;
	};

	// Show previous images in bottom list(scroll backwards bottom list view)
	scrollBack = () => {
		this.galleryListRowRef.current.scrollLeft = this.galleryListRowRef.current.scrollLeft - this.galleryListRowRef.current.offsetWidth;
	};

	render() {
		const { images, onClose} = this.props;
		return (
			<div>
				<div className="modal fade" ref={this.viewGalleryRef} id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{padding : '0px'}}>
					<div className="modal-dialog modal-fullscreen viewgallery-dialog" role="document">
						<div className="modal-content viewGallery-content">
							<div className="modal-body">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
									<span aria-hidden="true" className="closeBtn">&times;</span>
								</button>
								<div className="container">
									<div style={{position : 'relative'}}>
										{
											images.map((singleImg, index) => {
												return (
													<div className="myGallerySlides" ref={this[`myGallerySlides${index}`]} key={`myGallerySlides${index}`}>
														<img className="viewedImg imgTag" src={images[this.state.slideIndex]} />
													</div>
												)
											})
										}
										<a className="prev anchorTag" onClick={() => this.plusSlides(-1)}>❮</a>
										<a className="next anchorTag" onClick={() => this.plusSlides(1)}>❯</a>
										<div className="galleryListContainer" >
											<a id="galleryListPrev anchorTag" onClick={() => this.scrollBack()}>❮</a>
											<div className="rowDiv" ref={this.galleryListRowRef} >
												{
													images.map((singleImg, index) => {
														return (
															<div className="column" key={`column${index}`}>
																<img className="demo cursor imgTag" ref={this[`demoRef${index}`]} src={singleImg} onClick={() => this.currentSlide(index)} alt="The Image" />
															</div>
														)
													})
												}
											</div>
											<a id="galleryListNext anchorTag" onClick={() => this.scrollNext()}>❯</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	plusSlides = (n) => {
		let tempIndex = this.state.slideIndex + n;
		if (tempIndex >= this.props.images.length) {
			tempIndex = 0;
		}
		if (tempIndex < 0) { 
			tempIndex = this.props.images.length - 1;
		}
		this.showSlides(tempIndex);
	}

	currentSlide = (n) => {
		this.showSlides(n);
	}

	showSlides = (n) => {
		let number = n;
		for (var i = 0; i < this.props.images.length; i++) {
			this[`myGallerySlides${i}`].current.style.display = "none";
		}
		for (var i = 0; i < this.props.images.length; i++) {
			this[`demoRef${i}`].current.className = this[`demoRef${i}`].current.className.replace(" active", "");
		}
		this[`myGallerySlides${number}`].current.style.display = "block";
		this[`demoRef${number}`].current.className += " active";

		this.setState({ slideIndex : number}) 
	}
}

export default withRouter(ViewGallery);
