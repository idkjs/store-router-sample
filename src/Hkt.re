type app('p, 'f);

module type Newtype1 = {
  type s('a);
  type t;
  let bind: ('a => 'b, s('a)) => s('b);
  external inj: s('a) => app('a, t) = "%identity";
  external prj: app('a, t) => s('a) = "%identity";
};
module Common = {
  type t;
  external inj: 'a => 'b = "%identity";
  external prj: 'a => 'b = "%identity";
};
module Newtype1 =
       (
         T: {
           type t('a);
           let ret: 'a => t('a);
           let bind: ('a => 'b, t('a)) => t('b);
         },
       ) => {
  type s('a) = T.t('a);
  let ret = T.ret;
  let bind = T.bind;
  include Common;
};

module OptionFunctor =
  Newtype1({
    type t('a) = option('a);
    let ret = a => Some(a);
    let bind = (f, a) =>
      switch (a) {
      | Some(value) => Some(f(value))
      | None => None
      };
  });

module ListFunctor =
  Newtype1({
    type t('a) = list('a);
    let ret = a => [a];
    let bind = (f, a) =>
      switch (a) {
      | [] => []
      | values => List.map(f, values)
      };
  });

let map =
    (
      type f,
      module Functor: Newtype1 with type t = f,
      f: 'a => 'b,
      hfa: app('a, f),
    ) =>
  Functor.bind(value => f(value), Functor.prj(hfa)) |> Functor.inj;

let user = OptionFunctor.inj(Some("Henlou"));
let myNumberBois = ListFunctor.inj([1, 2, 3, 5]);

Js.log(user |> map((module OptionFunctor), a => "mr. " ++ a));

Js.log(myNumberBois |> map((module ListFunctor), a => a + 12));
