/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      {
        server: false,
        path: 'apollo.js'
      }
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5'
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font' // optional, you are not bound to it
      // 'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'svg-mdi-v5', // Quasar icon set
      lang: 'pt-br',

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      importStrategy: 'auto',

      // components: [
      //   'Me'
      // ],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Cookies',
        'Meta'
      ]
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',

      env: ctx.dev
        ? {
          HOST: 'https://localhost:8080'
        }
        : {
          HOST: 'https://api-eu-central-1.graphcms.com/v2/ckeaaihsn4nrp01z2apov729w/master'
        },

      extendWebpack (cfg, { isServer, isClient }) {
        cfg.module.rules.push({
          test: /\.(gql|graphql)$/,
          loader: 'graphql-tag/loader'
        })

        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      port: process.env.PORT || 8080,
      disableHostCheck: true,
      proxy: [
        {
          context: [
            '/graphql',
            '/rest',
            '/media',
            '/pub'
          ],
          target: 'https://api-eu-central-1.graphcms.com/v2/ckeaaihsn4nrp01z2apov729w/master',
          changeOrigin: true
        }
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true,
      manualHydration: true,

      // -- @quasar/app v1.9.5+ --
      // optional; add/remove/change properties
      // of production generated package.json
      extendPackageJson (pkg) {
        // directly change props of pkg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; webpack config Object for
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      extendWebpack (cfg) {
        // directly change props of cfg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; EQUIVALENT to extendWebpack() but uses webpack-chain;
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      chainWebpack (chain) {
        // chain is a webpack-chain instance
        // of the Webpack configuration
      }
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Marcos Vinicius',
        short_name: 'Marcos Vinicius',
        description: 'My personal website',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      metaVariables: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        appleTouchIcon120: 'icons/apple-icon-120x120.png',
        appleTouchIcon180: 'icons/apple-icon-180x180.png',
        appleTouchIcon152: 'icons/apple-icon-152x152.png',
        appleTouchIcon167: 'icons/apple-icon-167x167.png',
        appleSafariPinnedTab: 'icons/safari-pinned-tab.svg',
        msapplicationTileImage: 'icons/ms-icon-144x144.png',
        msapplicationTileColor: '#000000'
      },

      // (@quasar/app v1.6.2+)
      // Optional, overrides metaVariables above;
      // Use this OR metaVariables, but not both;
      metaVariablesFn (manifest) {
        // ...
        return [
          {
            // this entry will generate:
            // <meta name="theme-color" content="ff0">

            tagName: 'meta',
            attributes: {
              name: 'theme-color',
              content: '#ff0'
            }
          },

          {
            // this entry will generate:
            // <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180.png">
            // references /public/icons/icon-180.png

            tagName: 'link',
            attributes: {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: 'icons/icon-180.png'
            },
            closeTag: false // this is optional;
            // specifies if tag also needs an explicit closing tag;
            // it's Boolean false by default
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'tem-lives-front'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
