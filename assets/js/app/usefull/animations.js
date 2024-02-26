//Libraries
import anime from 'animejs';
import 'waypoints/lib/noframework.waypoints.min.js';

class Animations {
	constructor() {
		this.modules = document.querySelectorAll('.module');
	}

	init() {
		this.modules.forEach((module, i) => {
			module.waypoint = new Waypoint({
				element: module,
				handler: function (direction) {
					anime({
						targets: module,
						opacity: [0, 1],
						translateY: [100, 0],
						easing: 'easeOutQuad',
						delay: anime.stagger(100)
					});
					this.destroy();
				},
				offset: "90%",
			});
		});
	}
}

const animations = new Animations;
export default animations;

