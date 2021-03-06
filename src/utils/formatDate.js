const formatDate = (dateToFormat) => {
	const date = new Date(dateToFormat);
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	  ];

	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();

	  return day + " " + monthNames[monthIndex] + " " + year;
};

export default formatDate;