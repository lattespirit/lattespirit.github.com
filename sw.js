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
    "url": "webpack-runtime-7cf416ae30538f2d3bfe.js"
  },
  {
    "url": "styles.0eaa60859f10fbe77d1d.css"
  },
  {
    "url": "styles-21983e83ba48ed508b4c.js"
  },
  {
    "url": "commons-c4d1a5be80b17078e811.js"
  },
  {
    "url": "app-b97e74883d503b09bd30.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "1ec05193a3e4cb59f70faf5adca3aeef"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-64c7e44b9575562e9b76.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-0ec9c22ee2de87f1405e.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "f7da249bdfba73f31174d4e83f7b4acf"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "a1889dec18de6364ba630b45851cbf6e"
  },
  {
    "url": "component---src-pages-archives-js-91c14611d82a90508c13.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "f1ca9c57c0e61b3ac9fa41cdad5fa8e9"
  },
  {
    "url": "component---src-pages-testimonials-js-07aac02dd97c0dc22f60.js"
  },
  {
    "url": "page-data/testimonials/page-data.json",
    "revision": "23c98026f34a55cf4b10b1c4dde26225"
  },
  {
    "url": "component---src-pages-uses-js-ea784a1b435a5b905725.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "22b895fe5d4ad311c0abb049a157a17b"
  },
  {
    "url": "component---src-pages-about-js-bb1254337e478d44db11.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "3ddd5d51b095997b4d473ef99898912f"
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
  if (!resources || !(await caches.match(`/app-b97e74883d503b09bd30.js`))) {
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
