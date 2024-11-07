import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import View from "@/components/View";
import markdownit from "markdown-it";
import { FormatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";
import { NGOS_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/query";
import NGOCard, { NGOCardType } from "@/components/NGOCard";

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(NGOS_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.description || "");

  return (
    <>
      <section className="hero_container">
        <p className="tag">{FormatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.bio}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto max-h-96 rounded-xl"
        />

        <div className="space-y-1 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex w-12 h-12 gap-2 items-center mb-3 relative"
            >
              <Image
                fill
                alt="avatar"
                src={post.author.image}
                className="rounded-full absolute shadow-lg"
              />
              <div className="ml-16 ">
                <p className="text-20-medium">{post.author.name}</p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-medium font-montserrat">NGO Details</h3>

          {parsedContent ? (
            <article
              className="prose max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result uppercase">no details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* EDITOR RECOMMENDED NGOs  */}
        {editorPosts?.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <p className="text-30-medium">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: NGOCardType, i: number) => (
                <NGOCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
