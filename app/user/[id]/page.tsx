import { auth } from "@/auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/query";
import UserNgos from "@/components/UserNgos";
import { Suspense } from "react";
import { NgoCardSkeleton } from "@/components/NGOCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            width={220}
            height={220}
            alt={user.name}
            src={user.image}
            className="profile_image"
          />

          <p className="text-30-medium !text-white font-montserrat mt-7 text-center">
            @{user.username}
          </p>

          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex flex-col flex-1 gap-5 lg:-mt-5">
          <p className="text-30-medium">
            {session?.id === id ? "Your" : "All"} NGOs
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<NgoCardSkeleton />}>
              {/* user ngos  */}

              <UserNgos id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
