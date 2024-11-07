import React from "react";
import Ping from "./Ping";
import { Eye } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { unstable_after as after } from "next/server";
import { NGOS_VIEWS_QUERY } from "@/sanity/lib/query";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(NGOS_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-bold flex items-center gap-3 font-montserrat">
          <Eye size={18} />
          {totalViews}
        </span>
      </p>
    </div>
  );
};

export default View;
