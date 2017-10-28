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

const entry = new schema.Entity("entries", {}, { idAttribute: "effortId" });
const entryList = new schema.Array(entry);

export const leaderboard = new schema.Entity("leaderboard", {
	entries: entryList
}, {
	idAttribute: value => value.clubId ? value.clubId : "following"
});


const club = new schema.Entity("clubs");
export const clubList = new schema.Array(club);

export const authentication = new schema.Entity("authentication", { athlete }, { idAttribute: "accessToken" } );
