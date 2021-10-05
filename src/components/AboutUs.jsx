export default function AboutUs(props) {

    const { id, displayTitle, image, description, brochureLink } = props.aboutUsData;
    return (
        <div id={props.section}>
            <div className="row">
                <div className="col-12 col-md-6 subSection">
                    <img  src={image} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className={`col-12 col-md-6 subSection aboutDescription ${props.cssClass}`}>
                    <h2 className="description">{displayTitle.toLocaleUpperCase()}</h2>
                    <div className="description">{description}</div>
                    <button className="btn themeColor brochure description" onClick={(e) => window.open(brochureLink)}>
                        DOWNLOAD BROCHURE
                    </button>
                </div>
            </div>
        </div>
    );
}