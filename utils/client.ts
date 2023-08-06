import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "t0pze2mn",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
