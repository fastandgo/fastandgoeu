"use strict";

import "babel-polyfill";
import "whatwg-fetch";

import "./tools/smoothScroll.js";
import "./tools/fakeLink.js";

import "./tools/moveElements.js";
import {
  ready
} from "./tools/utils.js";

import "./atoms/responsiveTable.js";
import "./atoms/lazyload.js";
import {
  alertbox
} from "./atoms/alertbox.js";
import "./atoms/maxHeight.js";

import "./molecules/header.js";
import "./molecules/hero.js";
import "./molecules/simulation.js";
import "./molecules/desc.js";
// import "./molecules/contact.js";

ready(function () {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
});
