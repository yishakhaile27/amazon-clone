import React from 'react';
import style from './Carousel.module.css';
import { Carousel } from 'react-responsive-carousel';
import { img } from '../Material/Carousel_img/Carousel_img';
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselEffects() {
    return (
        <div className={style.container}>
            <Carousel
                autoPlay={true}
                infiniteLoop={false}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                transitionTime={300}
            >
                {
                    img.map((imageItemLink, index) => {
                        return <img key={index} src={imageItemLink} alt={`carousel-image-${index}`} />;
                    })
                }
            </Carousel>
            <div className={style.hero_img}></div>
        </div>
    );
}

export default CarouselEffects;
