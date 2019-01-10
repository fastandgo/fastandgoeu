'use strict';

//
//  D E P L O Y
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp = require('gulp');
let path = require('./paths.js');

var open = require('gulp-open');

let gh_pages = require('gulp-gh-pages');
let gitRemote = require('get-git-remotes');

let awspublish = require('gulp-awspublish');
var AWS = require('aws-sdk');
let merge = require('merge-stream');

let options = require('./options.js');
let deploy = {};

deploy.files = [
  path.to.liquid.destination + '*.html',
  path.to.scss.destination + '*.css',
  path.to.js.destination + '*.js',
  path.to.svg.destination + '**/*.svg',
  path.to.styleguide.destination + '**/*.*',
  path.to.images.destination + '**/*.*'
];

deploy.gh_pages = () => {
  return gulp
    .src(
      [
        ...deploy.files,
        path.to.root + '.nojekyll',
        path.to.root + 'CNAME'
      ], {
        base: '.'
      }
    )
    .pipe(gh_pages())
    .on('end', () => {
      // let repo = gitRemote().match(/origin(?:.*)\/(.*)\.git \(push\)$/)[1];

      // return gulp.src(__filename)
      //   .pipe(open({
      //     uri: `http://siliconsalad.github.io/${repo}`
      //   }))
    });
}

/**
 * If you need to upload to S3, donc forget to create a `~/.aws/credentials` file containing following informations
 * 
 * ```
 * [<project name>]
 * aws_access_key_id = <YOUR_ACCESS_KEY_ID>
 * aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
 * ```
 * 
 */
deploy.s3 = () => {
  let publisher = awspublish.create({
    region: options.aws.region,
    params: {
      Bucket: options.aws.bucket
    },
    credentials: new AWS.SharedIniFileCredentials({
      profile: options.aws.credential
    })
  });

  let headers = {
    'Cache-Control': `max-age=${7*24*60*60*1000}, no-transform, public`
  };

  let files = [];
  files.push(gulp.src(deploy.files, {
    base: '.'
  }));
  if (options.aws.gzip) {
    files.push(gulp.src(deploy.files, {
      base: '.'
    }).pipe(awspublish.gzip({
      ext: '.gz'
    })));
  }

  return merge(...files)
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter())
    .on('end', () => {
      return gulp.src(__filename)
        .pipe(open({
          uri: `http://${options.aws.bucket}.s3-website.${options.aws.region}.amazonaws.com`
        }))
    });
}

deploy.gh_pages.displayName = "Deploying to GH Pages";
deploy.s3.displayName = "Deploying on S3";

module.exports = deploy;
