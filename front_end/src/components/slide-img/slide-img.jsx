import React from "react";
import { Slide } from "react-slideshow-image";
import bn1 from "../../assets/banner/welcome.gif";
import bn2 from "../../assets/banner/bn2.jpg";
import bn3 from "../../assets/banner/bn3.jpg";
import bn4 from "../../assets/banner/bn4.jpg";
import bn5 from "../../assets/banner/bn5.jpg";
import { Link } from "react-router-dom";

const slideImages = [
  bn1, bn5, bn3, bn4, bn2
];

const properties = {
  duration: 7000,
  transitionDuration: 400,
  infinite: true,
  indicators: true,
  arrows: true
}

export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <Link to="/">
            <div className="videoWrap" style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
              {/* <iframe width="1100" height="230" src="https://www.youtube.com/embed/0S6pHex-KCo?version=3&loop=1&playlist=0S6pHex-KCo" frameborder="0" allow="accelerometer; loop; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[3]})` }}>
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[4]})` }}>
            </div>
          </Link>
        </div>
      </Slide>
    </div>
  )
}