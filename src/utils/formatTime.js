const formatTime = (secondsToConvert) => {
	var hours = Math.floor(secondsToConvert / 3600);
	var minutes = Math.floor((secondsToConvert - (hours * 3600)) / 60);
	var seconds = secondsToConvert - (hours * 3600) - (minutes * 60);

	if (minutes < 10) { minutes = "0"+minutes; }
	if (seconds < 10) { seconds = "0"+seconds; }
	return `${minutes} minutes ${seconds} seconds`;
};

export default formatTime;