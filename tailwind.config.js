/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glowing: {
          "0%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "400% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        sparkle: {
          "0%, 100%": { textShadow: "0 0 5px #ff0, 0 0 10px #f0f, 0 0 20px #0ff" },
          "50%": { textShadow: "0 0 15px #f00, 0 0 25px #ff0, 0 0 35px #0f0" },
        },
      },
      animation: {
        glowing: "glowing 20s linear infinite",
        sparkle: "sparkle 2s infinite",
      },
    },
  },
  plugins: [],
};
