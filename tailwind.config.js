/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 12px 28px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
