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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "4cbdad722cf79fcb217f30503e30d196"
  },
  {
    "url": "build/icon-assets/icons.json",
    "revision": "32f30e65a6718989e9819c7c01f82c48"
  },
  {
    "url": "build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "build/p-061de261.entry.js"
  },
  {
    "url": "build/p-0cf5965a.entry.js"
  },
  {
    "url": "build/p-0d7265e1.entry.js"
  },
  {
    "url": "build/p-1315d701.entry.js"
  },
  {
    "url": "build/p-32abb7ce.js"
  },
  {
    "url": "build/p-45d3ecc8.entry.js"
  },
  {
    "url": "build/p-5fa2a523.entry.js"
  },
  {
    "url": "build/p-665751b1.entry.js"
  },
  {
    "url": "build/p-75299c57.entry.js"
  },
  {
    "url": "build/p-85c79c4d.entry.js"
  },
  {
    "url": "build/p-8c82131c.js"
  },
  {
    "url": "build/p-8d36d499.entry.js"
  },
  {
    "url": "build/p-8dfa8319.entry.js"
  },
  {
    "url": "build/p-9a71ebc7.js"
  },
  {
    "url": "build/p-9e2990f1.js"
  },
  {
    "url": "build/p-a100efbb.entry.js"
  },
  {
    "url": "build/p-a5f3811d.js"
  },
  {
    "url": "build/p-a870a285.js"
  },
  {
    "url": "build/p-a9fb944a.entry.js"
  },
  {
    "url": "build/p-b57128ad.entry.js"
  },
  {
    "url": "build/p-b770441c.entry.js"
  },
  {
    "url": "build/p-b912914c.entry.js"
  },
  {
    "url": "build/p-c98da115.entry.js"
  },
  {
    "url": "build/p-d3afd7de.entry.js"
  },
  {
    "url": "build/p-e07f4172.entry.js"
  },
  {
    "url": "build/p-ea49d19b.entry.js"
  },
  {
    "url": "build/p-f38a8df4.js"
  },
  {
    "url": "build/p-fb41327b.entry.js"
  },
  {
    "url": "build/p-fb586a19.entry.js"
  },
  {
    "url": "build/p-fe9998cb.entry.js"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
