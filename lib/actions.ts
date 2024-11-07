"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createNGO = async (
  state: any,
  form: FormData,
  description: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "You are not currently signed in!",
      status: "ERROR",
    });

  const { title, bio, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "description")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const ngo = {
      title,
      bio,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      description,
    };

    const result = await writeClient.create({ _type: "ngo", ...ngo });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
