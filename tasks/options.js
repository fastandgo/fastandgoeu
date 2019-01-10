"use strict";

//
//  O P T I O N S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let p = require("../package.json");
let path = require("./paths.js");

module.exports = {
  // SCSS
  cleaner: {
    sources: [path.to.root + "*.html", path.to.js.destination + "*.js"],
    ignore: [/js-/, /body/]
  },
  normalize: {
    browsers: ["last 3 versions"]
  },
  autoprefixer: {
    browsers: ["last 3 versions"]
  },
  // SVG
  sprite: {
    dest: path.to.svg.destination,
    shape: {
      id: {
        generator: n => `icon-${n.slice(0, -4)}`
      }
    },
    mode: {
      symbol: {
        sprite: "symbols",
        inline: true
      }
    }
  },
  // jsDoc
  jsDoc: {
    tags: {
      allowUnknownTags: true
    },
    opts: {
      destination: path.to.js.doc
    },
    plugins: ["plugins/markdown"],
    templates: {
      systemName: p.name,
      cleverLinks: false,
      monospaceLinks: false,
      default: {
        outputSourceFiles: true
      },
      path: "ink-docstrap",
      theme: "paper",
      navType: "vertical",
      linenums: true,
      dateFormat: "MMMM Do YYYY, h:mm:ss a",
      syntaxTheme: "dark",
      search: false
    }
  },
  // MDCSS
  styleguide: {
    destination: path.to.styleguide.destination,
    logo: "sg-logo.svg",
    title: " ",
    nav: [{
      name: p.name,
      url: p.homepage
    }],
    color: "#D3D3D6",
    assets: [
      path.to.scss.destination + "app.css",
      path.to.scss.destination + "styleguide.css",
      path.to.js.destination + "bundle.min.js",
      path.to.js.destination + "styleguide.min.js",
      path.to.svg.destination + "sprite.svg",
      path.to.svg.destination + "sg-logo.svg"
    ],
    css: ["style.css", "styleguide.css"],
    js: ["styleguide.min.js"],
    examples: {
      css: [
        "https://fonts.googleapis.com/css?family=Montserrat:400,700",
        "app.css",
        "styleguide.css"
      ],
      bodyjs: ["bundle.min.js"],
      bodycss: "background:none;border:0;clip:auto;display:block;height:auto;margin:0;padding:10px;position:static;width:auto"
    }
  },
  // Deploy
  aws: {
    bucket: "",
    region: "",
    credential: "", // <project name>
    gzip: false
  }
};
