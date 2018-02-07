const settings = {
  js: {
    entries: "./src/js/App.tsx",
    buildFileName: "bundle.js",
    buildDir: "./public/js/",
    errorMsg: "----js error----"
  },
  css: {
    src: "./src/scss/main.scss",
    build: "./public/css/"
  },
  img: {
    src: "./src/img/*.*",
    build: "./public/img/"
  },
  fonts: {
    src: "./src/fonts/*.*",
    build: "./public/fonts/"
  },
  media: {
    src: "./src/media/*.*",
    build: "./public/media/"
  },
  watch: {
    js: [
      "./src/js/**/*.jsx",
      "./src/js/**/*.js",
      "./src/js/**/*.ts",
      "./src/js/**/*.tsx"
    ],
    css: "./src/**/*.scss",
    fonts: "./src/fonts/*.*",
    img: "./src/img/*.*",
    media: "./src/media/*.*",
    browserSync: "./public/**/*.*"
  },
  server: {
    baseDir: "./public"
  }
};

export default settings;
