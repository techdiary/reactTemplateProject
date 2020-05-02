# What exactly is Hot Module Replacement in Webpack?



HMR is a way of exchanging modules in a running application \(and adding/removing modules\). You basically can update changed modules without a full page reload.

### Documentation

Prerequirements:

* Using Plugins: [https://webpack.js.org/concepts/plugins/](https://webpack.js.org/concepts/plugins/)
* Code Splitting: [https://webpack.js.org/guides/code-splitting/](https://webpack.js.org/guides/code-splitting/)
* webpack-dev-server: [https://webpack.js.org/configuration/dev-server/](https://webpack.js.org/configuration/dev-server/)

It's not so much for HMR, but here are the links:

* Example: [https://webpack.js.org/guides/hot-module-replacement/](https://webpack.js.org/guides/hot-module-replacement/)
* API: [https://webpack.js.org/concepts/hot-module-replacement/](https://webpack.js.org/concepts/hot-module-replacement/)

I'll add these answers to the documentation.

### How does it work?

#### From the app view

The app code asks the HMR runtime to check for updates. The HMR runtime downloads the updates \(async\) and tells the app code that an update is available. The app code asks the HMR runtime to apply updates. The HMR runtime applies the updates \(sync\). The app code may or may not require user interaction in this process \(you decide\).

#### From the compiler \(webpack\) view

In addition to the normal assets, the compiler needs to emit the "Update" to allow updating from a previous version to this version. The "Update" contains two parts:

1. the update manifest \(json\)
2. one or multiple update chunks \(js\)

The manifest contains the new compilation hash and a list of all update chunks \(2\).

The update chunks contain code for all updated modules in this chunk \(or a flag if a module was removed\).

The compiler additionally makes sure that module and chunk ids are consistent between these builds. It uses a "records" json file to store them between builds \(or it stores them in memory\).

#### From the module view

HMR is a opt-in feature, so it only affects modules that contains HMR code. The documentation describes the API that is available in modules. In general, the module developer writes handlers that are called when a dependency of this module is updated. They can also write a handler that is called when this module is updated.

In most cases, it's not mandatory to write HMR code in every module. If a module has no HMR handlers, the update bubbles up. This means a single handler can handle updates for a complete module tree. If a single module in this tree is updated, the complete module tree is reloaded \(only reloaded, not transferred\).

#### From the HMR runtime view \(technical\)

Additional code is emitted for the module system runtime to track module `parents` and `children`.

On the management side, the runtime supports two methods: `check` and `apply`.

A `check` does a HTTP request to the update manifest. When this request fails, there is no update available. Elsewise the list of updated chunks is compared to the list of currently-loaded chunks. For each loaded chunk, the corresponding update chunk is downloaded. All module updates are stored in the runtime as updates. The runtime switches into the `ready` state, meaning an update has been downloaded and is ready to be applied.

For each new chunk request in the ready state, the update chunk is also downloaded.

The `apply` method flags all updated modules as invalid. For each invalid module, there needs to be a update handler in the module or update handlers in every parent. Else the invalid bubbles up and marks all parents as invalid too. This process continues until no more "bubble up" occurs. If it bubbles up to an entry point, the process fails.

Now all invalid modules are disposed \(dispose handler\) and unloaded. Then the current hash is updated and all "accept" handlers are called. The runtime switches back to the `idle` state and everything continues as normal.

![generated update chunks](https://webpack.github.io/assets/HMR.svg)

### What can I do with it?

You can use it in development as a LiveReload replacement. Actually the webpack-dev-server supports a hot mode which tries to update with HMR before trying to reload the whole page. You only need to add the `webpack/hot/dev-server` entry point and call the dev-server with `--hot`.

You can also use it in production as update mechanisms. Here you need to write your own management code that integrates HMR with your app.

Some loaders already generate modules that are hot-updateable. e.g. The `style-loader` can exchange the stylesheet. You don't need to do anything special.

> Suppose I want to update my CSS \(one stylesheet\) and JS modules when I save them to disk, without reloading the page and without using plugins such as LiveReload. Is this something Hot Module Replacement can help me with?

Yes

> What kind of work do I need to do, and what does HMR already provide?

Here is a little example: [https://webpack.js.org/guides/hot-module-replacement/](https://webpack.js.org/guides/hot-module-replacement/)

A module can only be updated if you "accept" it. So you need to `module.hot.accept` the module in the parents or the parents of the parents... e.g. A Router is a good place, or a subview.

If you only want to use it with the webpack-dev-server, just add `webpack/hot/dev-server` as entry point. Else you need some HMR management code that calls `check` and `apply`.

### Opinion: What makes it so cool?

* It's LiveReload but for every module kind.
* You can use it in production.
* The updates respect your Code Splitting and only download updates for the used parts of your app.
* You can use it for a part of your application and it doesn't affect other modules
* If HMR is disabled, all HMR code is removed by the compiler \(wrap it in `if(module.hot)`\).

### Caveats

* It's experimental and not tested so well.
* Expect some bugs.
* Theoretically usable in production, but it may be too early to use it for something serious.
* The module IDs need to be tracked between compilations so you need to store them \(`records`\).
* The optimizer cannot optimize module IDs any more after the first compilation. A bit of an impact on bundle size.
* HMR runtime code increases the bundle size.
* For production usage, additional testing is required to test the HMR handlers. This could be pretty difficult.

