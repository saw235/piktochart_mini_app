## Instructions

You are required to implement a single page application that allows user to add text and image into canvas.

## Features

Below are the basic features for the application:

- user can see the existing images from folder `images` to the images list
- user can *upload image* to folder `images` and directly added to images list
- user can *add and remove image / text* from the menu to the canvas
- user can *move the image / text* around the canvas

Bonus points if you can provide this feature:

- the created objects on canvas can be saved and repopulated on refresh browser

## Resources

You will be given a HTML and CSS file with simple structure, and a server that allows you to upload and retrieve image. Instruction on how to run the server is included below.

## Requirements

Here are the expected requirements:

- App should have the features listed [above](#features)

- App should work on modern browsers (Chrome / Firefox)

- App logic and data flow are written in a functional and reactive way

    Separate the logic between app state and view / user interactions (unidirectional data flow). 

- Try to avoid using libraries as much as possible

    If you need to use libraries, we recommend ReactJS, RxJS / xstream, CycleJS, and jQuery.

    _note: use native HTML element `<div>` for editor canvas, not `<canvas>`_

Bonus points given for these requirements:

- Code and flow should be properly documented

    Help us understand your flow easier by code comments or a readme file.

- Build automated test for the app


## How to Submit

- Zip your working folder with the name `<your name>-piktojstest`

- Exclude `node_modules` folder from the zip

- If you're using github or any code management tools, you can pass us the link

- You have **one day** to complete the test. If you are not able to finish, do send us whatever you have done, we will evaluate accordingly. If you need more time to fulfill all the features and requirements, we can give you **an extra day**

Have fun programming 😊

## How To Install

To set up the environment dependencies ( node version 5++ )

```
$ npm install
```

To run the node server

```
$ npm run start
```

Server is listening to port `8000`

### API

#### get uploaded images

```
GET /images
```

#### upload image to server

```
POST /uploads
```

### Note

_- The name of the file input has to be `upload` as this is what the server will be reading from_
_- The server only accepts `png` and `jpeg` file format_
_- You are allowed to edit the server.js file_
