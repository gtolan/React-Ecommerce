import React, { Component } from "react";
import "../App.css";

export default class Carousel extends Component {
  state = {
    active: 1,
    slides: [
      {
        id: 1,
        img: "/img/slide1.png"
      },
      {
        id: 2,
        img: "/img/slide2.png"
      },
      {
        id: 3,
        img: "/img/slide3.png"
      },
      {
        id: 4,
        img: "/img/slide4.png"
      },
      {
        id: 5,
        img: "/img/slide5.png"
      }
    ]
  };
  checkClassActive(id) {
    // console.log("check if class");
    return id === this.state.active ? "slide show" : "hidden";
  }
  checkControlActive(id) {
    return id === this.state.active ? "control active" : "control not-active";
  }

  componentDidMount() {
    console.log("I am mounted!");
    this.startCarousel();
  }

  changeActiveSlide(id) {
    return this.setState({ active: id });
  }

  startCarousel() {
    console.log("start carousel");
    const runSlides = () => {
      setTimeout(() => {
        console.log(this.state.active, "active");
        this.setState((prevState, props) => ({
          active: prevState.active === 5 ? 1 : prevState.active + 1
        }));
        runSlides();
      }, 2200);
    };
    runSlides();
  }

  render() {
    const state = this.state;
    return (
      <div className="slide-container">
        {state.slides.map(slide => {
          return (
            <img
              key={slide.id}
              className={this.checkClassActive(slide.id)}
              src={slide.img}
              alt="slide image"
            />
          );
        })}
        <div className="slide-controls">
          {state.slides.map(slide => {
            return (
              <button
                key={slide.id}
                className={this.checkControlActive(slide.id)}
                onClick={() => this.changeActiveSlide(slide.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

{
  /* {this.state.slides.map(slide => {
          return (
            <div key={slide.id}>
              <img class="slide" src={slide.img} />
            </div>
          );
        })} */
}
