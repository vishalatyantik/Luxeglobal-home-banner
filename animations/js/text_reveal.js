import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default class TextAnim {
  constructor(el) {
    this.DOM = { el: el };

    this.textEl = [...this.DOM.el.querySelectorAll('[data-text-anim] span')];

    this.init();
  }


  init() {

    const animateFrom = (elem, direction) => {
      direction = direction || 1;
      let x = 0;
      let y = 100;
      elem.style.transform = "translate(0, " + y + "%)";
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
      gsap.set(elem, { y: "100%", autoAlpha: 0, delay: 0.2});
    }

    gsap.utils.toArray(this.textEl).forEach(function(elem) {
      hide(elem);
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
