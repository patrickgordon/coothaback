import formatTime from "./formatTime";

it("should format minutes and seconds with a leading 0 if it is less than 10", () => {
	const seconds = 65;
	expect(formatTime(seconds)).toBe("01 minutes 05 seconds");
});

it("should format minutes and seconds without a leading zero if it is greater than 10", () => {
	const seconds = 610;
	expect(formatTime(seconds)).toBe("10 minutes 10 seconds");
});