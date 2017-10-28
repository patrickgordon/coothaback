import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Card from "../../ui/Card";
import ClubHeader from "../components/ClubHeader";
import { fetchClubs as fetchClubsAction } from "../clubsActions";
import { getMappedClubs } from "../clubsSelectors";

export class ClubsList extends Component {
	componentDidMount() {
		const { actions: { fetchClubs } } = this.props;
		fetchClubs();
	}

	renderClubs = () => {
		const { clubs } = this.props;
		return clubs.map(club => {
			const { id, url, name, profile } = club;

			const content = (
				<div>{name}</div>
			);

			const header = (<ClubHeader imageSrc={profile} />);

			return (
				<div key={id} className="col-4_xs-12_sm-6">
					<Card linkTo={`/clubs/${url}`} contentComponent={content} headerComponent={header} />
				</div>
			);
		});
	}

	render() {
		const { hasClubs } = this.props;

		return (
			<div className="grid">
				{!hasClubs &&
				<div className="col-12">
					<h1 data-id="noClubsHeader" style={{ margin: 0 }}>Hey, no friends! Guess what? You got no friends.</h1>
				</div>
				}
				{hasClubs && this.renderClubs()}
			</div>
		);
	}
}

export const makeMapStateToProps = (args = {}) => {
	const {	getMappedClubsFn = getMappedClubs } = args;

	const mapStateToProps = state => ({
		hasClubs: !!(state.clubs.keys.length > 0),
		clubs: getMappedClubsFn(state)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchClubs: fetchClubsAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps, mapDispatchToProps)(ClubsList);
