import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className="f3">
				{"This Magic Brain will detect faces in your pictures!"}
			</p>
			<div className="center">
				<div className="center form pa4 br3 shadow-5">
					<input
						type="text"
						className="f4 pa2 w-70 center"
						onChange={onInputChange}
					/>
					<button
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
						type="submit"
						onClick={onSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
