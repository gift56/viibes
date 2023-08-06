import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rluex9u5",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
