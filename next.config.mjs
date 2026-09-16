/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  /*
   * GitHub Pages base path handling
   * ---------------------------------
   * If this repo is named  <username>.github.io  the site deploys at the root
   * URL (https://username.github.io) and BOTH lines below stay commented out.
   *
   * If you rename the repo to anything else, the site deploys at a subpath
   * (https://username.github.io/<repo-name>) and BOTH must be set:
   *
   *   basePath: "/<repo-name>",
   *   assetPrefix: "/<repo-name>/",
   */
};

export default nextConfig;