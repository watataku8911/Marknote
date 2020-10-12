module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Marknote",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/html5reset-1.6.1.css" },
      { rel: "stylesheet", href: "/css/marked.css" },
      { rel: "stylesheet", href: "/css/style.css" },

      //google fonts
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=M+PLUS+1p"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Kaushan+Script"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Bad+Script|Kaushan+Script"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200&display=swap"
      }
      //{ rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Marvel:700' },
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "404error",
        path: "*",
        component: resolve("~/pages/404.vue")
      });
    }
  }
};
