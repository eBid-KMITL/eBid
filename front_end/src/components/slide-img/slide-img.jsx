import React from "react";
import { Slide } from "react-slideshow-image";
import bn1 from "../../assets/banner/bn1.jpg";
import bn2 from "../../assets/banner/bn2.jpg";
import bn3 from "../../assets/banner/bn3.jpg";
import bn4 from "../../assets/banner/bn4.jpg";
import bn5 from "../../assets/banner/bn5.jpg";
import { Link } from "react-router-dom";

const slideImages = [
  bn1, bn5, bn3, bn4, bn2
];

const properties = {
  duration: 5000,
  transitionDuration: 350,
  infinite: true,
  indicators: true,
  arrows: true
}

export const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[3]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[4]})`}}>
            </div>
          </div>
        </Slide>
      </div>
    )
}