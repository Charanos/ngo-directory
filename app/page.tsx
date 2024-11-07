import { auth } from "@/auth";
import { NGOS_QUERY } from "@/sanity/lib/query";
import SearchForm from "@/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import NGOCard, { NGOCardType } from "@/components/NGOCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: NGOS_QUERY, params });

  return (
    <>
      <section className="hero_container">
        <h1 className="heading">Find Every NGO Making a Difference in Kenya</h1>

        <p className="capitalize sub-heading !max-w-3xl ">
          Your Complete Directory of Kenyan Non-Profits and Their Impact
          Stories. Discover, Collaborate, and Transform Communities Through Our
          Digital Directory
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-medium font-montserrat">
          {query ? `Search results for "${query}"` : "All NGOs"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: NGOCardType, index: number) => (
              <NGOCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results uppercase">no ngos found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
