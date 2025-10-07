import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],

  webpack: (config) => {
    config.module.rules.push({
      enforce: "pre",
      test: /\.(fs|vs|frag|vert|glsl)$/,
      loader: ["raw-loader", "glslify-loader"],
      exclude: /node_modules/,
    });

    return config;
  },

  turbopack: {
    rules: {
      "*.{glsl,vert,frag,vs,fs}": {
        loaders: ["raw-loader", "glslify-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
