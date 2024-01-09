import React from "react";
// import { ReactDOM } from "react-dom";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
	return (
		<Tilt className="Tilt br2 shadow-2">
			<div
				className="ma4 mt0"
				style={{
					height: "150px",
					width: "150px",
				}}
			>
				<img
					className="Tilt-inner"
					src={brain}
					alt="logo"
					height={150}
					width={150}
					style={{ paddingTop: "10px" }}
				/>
			</div>
		</Tilt>
	);
};

export default Logo;
