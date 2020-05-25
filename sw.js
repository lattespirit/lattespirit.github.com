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
    "url": "webpack-runtime-f016f83480bbd7143417.js"
  },
  {
    "url": "styles.93b23f2aed3730bc4f43.css"
  },
  {
    "url": "styles-dd3841a4888192e20843.js"
  },
  {
    "url": "framework-36f018ee4baead1d03ed.js"
  },
  {
    "url": "app-9d823f5094eb94364aa9.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "001e8762e378b405ed092a4afbd6f83d"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-e8e7fbb006d57d32ed40.js"
  },
  {
    "url": "5b79e896b618fe7d2d330e48db9e912c461e4acf-55de140766d103fac6a5.js"
  },
  {
    "url": "c95c644e68d489c17fc52f7015e6a80467fec12f-bc5726fbd3dceb402a5d.js"
  },
  {
    "url": "27ab0d7b1e741184e98a84f40aa8aa14ca8f8839-c86cce104b349e9b8afe.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-bdb04690bf5406d7482e.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "d89c35c2da888e1c0245ec55619d3ff9"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "412fdd9c8dc64aa2ba8215fdb70e0ee2"
  },
  {
    "url": "component---src-pages-archives-js-48966eefaaad85875120.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "fdaccc6278e536e6a79a9a2b18f053ec"
  },
  {
    "url": "component---src-pages-testimonials-js-4bac1409fe5778cdd74a.js"
  },
  {
    "url": "page-data/testimonials/page-data.json",
    "revision": "23c98026f34a55cf4b10b1c4dde26225"
  },
  {
    "url": "component---src-pages-uses-js-a61a888b244de9a3c353.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "dd41a649f8c9e9b3a33e1e42c628a668"
  },
  {
    "url": "22cb1846e3999e987bb520b28b168c77b899e222-89311591a03167c4c095.js"
  },
  {
    "url": "component---src-pages-about-js-4b287e61652e0227d167.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "2a3749b5191ff109f5612e1d4eb6ab7a"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "1cd19c9004b81792f9d42000d258fadb"
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
  if (!resources || !(await caches.match(`/app-9d823f5094eb94364aa9.js`))) {
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
