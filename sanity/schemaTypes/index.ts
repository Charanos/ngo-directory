import { ngo } from "./ngo";
import { author } from "./author";
import { playlist } from "./playlist";
import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, ngo, playlist],
};
