# zap
A sandbox / playground for playing with Electron (https://github.com/atom/electron). It contains process-isolated ReactJS and an AngularJS apps that communicate via Electron's IPC API.

## Cliffs
* Being at least passingly familiar with node gets you off to a good start, as your app essentially becomes a node package and consumes other node packages.
* electron-prebuilt and electron-debug from NPM are what you need to get an electron app up and ticking along.
* electron-packager will help you when it comes time to build and ship.
* An eletron app comprises of two or more processes: the main process which is your entry point into the Electron world, and N render processes depending on how many windows and webviews (similar to iframes but process isolated) you kick off from the main process or from within other windows or webviews.
* webviews have a sharp edge https://discuss.atom.io/t/webview-not-rendering-content/17576
* IPC for communicating between processes works as described on the box, but managing the complexity of it across process boundaries once the apps involved become non-trivial would be a fun task.
* Use relative references for all of your js / css in your web apps and all will be fine resolving in Electron's embedded Chromium browser (will all be `file:///` references if your web app is packaged inside your electron app).
* There seem to be very few sharp edges from first pass through to Chromium itself, my existing app ticked along quite nicely inside it.
* *Would I use it over WPF?* If I had to ship both a client and web version of the same application for 'reasons' (it has happened before!), and neither existed yet, sure. If I had a team full of web devs that needed to produce a client app, maybe. If I only had to build a client application and knew it had no web aspirations? No.

### Electron and ReactJS
* To get react-router working (if you happen to be using React) you need to ensure you set `window.location.hash = '/';` before you call `Router.run`, otherwise it will misbehave.

### Electron and AngularJS
* Nothing special required, it works as you would expect.
