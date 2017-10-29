import kebabCase from "lodash/kebabCase";
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

const processClub = (entity) => {
	const slug = entity.url ? entity.url : kebabCase(entity.name);
	return {
		...entity,
		slug
	};
};
const club = new schema.Entity("clubs", {}, {
	processStrategy: processClub
});
export const clubList = new schema.Array(club);

export const authentication = new schema.Entity("authentication", { athlete }, { idAttribute: "accessToken" } );
