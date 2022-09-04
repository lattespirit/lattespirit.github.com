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
    "url": "webpack-runtime-90d620757bf6945875c4.js"
  },
  {
    "url": "styles.4a4c1428ade87836d24d.css"
  },
  {
    "url": "framework-0aa881bb88c30dc70516.js"
  },
  {
    "url": "app-717ec1c988e12a3f1f68.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "731488604363f7a85b55e740bd899904"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-d43486f4682974eb15fc.js"
  },
  {
    "url": "polyfill-701a924871900654374c.js"
  },
  {
    "url": "30d759858598de216411963693bede4f6c1ce5cb-a8f78a0d19b027e23192.js"
  },
  {
    "url": "c95c644e68d489c17fc52f7015e6a80467fec12f-ef3e8637ad630b74c70b.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-3bb79c1a6b195f72866a.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "a05f2bc15c4b62c561fcd1ac2f36c4f2"
  },
  {
    "url": "page-data/sq/d/2523741585.json",
    "revision": "45e394d8a53d17898390cc9e14d77c56"
  },
  {
    "url": "page-data/sq/d/3159585216.json",
    "revision": "3b576134a91d99570e96f3ccc0a3e10b"
  },
  {
    "url": "page-data/sq/d/481765890.json",
    "revision": "1dab1b66ed0d77dc2c18a70f5cda8d84"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "44f010caa76280ab031eefac82db6023"
  },
  {
    "url": "component---src-pages-archives-js-2b990b553197e40dc2a5.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "7cc487765da8ad604a0d350ed95092cb"
  },
  {
    "url": "31590f23a14307ce625c9098e1695ed312c55a1f-813bc1cb771a7d8715dd.js"
  },
  {
    "url": "component---src-pages-testimonials-js-c880ea4b83967f7f0cf8.js"
  },
  {
    "url": "page-data/testimonials/page-data.json",
    "revision": "4325de077d77c939d54d86cdcabb9114"
  },
  {
    "url": "page-data/sq/d/3469867935.json",
    "revision": "a1d3ba847055e8f6f6e083e36cf9f4de"
  },
  {
    "url": "component---src-pages-uses-js-733e179d4cbb8ec36473.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "b0ed391f609611b4effd93b97ba2eb21"
  },
  {
    "url": "22cb1846e3999e987bb520b28b168c77b899e222-0b7a6ed86c591abfa0ff.js"
  },
  {
    "url": "component---src-pages-about-js-4145dd96d5919bb5741c.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "9dab0ce4d7761702b6594b5f8665a5c8"
  },
  {
    "url": "page-data/sq/d/3615814042.json",
    "revision": "2452561bf87d3c6c28adfafcfb5f8a7f"
  },
  {
    "url": "page-data/sq/d/958598658.json",
    "revision": "8a4c963165eaa2d8baefb1db5108e7d7"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "613cedb79a3cda6b498234bef05016ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

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
  if (!resources || !(await caches.match(`/app-717ec1c988e12a3f1f68.js`))) {
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
