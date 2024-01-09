import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img
					id="inputImage"
					src={imageUrl}
					alt=""
					width="500px"
					height="auto"
				/>
				<div
					className="bounding-box"
					style={
						{
							// top: box.box.topRow,
							// right: box.box.rightCol,
							// left: box.box.rightCol,
							// bottom: box.box.bottomRow,
						}
					}
				></div>
			</div>
		</div>
	);
};

export default FaceRecognition;
