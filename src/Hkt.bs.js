'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var Common = {};

function Newtype1(T) {
  return T;
}

function ret(a) {
  return Caml_option.some(a);
}

function bind(f, a) {
  if (a !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(a)));
  }
  
}

var OptionFunctor = {
  ret: ret,
  bind: bind
};

function ret$1(a) {
  return {
          hd: a,
          tl: /* [] */0
        };
}

function bind$1(f, a) {
  if (a) {
    return List.map(f, a);
  } else {
    return /* [] */0;
  }
}

var ListFunctor = {
  ret: ret$1,
  bind: bind$1
};

function map(Functor, f, hfa) {
  return Curry._2(Functor.bind, Curry.__1(f), hfa);
}

var user = "Henlou";

var myNumberBois = {
  hd: 1,
  tl: {
    hd: 2,
    tl: {
      hd: 3,
      tl: {
        hd: 5,
        tl: /* [] */0
      }
    }
  }
};

console.log(map({
          bind: bind
        }, (function (a) {
            return "mr. " + a;
          }), user));

console.log(map({
          bind: bind$1
        }, (function (a) {
            return a + 12 | 0;
          }), myNumberBois));

exports.Common = Common;
exports.Newtype1 = Newtype1;
exports.OptionFunctor = OptionFunctor;
exports.ListFunctor = ListFunctor;
exports.map = map;
exports.user = user;
exports.myNumberBois = myNumberBois;
/*  Not a pure module */
