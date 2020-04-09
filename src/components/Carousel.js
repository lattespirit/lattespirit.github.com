/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import React, { Component } from 'react';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props) {
  const { className, style, onClick, onKeyDown } = props;
  return (
    <div
      className={`${className} mr-8 md:mr-12`}
      style={{ ...style }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="link"
      tabIndex={0}
      aria-label="next"
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick, onKeyDown } = props;
  return (
    <div
      className={`${className} ml-8 md:ml-12 z-10`}
      style={{ ...style }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="link"
      tabIndex={0}
      aria-label="prev"
    />
  );
}

class Carousel extends Component {
  render() {
    const { children } = this.props;
    const settings = {
      infinite: true,
      speed: 1000,
      fade: true,
      lazyload: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="rounded-lg w-64 x:w-72 sm:w-120 md:w-136 mx-auto">
        <Slider {...settings}>
          {React.Children.map(children, (child) => {
            return <div>{child}</div>;
          })}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
