import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	const properties = await getListings({ userId: currentUser.id });

	if (properties.length === 0) {
		return (
			<EmptyState
				title="No properties found"
				subtitle="Looks like you have no properties on your properties."
			/>
		);
	}

	return (
		<PropertiesClient properties={properties} currentUser={currentUser} />
	);
};

export default PropertiesPage;
