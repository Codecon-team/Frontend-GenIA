<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d66619b (FEAT: criação tela pagamento)
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      
>>>>>>> d66619b (FEAT: criação tela pagamento)
=======

>>>>>>> 0e831f1 (feat: adicionando sistema de loadingpage)
=======
      
>>>>>>> 0174713 (refactor: refatorando codigo)
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-54d0af47'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "3ca0b8505b4bec776b69afdba2768812"
  }, {
    "url": "index.html",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "0.itiu2bvr2f"
=======
    "revision": "0.a7pv010q4dg"
>>>>>>> bdd3bf8 (FEAT: implement user authentication with login and registration functionality)
=======
    "revision": "0.oip9nc40h6g"
>>>>>>> df7a9c6 (FEAT: update dashboard route to include user ID and enhance DashboardView with resume fetching logic)
=======
    "revision": "0.48ljvalpp7o"
>>>>>>> d66619b (FEAT: criação tela pagamento)
=======
    "revision": "0.48ljvalpp7o"
=======
    "revision": "0.itiu2bvr2f"
>>>>>>> bdf94b4 (CHORE: atualização main css)
>>>>>>> 205e636 (CHORE: atualização main css)
=======
    "revision": "0.itiu2bvr2f"
>>>>>>> 9f4271d (style: deixando responsivo as telas)
=======
    "revision": "0.5bpq3jdfj18"
>>>>>>> 0174713 (refactor: refatorando codigo)
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    allowlist: [/^\/$/]
  }));

}));
<<<<<<< HEAD
=======
>>>>>>> 8ecf063 (feat: integrate user authentication with API and state management)
=======
>>>>>>> d66619b (FEAT: criação tela pagamento)
