import React from 'react';
import styles from "./Button.css";

const Button = ({ children }) => {
	return (
		<button className={styles.primary}>
			{children}
		</button>
	);
};

export default Button;