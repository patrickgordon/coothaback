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

const club = new schema.Entity("clubs");
export const clubList = new schema.Array(club);

export const authentication = new schema.Entity("authentication", { athlete }, { idAttribute: "accessToken" } );
