import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTrail, useSprings, useSpring, animated, config } from '@react-spring/three'
import Slider from './Slider';

function MyRotatingBox() {
	const myMesh = React.useRef();
	const [active, setActive] = useState(false);

	const { scale } = useSpring({
		scale: (active ? 3 : 2),
		config: config.wobbly,
	})

	const test = () => {
		console.log('eh', !active);
		setActive(!active)
	};

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime();
		//if (active)
		if (!pause)
			if (start)
				myMesh.current.rotation.x = a / 10;
	});

	return (
		<animated.mesh

			position={[-2, 0, 0]}
			scale={scale}
			onPointerUp={() => {
				test();
				if (active === false) {
					//stop();
					//console.log(set);
					//set(index => ({ scale: 3 }))
				}
			}}
			ref={myMesh}
		>
			<boxBufferGeometry />
			<meshPhongMaterial color="royalblue" />
		</animated.mesh>
	);
}

let start = false;
const items = ["Item1", "Item2", "Item3", "Item4"];
function Trail({ trail, api }) {
	const [toggle, set] = useState(true);
	// const trail = useTrail(items.length, {
	// 	config: config.Wobbly,

	// 	from: { opacity: 1, x: 0, y: 0, scale: 1, height: 10 },
	// 	to: { opacity: 1, x: 5, y: 0, scale: 2, height: 25 }
	// });

	// Update trail
	// Stop trail
	//api.stop();`

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime();

	});

	return (
		<>
			{trail.map(({ x, height, ...rest }, index) => {
				//console.log(x.get());
				return (
					<animated.mesh onPointerUp={(x) => {
						//set(state => !state);
						//console.log(x);
						return;
					}}
						key={items[index]}
						className="trails-text"

						position={x.to(x => [index % 2 === 0 ? x : -x, 0, 0])}
						scale={x.interpolate({

							range: [0, 1], output: [1, 2],
						})}
						style={{
							// ...rest,
							// transform: x.interpolate(x => {
							// 	console.log(x);
							// 	return `translate3d(0,${x}px,0)`
							// })
						}}
					>
						<boxBufferGeometry />
						<meshPhongMaterial color="red" />
						{/* <animated.div style={{ height }}>{items[index]}</animated.div> */}
					</animated.mesh>
				)
			})}
		</>
	);
}


let debounceTime = 0;
let percentageTime = 0;
let pause = false;
let cc = {
	// ...config.Wobbly,
	duration: 100,
	mass: 1,
};
let b = { opacity: 1, x: 5, y: 0, scale: 0.5, height: 10 };
let a = { opacity: 1, x: 0, y: 0, scale: 1, height: 25 };
let s = 1;
let count = 1;
let interval = false;
function Room() {

	let animationEnd = false;
	let startTime = 0;
	let endTime = 0;
	const [value, setValue] = useState(0);

	const [trail, api] = useTrail(items.length, (index) => ({
		config: cc,
		from: a,
		loop: { reverse: true },
		// reset: true,
		onRest: (i) => {
			console.log('onRest', startTime - endTime);
			if (items.length - 1 === index) {
				endTime = new Date().getTime();
				console.log(index);
				start = false;
				animationEnd = true;
				setValue(100);
			}
		},
		// 	console.log('rest', count, s, api);
		// 	count++;
		// 	s = -s;
		// 	if (s)
		// 		api.start({ to: a });
		// 	else
		// 		api.start({ to: b });
		// 	console.log(count);
		// },
	}))

	const testFrame = () => {
		// if (percentage < 100) {
		if (animationEnd)
			return;
		setTimeout(() => {
			setValue(v => {
				if (v < 100)
					return v + 1;
			});
			testFrame();
		}, cc.duration / 60);
		// setValue(v => {
		// 	if (v < 100)
		// 		return v + 1;
		// });
		api.resume();


		if (percentageTime < 100) {
			percentageTime++;
		}
		//console.log('percentageTime', Math.round(100 * (percentageTime * 3.5) / 200) / 100);

		// requestAnimationFrame(testFrame);
		return;
		// setPercentage(value => value + 1);
		//setPercentage(0);
		// } else {
		// interval = false;
		//	return;
		// }

	};
	api.pause();
	return (
		<>

			<div style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, width: '100%', height: '48px', overflow: 'hidden' }}>

				<button onClick={() => {
					start = true;
					setValue(v => {
						return 0;
					});
					testFrame();
					startTime = new Date().getTime();
					api.start({ ...trail, from: a, to: b });
					api.resume();
					// interval = setInterval(() => {
					// 	setValue(value => {

					// 		if (value > 100) {
					// 			clearInterval(interval);
					// 		}
					// 		return value + 1;
					// 	});
					// }, 1);

					return;
				}}>Start</button>

				<button onClick={async () => {
					// start = true;
					api.resume();
					startTime = new Date().getTime();
					api.start({ ...trail, from: a, to: b, loop: { reverse: true } });
					return;
				}}>Loop</button>

				<button onClick={(t) => {

					// if (start) {
					console.log(pause ? 'resume' : 'pause');
					pause ? api.resume() : api.pause();
					pause = !pause;
					t.currentTarget.innerText = pause ? 'Resume' : 'Pause';
					// }
				}}  >{pause ? 'Resume' : 'Pause'}</button>

				<Slider percentage={value} />
			</div>
			<Canvas>

				<ambientLight />
				{/* <MyRotatingBox /> */}
				<Trail trail={trail} />
				<pointLight position={[10, 10, 10]} />
				{/* <Box position={[-1.2, 0, 0]} /> */}
				{/* <Box position={[1.2, 0, 0]} /> */}




			</Canvas>

		</>
	);
}

export default Room;