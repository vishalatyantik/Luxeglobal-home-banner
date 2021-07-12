import { gsap } from 'gsap';
import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from './utils';

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

// Track the mouse position
let mousepos = {x: winsize.width/2, y: winsize.height/2};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

class GridItem {
	constructor(el) {
		this.DOM = {el: el};
		this.move();
	}
	// Move the items when moving the cursor
	move() {
		// amounts to move in each axis
		let translationVals = {tx: 0, ty: 0};
		// get random start and end movement boundaries
		const xstart = getRandomNumber(15,60);
		const ystart = getRandomNumber(15,60);

		// infinite loop
		const render = () => {
			// Calculate the amount to move.
			// Using linear interpolation to smooth things out.
			// Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
			translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, -xstart, xstart), 0.07);
			translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, -ystart, ystart), 0.07);

			gsap.set(this.DOM.el, {x: translationVals.tx, y: translationVals.ty});
			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}
}

export default class Grid {
	constructor(el) {
		this.DOM = { el: el };
		this.grid = this.DOM.el;
		this.gridItems = [];
		this.items = [...this.DOM.el.querySelectorAll('.img')];
    this.itemsPrlx = [...this.DOM.el.querySelectorAll('.img a')];

    this.itemsPrlx.forEach(item => this.gridItems.push(new GridItem(item)));

    this.gridWidth = this.grid.offsetWidth;
    this.gridHeight = this.grid.offsetHeight;
    this.content = this.grid.previousElementSibling;
    this.contentEl = [...this.content.querySelectorAll(':scope > *')]


		this.showItems();
		this.slideItems();
	}
	// Initial animation to scale up and fade in the items
  showItems() {
    // gsap.set(this.items, { scale: 0.7, autoAlpha: 0 }, 0)
    this.items.forEach((picture, i) => {
      let xLeftPos = this.gridWidth - picture.offsetWidth / 2;
      let xRightPos = this.gridWidth - picture.offsetWidth;
      let yTopPos = this.gridHeight - picture.offsetHeight / 2;
      let yBottomPos = this.gridHeight - picture.offsetHeight;
      gsap.set(picture, {x: getRandomNumber(0, `${xRightPos*1.25}`),y: getRandomNumber(0, `${yBottomPos}`), scale: 0.7, autoAlpha: 0 }, 0)
    })
		gsap
		.timeline()
    .set(this.contentEl, { y: 30, autoAlpha: 0, willChange: "transform, opacity" }, 0)
    .to(this.contentEl, {
      duration: 2,
      ease: 'Expo.easeOut',
      y: 0,
      autoAlpha: 1,
      stagger: 0.1
    }, 0)
		.to(this.items, {
			duration: 2,
			ease: 'Expo.easeOut',
      scale: 1,
			stagger: {amount: 0.6, grid: 'auto', from: 'center'}
		}, "-=1.5")
		.to(this.items, {
			duration: 1,
			ease: 'Power1.easeOut',
			autoAlpha: 1,
			stagger: {amount: 0.6, grid: 'auto', from: 'center'}
		}, "-=2.5");
	}
	slideItems() {

    this.items.forEach((picture, i) => {

      // this.gridItems.push(new GridItem(picture));
      let gridTotalWidth = this.grid.offsetWidth + picture.offsetWidth;

			let pictureWidth = picture.offsetWidth;
			let pictureOffset = picture.offsetLeft;
			let pictureDistance = pictureWidth + pictureOffset;

			gsap
			.timeline()
			.to(picture, {
				duration: getRandomNumber(60, 70),
        x: `-=${gridTotalWidth}`,
				repeat: -1,
				ease: "none",
				modifiers: {
					x: function(x, target) {
						x = parseFloat(x);
						if(x < -pictureDistance) {
							x += gridTotalWidth;
						}
						return x + "px";
          },
				}
			}, 0);
		});

	}
}
