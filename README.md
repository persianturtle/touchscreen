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

## Application Structure

```
root
│   index.html
│   config.json
│
└─── css/    
    │   styles.css
│
└─── img/    
    │   ** all images **
│
└─── js/    
    │   app.js
    │   UiController.js
    │   routes.js
    │   directives.js
│
└───  projects/
    │
    └───  ** project name **/
        │   project.html
        │
        └───  video/  ** optional **
            │   video.mp4
│
└───  screensavers/
  │
    │   ** all screensavers **
```

`index.html` -- Entry point of the application.  Contains UI components including the navigation, the swipe features, and all four corner tap areas.

`config.json` -- Configure the *current* screensaver's image path.

`js/UiController.js` -- Defines an object with all the project names which correspond to directories within the `project/` directory.

```
vm.slides = {
  all: [
    'precisioneffect',
    'infinity',
    'hypoxia',
    'cologuard',
    'beseengetscreened'
  ],
  ...
};
```

## Adding and Removing Content

To add a new project:
  1. Create a new directory within `projects/`
  2. Name the directory the name of the project
  3. Add the project to `vm.slides.all[]` in `js/UiController.js`
  4. Add a `project.html` file within `projects/** the project's name **/`.  The contents of this file will be displayed as a slide.
  
To remove a project:
  1. Remove the project's directory within `projects/`
  2. Remove the project from `vm.slides.all[]` in `js/UiController.js`

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

  <img src="img/** placeholder **.jpg">

</section>
```

### Image & CTA:

**Note:** Clicking on the CTA should probably do something.  `ng-click` triggers something(); below.  You may instead wrap `div.content` within an anchor tag.
```
<section>

  <img src="img/** placeholder **.jpg">

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
    <source src="projects/** placeholder **/video/video.mp4" type="video/mp4">
  </video>

</section>
```

### Video & CTA:
```
<section>
  
  <video autoplay height="1080px" video-controls>
    <source src="projects/** placeholder **/video/video.mp4" type="video/mp4">
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

**Note:** This requires a minor amount of configuration in `js/UiController.js`.

#### How to Configure a Slide to Use an iFrame & Image Overlay

Let's assume our project is `precisioneffect`.

  1. Create an object in `js/UiController.js`.

```
vm.precisioneffect = {
  image: true,
  cta: precisioneffect
};
```
  2. Create the function `precisioneffect` to handle the project's CTA.
```
function precisioneffect {
  vm.show.help = false;
  vm.show.nav = false;
  vm.precisioneffect.image = false;
}
```
  3. Add the `project/precisioneffect/project.html` file

```
<section>

  <img ng-show="vm.precisioneffect.image" src="img/** placeholder **.jpg">

  <iframe ng-if="!vm.precisioneffect.image" width="1920" height="1080" src="** placeholder **"></iframe>

  <div class="content" ng-show="vm.precisioneffect.image" ng-click="vm.precisioneffect.cta();">
    <h1>** placeholder **</h1>
    <h2>** placeholder **</h2>
    <img class="arrow" src="img/arrow.png">
  </div>

</section>
```

## API

Animations are automatic.

Hide the navigation:
`vm.show.nav = false;`

Show the navigation:
`vm.show.nav = true;`

Hide the help icon:
`vm.show.help = false;`

Show the help icon:
`vm.show.help = true;`

Next slide:
`$rootScope.$broadcast('slider:next');`

Previous slide:
`$rootScope.$broadcast('slider:prev');`

Jump to slide:
`$rootScope.$broadcast('slider:jump', slideIndex);`

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
