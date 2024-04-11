/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: function () {
    return [
      {
        source: "/chat",
        destination: "/",
        permanent: true,
      },

    ];
  },
};

export default nextConfig;
