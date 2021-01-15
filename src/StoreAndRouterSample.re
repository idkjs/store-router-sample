module Store = {
  type action =
    | Increase
    | Decrease
    | SetUsername(string);
  type state = {
    count: int,
    username: string,
  };
  type storeBag = {
    state,
    dispatch: action => unit,
  };
  let reducer = (state: state, action: action) =>
    switch (action) {
    | Increase => {...state, count: state.count + 1}
    | Decrease => {...state, count: state.count - 1}
    | SetUsername(username) => {...state, username}
    };

  [@react.component]
  let make = (~children: storeBag => React.element) => {
    let (state, dispatch) =
      React.useReducer(reducer, {count: 0, username: ""});

    children({state, dispatch});
  };
};

module Login = {
  [@react.component]
  let make = (~store: Store.storeBag) => {
    let (username, setUsername) = React.useState(() => "");

    <div>
      <input
        type_="text"
        value=username
        onChange={e => setUsername(e->ReactEvent.Form.target##value)}
      />
      <br />
      <button
        onClick={_ => {
          store.dispatch(SetUsername(username));
          ReasonReactRouter.push("#loggedin");
        }}>
        "Login"->React.string
      </button>
    </div>;
  };
};

module Screen = {
  [@react.component]
  let make = (~store: Store.storeBag) => {
    <div>
      <b> {("User: " ++ store.state.username)->React.string} </b>
      <br />
      <br />
      <span>
        {("Count: " ++ string_of_int(store.state.count))->React.string}
      </span>
      <br />
      <button onClick={_event => store.dispatch(Increase)}>
        "Increase"->React.string
      </button>
      <button onClick={_event => store.dispatch(Decrease)}>
        "Decrease"->React.string
      </button>
    </div>;
  };
};

module Router = {
  type route =
    | Login
    | Screen;
  type action =
    | SwitchRoute(route);
  type routerState = {activeRoute: route};
  let reducer = (state: routerState, action: action) =>
    switch (action) {
    | SwitchRoute(route) => {activeRoute: route}
    };

  [@react.component]
  let make = () => {
    let (state, dispatch) = React.useReducer(reducer, {activeRoute: Login});

    let url = ReasonReactRouter.useUrl();
    React.useEffect1(
      () => {
        switch (url.hash) {
        | "loggedin" => dispatch(SwitchRoute(Screen))
        | _ =>
          Js.log("Could not find route");
          Js.log(url);
        };
        None;
      },
      [|url|],
    );

    <Store>
      ...{store =>
        <div>
          {switch (state.activeRoute) {
           | Screen => <Screen store />
           | Login => <Login store />
           }}
        </div>
      }
    </Store>;
  };
};

[@react.component]
let default = () => <Router />;
