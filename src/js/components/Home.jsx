import React from "react";
import {useEffect} from "react";
import {createUser} from "../Services/API"
//include images into your bundle

//create your first component
const Home = () => {
	useEffect(() => {createUser("newValuexd2345")}, [])
	return (
		<div className="text-center">
        
		</div>
	);
};

export default Home;