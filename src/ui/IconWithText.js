import React from "react";

const IconText = ({ text, children }) => {
	return (
		<span className="fa-layers">
			{children}
			<span className="fa-layers-text" data-fa-transform="shrink-8 up-3 right-1">
				{text}
			</span>
		</span>
	);
};

export default IconText;