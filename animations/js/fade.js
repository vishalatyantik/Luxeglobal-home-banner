import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class FadeAnim {
  constructor(el) {
    this.DOM = { el: el };

    this.init();
  }


  init() {

    const animateFrom = (elem, direction) => {
      direction = direction || 1;
      let x = 0;
      let y = 100;
      elem.style.transform = "translate(0, " + y + "px)";
      elem.style.opacity = "0";
      elem.style.willChange = "transform";
      gsap.fromTo(elem, {
        y: y,
        autoAlpha: 0,
      }, {
        duration: 2,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
      });
    }

    const hide = (elem) => {
      gsap.set(elem, { y: 100, autoAlpha: 0, delay: 0.2});
    }

    gsap.utils.toArray(this.DOM.el).forEach(function(elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
      ScrollTrigger.create({
        trigger: elem,
        once: true,
        onEnter: function () { animateFrom(elem); },
        // onEnterBack: function () { animateFrom(elem, -1); console.log('onEnterBack') },
        // onLeave: function() { hide(elem) },
        // onLeaveBack: function() { hide(elem) }
      });
    });

  }
}
