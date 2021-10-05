import css from 'styled-jsx/css';

export default css.global`
* {box-sizing: border-box;}
:root {
  --fontFamily: Verdana, sans-serif;
  --lineHeight: 28.125px; 
  --themeColor: #C49675;
  --fontColor: white;
}

#gallery img,
.btn, a {
  cursor: pointer;
} 

.row {
  margin: 0;
}

/* Project logo */
.logo { 
	width: 150px;
	height: 50px;
}

/* theme background color & font color */
.themeColor{
  background-color: var(--themeColor, black) !important;
  color: var(--fontColor, black) !important;
}

/* top header bar */
.navbar {
  padding-left: 25px;
  padding-right: 25px;
}
.navbar-collapse .nav-link{
	color: var(--fontColor, white) !important;
  font-weight: 500;
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

.navbar-collapse .nav-link:hover{
  color: var(blue, white) !important;
}

.navs {
    width: fit-content;
    justify-content: center;
    margin: auto;
}

.navbarIcon {
  color: rgb(165 157 149);
}

.brochure{
  margin-top: 50px;
}

.sectionTitle{
  text-align: center;
  color: var(--fontColor, white);
  margin : 30px
}

.sectionTextColor {
  color: var(--fontColor, white);
}

.bannerContainer{
	 width: 100%;
	 height: 100vh;
}

.verticallyMiddle{
	vertical-align: middle;
	margin: auto;
}

.btn{
	 padding: 12px;
   font-weight: 600;
   border-radius: 0;
}

.subSection {
	padding: 100px 35px;
}

.description{
  margin-top: 15px;
  margin-bottom: 15px;
}

.amenityIcon{
	 height: 50px;
	 width: 70px;
	 text-align: center;
}

.amenityTitle{
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
}

/* .amenityContainer .sectionContent .col-xs-6 {
  width: 50%;
} */
@media screen and (min-width: 577px) {
  .sectionContent {
    padding: 30px;
    justify-content: center;
  }

  .amenityIconContainr{
    margin: 15px;
    border: 1px solid #3c3939;
    padding: 35px 15px;
  }

  .amenityContainer{
    background-image: url('https://theratio.s3.amazonaws.com/images/bg2-process.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
	  padding: 60px;
  }

  .carouselHeight {
    height: 90vh;
  }

  .carouselHeight_1 {
    height: 80vh;
  }
}

@media screen and (max-width: 576px) {
  .sectionContent {
    padding: 0px;
    justify-content: center;
  }

  .amenityIconContainr{
    margin: 8px;
    border: 1px solid #3c3939;
    padding: 35px 15px;
  }

  .amenityContainer{
    background-image: url('https://theratio.s3.amazonaws.com/images/bg2-process.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
	  padding: 20px;
  }

  .carouselHeight {
    height: 80%;
  }

  .carouselHeight_1 {
    height: 60%;
  }
}

@media screen and (max-width: 768px) {
  .amenityContainer{
    background-image: url('https://theratio.s3.amazonaws.com/images/bg2-process.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
	  padding: 20px;
  }

  .carouselHeight_1 {
    height: 80%;
  }
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: fit-content
}

.carousel-indicators {
  bottom: 30px;
}

.tourBtn{
  background-color: rgba(55, 189, 60, 0.84);
  color: var(--fontColor, white);
  border-radius: 25px;
}

.galleryImgDiv{
  padding: 15px;
}

.galleryImgDiv img{
  height: 230px;
  width: 100%;
}

.footer{
  text-align: center;
  padding: 30px 30px 20px 30px;
  justify-content: center;
  font-size: inherit;
  color: white;
  background-color: var(--themeColor, black);
}

.form-control {
	border: none;
	border-bottom: 1px solid #dfd5d5;
	margin-bottom: 24px;
}

.tncLabel{
	font-size: 10.5px;
}

.contactUs {
	padding: 0px;
}

.contactUsColContent {
  padding: 30px
}

.brokerDetails{
	background-image: url(https://d1an7tx677lu0y.cloudfront.net/2021/07/bg1-contact-1.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
	color: #e5e3e3;
  margin: 30px 0;
}

.contactUsMap {
  min-height : 500px;
  margin: 30px 0;
}

.brokerDetails .row {
	margin-bottom: 10px;
}

.brokerDetailsTitle {
	margin-bottom: 5px;
	font-weight: 600;
}

.fullSize{
	width: 100%;
	height: 100%;
}

.mySlides {display: none;}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  /* max-width: 1000px; */
  position: relative;
  margin: auto;
}

/* Caption text */
.slideshow-container .text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.slideshow-container .numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.slideshow-container .dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.slideshow-container .active {
  background-color: #717171;
}

/* Fading animation */
.slideshow-container .fadeImg {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
	 .slideshow-container .text {font-size: 11px}
}

.enquire-now
{
  position:fixed;
  top:15%;
  right:0;
  z-index:100;
  min-height:450px;
  
}

#enquire-now  .btn.focus, .btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
}

.enquire-now-btn
{
  position: absolute;
  left: -100px;
  color: var(--fontColor, white);
  transform: rotate(-90deg);
  top: 60%;
  background-color: var(--themeColor, black);
  padding: 5px 10px;
  width: max-content;
}

@media only screen and (max-width: 425px){
	#enquire-now{display: none;}
}

#scrollUp {
	display: none;
	position: fixed;
	bottom: 20px;
	right: 30px;
	z-index: 99;
	font-size: 18px;
	border: 2px solid transparent;
	outline: none;
	background-color: #9f9e9e;
	color: white;
	cursor: pointer;
	border-radius: 50%;
	height: 50px;
	width: 50px;
	text-align: center;
	line-height: 48px;
}

@media (max-width: 767px) {
	#scrollUp {
	  right: 16px;
	}
}
  
#scrollUp:hover {
  color: var(--fontColor, black);
}

.disclaimer {
  color: black;
  font-weight: 300;
  font-size: 12px;
  margin-top: 10px;
  text-align: left;
}

#disclaimerId .title {
  font-size: 1.75rem;
  text-align: left;
  color: black;
  font-weight: 300;
}

/* Open Gallery  */
.viewgallery-dialog {
    height: 100vh;
    max-width: 100%;
    margin: 0;
}

.viewGallery-content {
    // width: 100%;
    // height: 100%;
    // opacity: 1;
    background: black;
}

// .viewGallery-content .modal-content {
//   background: black;
// }

.viewedImg {
  width: 100%;
  height: 63vh
}

.closeBtn {
  font-size: 30px;
  color: white
}

#viewgalleryId img {
  vertical-align: middle;
}

/* Next & previous buttons */
.viewGallery-content .prev,
.viewGallery-content .next {
  cursor: pointer;
  position: absolute;
  top: 43%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: black;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
  text-decoration: unset;
}

/* Position the "next button" to the right */
.viewGallery-content .next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.viewGallery-content .prev:hover,
.viewGallery-content .next:hover {
  color: rgb(241, 211, 211) !important;
  background-color: rgba(0, 0, 0, 0.8);
}

#viewgalleryId .row:after {
  content: "";
  display: table;
  clear: both;
  position: relative;
}

/* Images List View */
#viewgalleryId .column {
  width: 100px;
  height: 100px;
  margin: 0 10px;
  cursor: pointer;
}
#viewgalleryId .column img {
  width: inherit;
  height: inherit;
}

/* Add a transparency effect for thumnbail images */
#viewgalleryId .demo {
  opacity: 0.6;
}

#viewgalleryId .active,
#viewgalleryId .demo:hover {
  opacity: 1;
  border: 3px solid #0698f3;
}

.galleryListContainer {
  display: flex;
  margin-top: 35px
}

.galleryListContainer .galleryListPrev,
.galleryListContainer .galleryListNext {
    color: var(--themeColor, black);
    font-size: 25px;
    vertical-align: middle;
    margin: auto 25px;
    color: #7a7e81;
    text-decoration: unset;
}

.galleryListContainer .rowDiv {
  overflow-x: auto !important;
  white-space: nowrap !important;
  display: flex;
  width: inherit
}

.galleryListContainer .rowDiv::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
  overflow: -moz-scrollbars-none;
}

.galleryListContainer > .row > .col {
  display: inline-block;
  float: none;
  /* width: 25%; */
}

.demo {
  /* width: 80px;
  height: 80px; */
 }
`;


