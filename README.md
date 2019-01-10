# Fast And Go

## Installation:

`npm install`

## Simple compilation

`gulp`

## Watch on the project

`gulp watch`

This will automatically launch a static server and look for files change on http://localhost:5000.

If you want to connect browser-sync to another server, use `gulp watch --proxy="your-server"`

If you want to start browser-sync on another port, use `gulp watch --port=1337`

## Build

`gulp staging`

`gulp prod`

## Deploy on gh-pages

`gulp deploy`

Access it at:

- http://{{username}}.github.io/{{Project Name}}

## Updating content

### HTML content

If you want to update links or content of any page, juste edit the file named `data.json` in folder `assets/templates/` and commit your changes.

### Google Analytics

If you want to add google analytics, add your code in `assets/templates/ga_dev.json` and `assets/templates/ga_prod.json`.

## Libs documentation

- https://help.shopify.com/themes/liquid
- http://foundation.zurb.com/docs/

## Start a new project

Use the following command

```
git clone --depth=1 git@github.com:<username>/frontend_starter.git <Name of your project>
rm -rf !$/.git
```

It will clone this project without all the history and remove `.git` folder inside of it. Don't forget to run `npm init` and `bower init` in order to update project infos.
