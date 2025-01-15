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
    "url": "webpack-runtime-124c5c0191144788ac80.js"
  },
  {
    "url": "styles.4fcf45770dcf3b6e99fc.css"
  },
  {
    "url": "framework-0aa881bb88c30dc70516.js"
  },
  {
    "url": "app-a6bf0b80165dc743744f.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "91309db212e700672b170b772485122f"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-d43486f4682974eb15fc.js"
  },
  {
    "url": "30d759858598de216411963693bede4f6c1ce5cb-2b9f907869d2facdd2fd.js"
  },
  {
    "url": "c95c644e68d489c17fc52f7015e6a80467fec12f-06900c7cc14e07411369.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-0568df0cd1a44e22a19d.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "50f22862b55c20da79654143745a6bc7"
  },
  {
    "url": "page-data/sq/d/2523741585.json",
    "revision": "a0b4b77dfff33fa2e366467cb7aedfb0"
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
    "revision": "0fb531208a0a0823bbc73b1a6bc4b5a8"
  },
  {
    "url": "component---src-pages-archives-js-e71db0e2109bef363024.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "799244cdc277f4a51ebd84ba0654404d"
  },
  {
    "url": "31590f23a14307ce625c9098e1695ed312c55a1f-813bc1cb771a7d8715dd.js"
  },
  {
    "url": "component---src-pages-testimonials-js-811a60bbfa63b3d610cb.js"
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
    "url": "component---src-pages-uses-js-66fa8aa7450395178f15.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "61e53c7f450cb6429c6e41d53e9655d2"
  },
  {
    "url": "22cb1846e3999e987bb520b28b168c77b899e222-378ad4a51eb8fb572082.js"
  },
  {
    "url": "component---src-pages-about-js-35c76968ac240eab9c55.js"
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
    "revision": "ef1ac35700f0a41d830b04f1d35325cc"
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
  if (!resources || !(await caches.match(`/app-a6bf0b80165dc743744f.js`))) {
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
