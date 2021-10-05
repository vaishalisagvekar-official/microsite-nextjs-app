import CarouselContainer from './CarouselContainer';

export default function VirtualTour(props) {

    const { id, title, list } = props.virtualTourData;
    return (
        <div id={props.section} className="amenityContainer">
            <h2 className="sectionTextColor sectionTitle">{title}</h2>
            <CarouselContainer sectionId={id} list={list} containerCss="sectionContent" containerHeight="carouselHeight_1"></CarouselContainer>
        </div>
    );
}