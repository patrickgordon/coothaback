import React from "react";

import Icon from "../../ui/Icon";
import IconWrapped from "../../ui/IconWrapped";

import styles from "./EffortIcons.css";

const EffortIcons = ({ watts, heartRate, cadence }) => {
	if (!watts && !heartRate && !cadence) { return null; }

	const roundedWatts = watts && Math.round(watts);
	const roundedHeartRate = heartRate && Math.round(heartRate);
	const roundedCadence = cadence && Math.round(cadence);

	return (
		<div className={styles.icons}>
			{roundedWatts &&
			<div>
				<IconWrapped>
					<Icon iconName="bolt" />
				</IconWrapped>
				{roundedWatts}
			</div>
			}
			{roundedHeartRate &&
			<div>
				<IconWrapped>
					<Icon iconName="heartbeat" />
				</IconWrapped>
				{roundedHeartRate}
			</div>
			}
			{roundedCadence &&
			<div>
				<IconWrapped>
					<Icon iconName="repeat" />
				</IconWrapped>
				{roundedCadence}
			</div>
			}
		</div>
	);
};

export default EffortIcons;