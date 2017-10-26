import { schema } from "normalizr";

const athlete = new schema.Entity("athletes");
const activity = new schema.Entity("activities");
const segment = new schema.Entity("segments");

const effort = new schema.Entity("efforts", {
	athlete,
	activity,
	segment
});

export const effortList = new schema.Array(effort);

const group = new schema.Entity("groups");
export const groupList = new schema.Array(group);

export const authentication = new schema.Entity("authentication", { athlete }, { idAttribute: "accessToken" } );
