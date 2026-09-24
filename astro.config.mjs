import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  // A repository named <username>.github.io publishes from / on that domain.
  // GitHub Actions supplies the owner name; local development needs no site URL.
  site: process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER.toLowerCase()}.github.io`
    : undefined,
});
