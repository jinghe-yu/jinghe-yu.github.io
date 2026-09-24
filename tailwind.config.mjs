// Theme extracted from Stitch. Keep v3 for the original class semantics.
export default {
  content: ["./src/**/*.{astro,html,js,ts,json}"],
  ...{
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          surface: "#f9f9fa",
          "surface-dim": "#dadadb",
          "surface-container-lowest": "#ffffff",
          "surface-container-low": "#f3f3f4",
          "surface-container": "#eeeeef",
          "surface-container-high": "#e8e8e9",
          primary: "#141414",
          "on-primary": "#ffffff",
          secondary: "#72575e",
          "secondary-container": "#F8D4DC",
          "on-secondary-fixed": "#2a161c",
          "outline-border": "#d2d2d6",
          "on-surface": "#141414",
          "on-surface-variant": "#525254",
        },
        fontFamily: {
          headline: ["Hanken Grotesk Variable", "sans-serif"],
          body: ["Inter Variable", "sans-serif"],
          mono: ["Space Mono", "monospace"],
        },
      },
    },
  },
};
