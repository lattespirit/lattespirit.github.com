/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-f83adbc69667d209ab65.js"
  },
  {
    "url": "styles.d96d7a8b145bfd38b599.css"
  },
  {
    "url": "styles-21983e83ba48ed508b4c.js"
  },
  {
    "url": "commons-35fa202102da6fc99a00.js"
  },
  {
    "url": "app-a316c5eda525d17e48ad.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "8845577b1d110d7cecaf2190e6127df2"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-64c7e44b9575562e9b76.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-c21500faa7dc1d51de66.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "ccd584812a105f06992be0a919fda6e5"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "f9df22d3e53bb69a926516f09bce323b"
  },
  {
    "url": "component---src-pages-archives-js-91c14611d82a90508c13.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "221ce0da163c377bab0de51afa7b64ee"
  },
  {
    "url": "component---src-pages-testimonials-js-07aac02dd97c0dc22f60.js"
  },
  {
    "url": "page-data/testimonials/page-data.json",
    "revision": "23c98026f34a55cf4b10b1c4dde26225"
  },
  {
    "url": "component---src-pages-uses-js-bece7cfa98c9cc86d940.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "399ccb4f93a8498e413caf1840a5a94e"
  },
  {
    "url": "component---src-pages-about-js-ef811d8828026f8b33dc.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "2a3749b5191ff109f5612e1d4eb6ab7a"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "5bc884293a50ffea04d9c816c6be2609"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-a316c5eda525d17e48ad.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
