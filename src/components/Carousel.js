import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import React, { Component } from "react";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} mr-8 md:mr-12`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ml-8 md:ml-12 z-10`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

class Carousel extends Component {
  render() {
    const images = this.props.images;
    const settings = {
      infinite: true,
      speed: 1000,
      fade: true,
      lazyload: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    return (
      <div className="rounded-lg w-64 x:w-72 sm:w-120 md:w-136 mx-auto">
        <Slider {...settings}>
          {images.map(image => {
            const src = image.includes("images")
              ? image
              : `/images/post/${image}`;
            return (
              <div key={image}>
                <img className="rounded-lg" src={src} alt={image} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
