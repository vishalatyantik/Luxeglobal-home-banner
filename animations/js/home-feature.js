import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class HomeFeatureAnim {
  constructor(el) {
    this.DOM = { el: el };

    this.figure = this.DOM.el.querySelector('.img');
    this.img = this.DOM.el.querySelector('.img img');

    this.featList = this.DOM.el.querySelector('.home-feat-list-contain');
    this.featListItem = this.featList.querySelector('ul');

    // console.log(this.featListItem);

    this.scaleimg();
  }

  scaleimg() {
    let pin = this.DOM.el;
    gsap
    .timeline()
    .to(this.img, {
      scale: 1.3,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        // end: "top top",
        end: "+=" + (window.innerHeight * 2),
        scrub: true,
      }
    })
    gsap
    .timeline({
      defaults: {ease: "none"},
      scrollTrigger: {
        trigger: pin,
        scrub: true,
        end: "+=" + (window.innerHeight * 3),
        pin: true
      },
    })
    .to(this.figure, {
      width: "25vw",
      duration: 3,
    },0)
    .to(this.img, {
      duration: 3,
      x: "-25%",
    }, 0)
    .to(this.featList, {
      x: 0,
      duration: 3,
    },0)
    .fromTo(this.featListItem, {
      y: 0
    }, {
      delay: 0.5,
      duration: 3,
      y: '-200%',
    }, ">")
    .to({}, {duration: 1})
  }
}
