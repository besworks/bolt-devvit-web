import { Devvit } from '@devvit/public-api';
import { defineConfig } from "@devvit/server";
import "../server/index";

Devvit.configure({
  redditAPI: true
});

const preview = Devvit.createElement("vstack", {
  height: '100%',
  width: '100%',
  alignment: 'center middle',
  backgroundColor: 'black'
}, Devvit.createElement("image", {
  url: "loading.gif",
  height: '80px',
  width: '80px',
  resizeMode: 'fit'
}), Devvit.createElement('text', {
  size: 'large',
  weight: 'bold'
}, 'loading'));

defineConfig({
  name: "Experimental Devvit Template",
  description: "An experimental template for Devvit.",
  entry: "index.html",
  height: "regular",
  inline: true,
  menu: {
    enable: true,
    label: "Experimental Web App",
    postTitle: "Experimental Web App",
    preview: preview
  }
});

export default Devvit;