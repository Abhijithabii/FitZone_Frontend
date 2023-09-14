const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#0f7796",
        "light-white": 'rgba(255,255,255,0.18)'
      }
    },
  },
  plugins: [],
});




