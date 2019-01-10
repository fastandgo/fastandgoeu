"use strict";

//
//  S T Y L E G  U I D E
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

if (inIframe()) {
  let svgRequest = new XMLHttpRequest();
  svgRequest.open("GET", "symbols.svg", true);

  svgRequest.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let div = document.createElement("div");
      div.classList.add("svg-container");
      div.innerHTML = this.response;
      document.body.insertBefore(div, document.body.childNodes[0]);
    }
  };
  svgRequest.send();
} else {
  let $sections;
  let $links;
  let $selectedSection;
  let clickNav = e => {
    // if(e) e.preventDefault();

    let $link = e && e.target ? e.currentTarget : $links[0];
    let $section = document.querySelector($link.getAttribute("href"));

    openSection($link, $section);
  };
  let openSection = ($link, $section) => {
    console.log("openSection");
    if ($link.classList.contains("menu-heading")) {
      $selectedSection = $section;
      $selectedSection.style.setProperty(
        "--max-height",
        `${$selectedSection.getAttribute("data-maxheight")}px`
      );

      $links.forEach($l => {
        $l.classList.remove("current-parent");
      });
      $links.forEach($l => {
        $l.classList.remove("current-child");
      });
      $link.classList.add("current-parent");

      $sections.forEach($s => {
        $s.classList.remove("show");
      });
      $section.classList.add("show");

      openSection(
        $link.nextElementSibling,
        $section.querySelectorAll("section")[0]
      );
    } else {
      if (!$selectedSection) {
        $selectedSection = $section.closest("main > section");
        $selectedSection.classList.add("show");
        let $previousLink = $link;
        while (!$previousLink.classList.contains("menu-heading")) {
          $previousLink = $previousLink.previousElementSibling;
        }
        $previousLink.classList.add("current-parent");
      }
      Array.from($selectedSection.querySelectorAll("section")).forEach($s => {
        $s.classList.remove("show");
      });
      $selectedSection.style.setProperty(
        "--max-height",
        `${parseInt($selectedSection.getAttribute("data-maxheight")) +
          parseInt($section.getAttribute("data-maxheight"))}px`
      );
      $section.classList.add("show");

      $links.forEach($l => {
        $l.classList.remove("current-child");
      });
      $link.classList.add("current-child");
    }
  };
  let setMaxHeight = () => {
    console.log("setMaxHeight");
    $sections.map(el => {
      el.setAttribute("data-maxheight", el.scrollHeight);
      el.style.setProperty("--max-height", `${el.scrollHeight}px`);
    });
  };
  let loadSection = hash => {
    console.log("loadSection");
    let $section = document.querySelector(hash);
    let $link = document.querySelector(`[href="${hash}"]`);

    openSection($link, $section);
  };

  window.addEventListener("load", () => {
    $sections = Array.from(document.querySelectorAll("section"));
    $links = Array.from(document.querySelectorAll(".menu-heading, .menu-item"));

    $links.forEach($link => {
      $link.addEventListener("click", clickNav);
    });
    setMaxHeight();

    if (window.location.hash && window.location.hash !== "#") {
      loadSection(window.location.hash);
    } else {
      clickNav();
    }
  });
  window.addEventListener("resize", setMaxHeight);
}
