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
    "url": "webpack-runtime-86f602e244251881b185.js"
  },
  {
    "url": "styles.94d2b4b1b291928930d5.css"
  },
  {
    "url": "styles-7d4153d260c0197f0043.js"
  },
  {
    "url": "framework-ac9b5dbfc53b5eded77d.js"
  },
  {
    "url": "app-607c503a7810ce334e0a.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "1b35df2e0e67d14e4e736c33f55bdf81"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-fd4fb51a6fac1c18bdde.js"
  },
  {
    "url": "polyfill-15e44c607d53f6d12bcc.js"
  },
  {
    "url": "5b79e896b618fe7d2d330e48db9e912c461e4acf-c8025eff1fcb24837bc3.js"
  },
  {
    "url": "c95c644e68d489c17fc52f7015e6a80467fec12f-41368c2167f968bf0536.js"
  },
  {
    "url": "component---src-templates-paginated-posts-js-456a7dae8f233a4f37cf.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "ecbb1ba678d2702f9a732aa9f9893451"
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
    "url": "page-data/sq/d/929091981.json",
    "revision": "1113b58190f0129e4576f2992618a8e4"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "44945c9a5d2ead43b1f8c3fb6a75d7e0"
  },
  {
    "url": "component---src-pages-archives-js-6fff2107cdc313d0fe7c.js"
  },
  {
    "url": "page-data/archives/page-data.json",
    "revision": "d37c2cbea6ef0012ad2fab14c42e2c71"
  },
  {
    "url": "31590f23a14307ce625c9098e1695ed312c55a1f-3049c2d319875b7c114d.js"
  },
  {
    "url": "component---src-pages-testimonials-js-6f01647e3a850eb5a634.js"
  },
  {
    "url": "page-data/testimonials/page-data.json",
    "revision": "d4aeccb5863af535c36f3d42f7021481"
  },
  {
    "url": "page-data/sq/d/3469867935.json",
    "revision": "a1d3ba847055e8f6f6e083e36cf9f4de"
  },
  {
    "url": "component---src-pages-uses-js-ac03ba92fd06fc5f0f0d.js"
  },
  {
    "url": "page-data/uses/page-data.json",
    "revision": "b845a48d888a5d11694bc9b66ab4fff6"
  },
  {
    "url": "22cb1846e3999e987bb520b28b168c77b899e222-56dbef4135baec5a036f.js"
  },
  {
    "url": "component---src-pages-about-js-d0b5f52edb0d2ba0b10d.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "4dbd9c13b6b0528fe4960a5783422a30"
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
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
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
  if (!resources || !(await caches.match(`/app-607c503a7810ce334e0a.js`))) {
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