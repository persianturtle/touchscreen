# Documentation for the 42" Touchscreen App

This AngularJS app was created to showcase content on a _1920px x 1080px_ viewport.  

To view available features, visit the help screen by tapping the app's help icon, or by viewing below:

![Help Screen](https://github.com/persianturtle/touchscreen/blob/master/img/help.png)


## Table of Contents
1. [Cloning the Repo](#cloning-the-repo)
2. [Application Structure](#application-structure)
3. [Adding and Removing Content](#adding-and-removing-content)
4. [Style Guide](#style-guide)
5. [How to Push Changes](#how-to-push-changes)
6. [Example Project HTML Files](#example-project-html-files)
7. [API](#api)
8. [How to Pull Changes](#how-to-pull-changes)
9. [License](#license)

## Cloning the Repo

To clone the repo onto your local machine, run:
```sh
$ git clone https://github.com/persianturtle/touchscreen.git
```

Then run:
```sh
$ npm install
```

```sh
$ bower install
```

```sh
$ gulp
```

## Application Structure

Below is the application structure relevant to the user.  There are three main components:
  1. config.json
  2. projects/
  3. screensavers/
```
root
│   config.json
│
└───  projects/
    │
    └───  ** project name **/
        │   project.html
        │   project.jpg ** optional **
        │   project.mp4 ** optional **
        │   project.css ** optional **
        │   project.js ** optional **
│
└───  screensavers/
    │ 
    │   ** all screensavers **
```

A `project.html` file must be present within each project directory.

Image files, video files, CSS and JavaScript files may be added as need.

##### Example `config.json`
Project names must correspond to directories in `projects/`.

```
{
  "projects": [
    {
      "name": "precisioneffect",
      "timer": 60
    },
    { 
      "name": "infinity",
      "timer": 60
    },
    { 
      "name": "hypoxia"
    },
    { 
      "name": "cologuard"
    },
    { 
      "name": "beseengetscreened"
    }
  ],
  "screensaver": "screensavers/Abbvie-Chintan.jpg"
}
```

A timer may be set, **in seconds**, for any project/slide.  If a project/slide is displaying a video, the next project/slide will be automatically shown after the video has ended, unless a timer has been set that is greater than or less than the length of the video.  If the timer length is greather than the length of the video, add the `loop` attribute on the video and it will loop until the timer triggers the next slide to be active.

## Adding and Removing Content

To add a new project:
  1. Create a new directory within `projects/`
  2. Name the directory the name of the project
  3. Add the project to `config.json`
  4. Add a `project.html` file within the newly created project's directory.  The contents of this file will be displayed as a slide.
  5. Add images, videos, CSS and/or JavaScript within this directory as needed. When adding CSS and/or JavaScript, run:

```sh
$ gulp
```
and refresh the browser.

When adding CSS, be sure to prefix your selectors with you project name to **avoid overriding** any of the UI's CSS. Simply add the project name as a class on the `<section class="** placeholder **">` tag.
  
To remove a project:
  1. Remove the project's directory within `projects/`.
  2. Remove the project from `config.json`.

The navigation will update automatically.

## Style Guide

The AngularJS code in this application adhere's to [John Papa's AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

## How to Push Changes
To push changes from your local machine, run:
```sh
$ git pull
$ git add -A
$ git diff --cached
$ git commit -m 'Message'
$ git pull
$ git push
```
Let's be very sure that there are not any changes that have not been pulled to your local machine before pushing to the repo.  `git diff --cached` allows you to view your changes before commiting them.

## Example Project HTML Files

`** placeholder **` has been used in place of specific content for the examples below.

### Plaim Image:

**Note:** Images should be _1920px x 1080px_
```
<section>

  <img src="projects/** project name **/** placeholder **.jpg">

</section>
```

### Image & CTA:

**Note:** Clicking on the CTA should probably do something.  `ng-click` triggers something(); below.  You may instead wrap `div.content` within an anchor tag.
```
<section>

  <img src="projects/** project name **/** placeholder **.jpg">

  <div class="content" ng-click="something();">
    <h1>** placeholder **</h1>
    <h2>** placeholder **</h2>
    <img class="arrow" src="img/arrow.png">
  </div>

</section>
```

### Plain Video:

**Note:** The `video-controls` directive will add tap to pause/play functionality.
```
<section>
  
  <video autoplay height="1080px" video-controls>
    <source src="projects/** placeholder **/video.mp4" type="video/mp4">
  </video>

</section>
```

### Video & CTA:
```
<section>
  
  <video autoplay height="1080px" video-controls>
    <source src="projects/** placeholder **/video.mp4" type="video/mp4">
  </video>

  <a href="** placeholder **">
    <div class="content">
      <h1>** placeholder **</h1>
      <h2>** placeholder **</h2>
      <img class="arrow" src="img/arrow.png">
    </div>
  </a>

</section>
```

### iFrame & Image Overlay

**Note:** This requires a minor amount of JavaScript.

#### How to Configure a Slide to Use an iFrame & Image Overlay

Let's assume our project is `precisioneffect`.

  1. Add `precisioneffect` to `config.json`.
  2. Create a JavaScript file within `projects/precisioneffect/`. An example of the JavaScript file is shown below.
  3. Add the `project/precisioneffect/project.html` file,  An example of HTML file is shown below.

`project.js` file:
```
(function() {

  'use strict';

  angular.module('app').run(precisioneffect);

  precisioneffect.$inject = ['$rootScope'];

  function precisioneffect($rootScope) {
      
    $rootScope.project = {
      precisioneffect: {
        image: true,
        cta: cta
      }
    };

    function cta() {
      $rootScope.$broadcast('timer:cancel');
      $rootScope.$broadcast('help:hide');
      $rootScope.$broadcast('nav:hide');
      $rootScope.project.precisioneffect.image = false;
    }

  }

})();
```

When the CTA is tapped, the `cta` function will execute.  An API has been provided to easily interact with the UI.  For complete API documentation, visit the [API Section](#API).

`project.html` file:
```
<section>

  <img ng-show="project.precisioneffect.image" src="projects/** project name **/** placeholder **.jpg">

  <iframe ng-if="!project.precisioneffect.image" width="1920" height="1080" src="** placeholder **"></iframe>

  <div class="content" ng-show="project.precisioneffect.image" ng-click="project.precisioneffect.cta();">
    <h1>** placeholder **</h1>
    <h2>** placeholder **</h2>
    <img class="arrow" src="img/arrow.png">
  </div>

</section>
```

## API

Animations are automatic.

Hide the navigation:
`$rootScope.$broadcast('nav:hide');`

Show the navigation:
`$rootScope.$broadcast('nav:show');`

Hide the help icon:
`$rootScope.$broadcast('help:hide');`

Show the help icon:
`$rootScope.$broadcast('help:hide');`

Next slide:
`$rootScope.$broadcast('slider:next');`

Previous slide:
`$rootScope.$broadcast('slider:prev');`

Jump to slide:
`$rootScope.$broadcast('slider:jump', slideIndex);`

Stop timers:
`$rootScope.$broadcast(timer:cancel);`

## How to Pull Changes
To pull changes on your local machine, run:
```sh
$ git pull
```

To pull changes on the touchscreen, run the following command from any directory in Command Prompt:
```sh
> touchscreen
```
Behind the screens, `touchscreen` will run:

```sh
> cd C:\wamp\www
> git pull
```

## License

Copyright (c) 2016 [precisioneffect](http://precisioneffect.com)

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
