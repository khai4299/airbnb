"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
	properties: SafeListing[];
	currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
	properties,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onDelete = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success("Listing deleted");
					router.refresh();
				})
				.catch(error => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Properties" subtitle="List of your properties" />
			<div
				className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
			>
				{properties.map((property: any) => (
					<ListingCard
						key={property.id}
						data={property}
						actionId={property.id}
						onAction={onDelete}
						disabled={deletingId === property.id}
						actionLabel="Delete property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
