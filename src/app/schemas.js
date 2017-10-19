import { schema } from "normalizr";

const athlete = new schema.Entity("athletes");
const activity = new schema.Entity("activities");
const segment = new schema.Entity("segments");

const effort = new schema.Entity("efforts", {
	athlete,
	activity,
	segment
})

export const effortList = new schema.Array(effort);