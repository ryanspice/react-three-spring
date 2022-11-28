
import React, { useEffect, useRef, useState } from 'react'
const Slider = (props) => {
	console.log(props);
	const [percentage, setPercentage] = useState(props?.percentage || 0);

	function onInput(e) {
		setPercentage(e.target.value);
		e.stopPropagation();
	}

	useEffect(() => {
		setPercentage(props?.percentage || 0);
	}, [props?.percentage]);


	return (
		<>
			<br />
			<input type="range" min="0" max="100" value={percentage || 100} id="slider" onInput={onInput} />
		</>
	)
}
export default Slider