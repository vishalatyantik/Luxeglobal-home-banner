import { gsap } from 'gsap';
import { map, lerp, getMousePos, calcWinsize, getRandomNumber, findParentBySelector } from './utils';

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());


class GridItem {
	constructor(el) {
		this.DOM = { el: el };

		this.selector = '.img_wrapper';
		this.parent = findParentBySelector(this.DOM.el, this.selector);

		this.move();
	}
	// Move the items when moving the cursor
	move() {
		// Track the mouse position
		let mousepos = {x: winsize.width/2, y: winsize.height/2};
		this.parent.addEventListener('mousemove', ev => mousepos = getMousePos(ev));
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

		this.imgct = [...this.DOM.el.querySelectorAll('.img_ct')];

		this.row = [...this.DOM.el.querySelectorAll('.img_row')];

		this.items;
		this.itemsPrlx = [...this.DOM.el.querySelectorAll('img')];


		this.tl = gsap.timeline();
		this.time = getRandomNumber(60, 70);

		this.slideItems();
	}
	// Initial animation to scale up and fade in the items
	showItems(el) {
		gsap.set(el, { scale: 0.7, autoAlpha: 0 });
		// el.forEach((picture, i) => {
		// 	let img = picture.querySelector('img');
		// 	gsap.set(img, {y: getRandomNumber(-100, 100)}, 0)
		// })

		gsap
		.timeline()
		.to(el, {
			duration: 2,
			ease: 'Expo.easeOut',
			scale: 1,
			stagger: {amount: 0.6}
		}, 0)
		.to(el, {
			duration: 1,
			ease: 'Power1.easeOut',
			autoAlpha: 1,
			stagger: {amount: 0.6}
		}, "-=2.5");
	}
	slideItems() {

		gsap.utils.toArray(this.imgct).forEach((section, i) => {

			let row = section.querySelector('.img_row');
			let rowClone = row.cloneNode(true)
			section.appendChild(rowClone);

			let rowAll = [...section.querySelectorAll('.img_row')];

			let images = section.querySelectorAll('.img');

			this.showItems(images);

			let width = row.offsetWidth;

			let tl = gsap.timeline();

			gsap.set(rowAll, {willChange: "transform"})

			const startRolling = () => {

				tl.fromTo(rowAll, {
					x:"0%",
				}, {
					duration: 20,
					x:"-100%",
					ease: "none",
					repeat: -1
				},0)
				return tl;
			}

			startRolling();

			// let imagesPrlx = section.querySelectorAll('.img');

    		// gsap.utils.toArray(imagesPrlx).forEach(item => this.gridItems.push(new GridItem(item)));


		})

	}
}
