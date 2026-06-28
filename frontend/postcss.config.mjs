/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "tailwindcss/nesting": {},
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
