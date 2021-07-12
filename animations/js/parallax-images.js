import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { getRandomNumber, findParentBySelector } from './utils';

export default class ParallaxAnim {
  constructor(el) {
    this.DOM = { el: el };

    this.items = this.DOM.el.querySelectorAll('img');

    this.selector = "section";
    this.parent = findParentBySelector(this.DOM.el, this.selector);

    // console.log(this.parent);

    this.init();
  }


  init() {

    let parent = this.parent;

    this.items.forEach((elem, i) => {
      gsap.set(elem, { y: gsap.utils.random(-20, 100), force3D: true });
      gsap.to(elem, {
        duration: gsap.utils.random(0.5, 0.75),
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: this.parent,
          scrub: true
        }
      })
    })


  }
}
