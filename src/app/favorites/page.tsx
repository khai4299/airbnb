import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";

import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	const listings = await getFavorites();

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No reservations found"
				subtitle="Looks like you have no reservations on your properties."
			/>
		);
	}

	return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
