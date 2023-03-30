/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, //we need change to false ,because the videos run 2 by 2 in development mode, while in production mode that problem does not happen
  images: {
    domains: [
      "localhost",
      "bootcamp-alfredo.s3.amazonaws.com",
      "bootcamp-alfredo.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
