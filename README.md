# Unofficial Bolt x Devvit Template

A barebones template for creating inline [Devvit](https://developers.reddit.com/) webview apps through [Bolt](https://bolt.new).

## Features

- Streamlined npm scripts. Just [import into Bolt](https://bolt.new/github.com/besworks/unofficial-bolt-devvit-web) and follow the prompts.
- No automatic bundling. Manage your own front-end dependencies.
- Very simple example. Basic HTML page with Bolt.new badge linked using Devvit UI client.
- Express API which returns the current Reddit context when requested.

## Limitations

You cannot easily use any node packages in your front-end with this template. If you want to do this you should create a build step that uses rollup or your favorite tool to bundle your packages into webroot/

## Disclaimer

You can report any issues with the template here, but I will not walk you through building your project. The [Devvit documentation](https://developers.reddit.com/docs) contain all necessary information for working with Devvit and a starter course in Web Development is beyond the scope of this project. I'm active in the Devvit Discord though and do help out when I can.

You will not get any support from the Devvit team while using this unofficial, experimental template. It is technically outdated, and heavily modified from the original exmaples. Also, the API for this feature is in active development. You cannot publicly publish an app built with this method. Any projects that use it will eventually need to migrate to the final release of Devvit Web when it becomes available. See the [Future Roadmap](https://developers.reddit.com/docs/devvit_web/future_roadmap) for information on where this is heading.
