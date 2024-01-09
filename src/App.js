import { React, useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";

function App() {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [box, setBox] = useState({});
	const [route, setRoute] = useState("SignIn");
	const [isSignedIn, setSignIn] = useState(false);

	const calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		setBox({ box });
	};

	const onInputChange = (event) => {
		// event = event.target.value;
		setInput(event.target.value);
	};

	const onSubmit = () => {
		setImageUrl(input);

		const returnClarifaiRequestOptions = (imageUrl) => {
			// Your PAT (Personal Access Token) can be found in the portal under Authentification
			const PAT = "f30c49892b4e4d849489f7db7b7c657b";
			// Specify the correct user_id/app_id pairings
			// Since you're making inferences outside your app's scope
			const USER_ID = "clarifai";
			const APP_ID = "main";
			// Change these to whatever model and image URL you want to use
			// const MODEL_ID = "face-detection";
			const IMAGE_URL = imageUrl;

			const raw = JSON.stringify({
				user_app_id: {
					user_id: USER_ID,
					app_id: APP_ID,
				},
				inputs: [
					{
						data: {
							image: {
								url: IMAGE_URL,
								// "base64": IMAGE_BYTES_STRING
							},
						},
					},
				],
			});

			return {
				method: "POST",
				headers: {
					Accept: "application/json",
					Authorization: "Key " + PAT,
				},
				body: raw,
			};
		};

		fetch(
			"https://api.clarifai.com/v2/models/",
			"face-detection",
			"/outputs",
			returnClarifaiRequestOptions(input)
		)
			.then((response) => response.json())
			.then((responseData) =>
				displayFaceBox(calculateFaceLocation(responseData))
			)
			.catch((error) => console.log("error", error));
	};

	const onRouteChange = (route) => {
		if (route === "SignOut") {
			setSignIn(false);
		} else if (route === "Home") {
			setSignIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<>
				<ParticlesBg type="cobweb" bg={true} className="particles" />
			</>
			<Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
			{route === "Home" ? (
				<div>
					<Logo />
					<Rank />
					<ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === "SignIn" ? (
				<SignIn onRouteChange={onRouteChange} />
			) : (
				<Register onRouteChange={onRouteChange} />
			)}
		</div>
	);
}

export default App;
