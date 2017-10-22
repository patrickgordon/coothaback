import React from "react";

const IconWrapped = ({ children }) => {
	return (
		<span className="fa-layers fa-fw" style={{ marginRight: "10px" }}>
			<i className="fal fa-circle" data-fa-transform="grow-12"></i>
			{children}
		</span>
	);
};

export default IconWrapped;