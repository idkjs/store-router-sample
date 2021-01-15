'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ExampleStyles$StoreRouterSample = require("./ExampleStyles.bs.js");
var BlinkingGreeting$StoreRouterSample = require("./BlinkingGreeting/BlinkingGreeting.bs.js");
var FetchedDogPictures$StoreRouterSample = require("./FetchedDogPictures/FetchedDogPictures.bs.js");
var LoginLogoutFunctor$StoreRouterSample = require("./LoginLogoutFunctor.bs.js");
var ReducerFromReactJSDocs$StoreRouterSample = require("./ReducerFromReactJSDocs/ReducerFromReactJSDocs.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$StoreRouterSample.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(BlinkingGreeting$StoreRouterSample.make, {
          children: "Hello!"
        }), makeContainer("Blinking Greeting"));

ReactDom.render(React.createElement(ReducerFromReactJSDocs$StoreRouterSample.make, {}), makeContainer("Reducer From ReactJS Docs"));

ReactDom.render(React.createElement(FetchedDogPictures$StoreRouterSample.make, {}), makeContainer("Fetched Dog Pictures"));

ReactDom.render(React.createElement(LoginLogoutFunctor$StoreRouterSample.Router.make, {}), makeContainer("Reason Using JS Using Reason"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
