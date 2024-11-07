import { client } from "@/sanity/lib/client";
import NGOCard, { NGOCardType } from "./NGOCard";
import { NGOS_BY_AUTHOR_QUERY } from "@/sanity/lib/query";

const UserNgos = async ({ id }: { id: string }) => {
  const ngos = await client.fetch(NGOS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {ngos.length > 0 ? (
        ngos.map((ngo: NGOCardType) => <NGOCard key={ngo._id} post={ngo} />)
      ) : (
        <p className="no-result">No NGOs Posted By This User Yet</p>
      )}
    </>
  );
};

export default UserNgos;
