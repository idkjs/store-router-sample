'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

function reducer(state, action) {
  if (typeof action !== "number") {
    return {
            count: state.count,
            username: action._0
          };
  }
  switch (action) {
    case /* Increase */0 :
        return {
                count: state.count + 1 | 0,
                username: state.username
              };
    case /* Decrease */1 :
        return {
                count: state.count - 1 | 0,
                username: state.username
              };
    case /* Logout */2 :
        ReasonReactRouter.push("/");
        return {
                count: state.count,
                username: ""
              };
    
  }
}

function LoginLogoutFunctor$Store(Props) {
  var children = Props.children;
  var match = React.useReducer(reducer, {
        count: 0,
        username: ""
      });
  return Curry._1(children, {
              state: match[0],
              dispatch: match[1]
            });
}

var Store = {
  reducer: reducer,
  make: LoginLogoutFunctor$Store
};

function LoginLogoutFunctor$Login(Props) {
  var store = Props.store;
  var match = React.useState(function () {
        return "";
      });
  var setUsername = match[1];
  var username = match[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  type: "text",
                  value: username,
                  onChange: (function (e) {
                      return Curry._1(setUsername, e.target.value);
                    })
                }), React.createElement("br", undefined), React.createElement("button", {
                  onClick: (function (param) {
                      Curry._1(store.dispatch, /* SetUsername */{
                            _0: username
                          });
                      return ReasonReactRouter.push("#loggedin");
                    })
                }, "Login"));
}

var Login = {
  make: LoginLogoutFunctor$Login
};

function LoginLogoutFunctor$Screen(Props) {
  var store = Props.store;
  return React.createElement("div", undefined, React.createElement("b", undefined, "User: " + store.state.username), React.createElement("br", undefined), React.createElement("br", undefined), React.createElement("span", undefined, "Count: " + String(store.state.count)), React.createElement("br", undefined), React.createElement("button", {
                  onClick: (function (_event) {
                      return Curry._1(store.dispatch, /* Increase */0);
                    })
                }, "Increase"), React.createElement("button", {
                  onClick: (function (_event) {
                      return Curry._1(store.dispatch, /* Decrease */1);
                    })
                }, "Decrease"), React.createElement("button", {
                  onClick: (function (param) {
                      Curry._1(store.dispatch, /* Logout */2);
                      return ReasonReactRouter.push("#loggedout");
                    })
                }, "Logout"));
}

var $$Screen = {
  make: LoginLogoutFunctor$Screen
};

function reducer$1(_state, action) {
  return {
          activeRoute: action._0
        };
}

function LoginLogoutFunctor$Router(Props) {
  var match = React.useReducer(reducer$1, {
        activeRoute: /* Login */0
      });
  var dispatch = match[1];
  var state = match[0];
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  React.useEffect((function () {
          var match = url.hash;
          switch (match) {
            case "loggedin" :
                Curry._1(dispatch, /* SwitchRoute */{
                      _0: /* Screen */1
                    });
                break;
            case "loggedout" :
                Curry._1(dispatch, /* SwitchRoute */{
                      _0: /* Login */0
                    });
                break;
            default:
              console.log("Could not find route");
              console.log(url);
          }
          
        }), [url]);
  return React.createElement(LoginLogoutFunctor$Store, {
              children: (function (store) {
                  var match = state.activeRoute;
                  return React.createElement("div", undefined, match ? React.createElement(LoginLogoutFunctor$Screen, {
                                    store: store
                                  }) : React.createElement(LoginLogoutFunctor$Login, {
                                    store: store
                                  }));
                })
            });
}

var Router = {
  reducer: reducer$1,
  make: LoginLogoutFunctor$Router
};

exports.Store = Store;
exports.Login = Login;
exports.$$Screen = $$Screen;
exports.Router = Router;
/* react Not a pure module */
