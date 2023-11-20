---
title: "Understanding redux - Thunks and Middlewares"
description: "Let's look at the concept of thunks and how to apply them with applyMiddleware method."
pubDate: "Nov 10 2023"
heroImage: "/blog/redux.webp"
imgAlt: "Redux logo"
---

## Introduction

In the previous article, we learned about the basic concepts of redux. We created a store, updated the state, and read the state. In this article, we will learn about middleware and thunks. We will use them to make requests to the mocked API.

**Thunks are not necessary for async calls in redux**, but they allow us to pass not only action objects but also thunk functions to the `store.dispatch()` method. **It unifies how we create action creators and thunk action creators.**

## Table of contents

- [Introduction](#introduction)
- [Redux middlewares](#redux-middlewares)
  - [ApplyMiddleware](#applymiddleware)
  - [Middleware function](#middleware-function)
  - [Using code from the first part of the tutorial](#using-code-from-the-first-part-of-the-tutorial)
    - [Codebox sample](#codebox-sample)
- [Prerequsites](#prerequsites)
- [Redux thunk](#redux-thunk)
  - [Thunk Middleware](#thunk-middleware)
  - [App functionality](#app-functionality)
  - [Thunks](#thunks)
  - [Thunk middleware](#thunk-middleware-1)
  - [Thunk action creators](#thunk-action-creators)
  - [Final app](#final-app-1)
  - [Async Redux without thunks](#async-redux-without-thunks)
  - [Summary](#summary)
  - [Final app](#final-app)

## Redux middlewares

Before using thunks in the app and making requests let's use the previous example to introduce the `applyMiddleware` method. We will later use it to apply thunks.

### ApplyMiddleware

Some takes from official docs:

> Middleware is the suggested way to extend Redux with custom functionality.

> Middleware in Redux can be mainly used to either
>
> - create side effects for actions,
> - modify or cancel actions, or to
> - modify the input accepted by dispatch.

> middleware receives [`Store`](https://redux.js.org/api/store)'s [`dispatch`](https://redux.js.org/api/store#dispatchaction) and [`getState`](https://redux.js.org/api/store#getState) functions as named arguments, and returns a function. That function will be given the `next` middleware's dispatch method and is expected to return a function of `action` calling `next(action)` with a potentially different argument, or at a different time, or maybe not calling it at all.

### Middleware function

We have to pass middleware to the `applyMiddleware` method.

> The middleware signature is ({ getState, dispatch }) => next => action

We will apply the middleware that capitalizes the user's name no matter the casing of input.

`capitalizeUser` - Assume that the user's name can be provided with any casing, but before modifying the state, we want to ensure that it will be capitalized.

```js
const capitalizeUser = (store) => (next) => (action) => {
  if (action.type === UPDATE_USER) {
    // When the action.type is UPDATE_USER, we want to capitalize the user name
    const userName = action.payload
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    return next({ ...action, payload: userName });
  }
  // if not UPDATE_USER, just pass the action to the next middleware
  next(action);
};

const middleware = applyMiddleware(capitalizeUser);

// Pass middleware as second argument
const store = createStore(reducers, middleware);
```

The most confusing part is the way we pass middleware `capitalizeUser`. We use two features of JavaScript language called currying and closures. Redux will call the first two functions, and because of closures, we will have access to the store and next parameter in the third function.

We can show this mechanism in a simple example:

```js
//We chain three functions
const nestedFunc = (a) => (b) => (c) => {
  return a + b + c;
};

// Call two first functions
const addC = nestedFunc(1)(2);

// Because of lexical scope we have access to a and b.
const result = addC(3);

console.log(result);
// logs 6
```

### Using code from the first part of the tutorial

We already saw the `capitalizeUser` middleware. `applyMiddleware` allows us to pass multiple functions. So let's add `preventNegativeValue` if the result of an action will be a value below 0 the middleware will prevent dispatching an action and log an error instead.

```js {41-68,70,72}
// main.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { add, decrement, increment, subtract, updateUser } from "./actions.js";
import { ADD, DECREMENT, INCREMENT, SUBTRACT, UPDATE_USER } from "./consts.js";

const initialState = {
  value: 0,
  user: "John Doe",
};

const valueReducer = (state = initialState.value, action) => {
  if (action.type === INCREMENT) {
    const value = state + 1;
    return value;
  }
  if (action.type === DECREMENT) {
    const value = state - 1;
    return value;
  }
  if (action.type === ADD) {
    const value = state + action.payload;
    return value;
  }
  if (action.type === SUBTRACT) {
    const value = state - action.payload;
    return value;
  }
  return state;
};

const userReducer = (state = initialState.user, action) => {
  if (action.type === UPDATE_USER) {
    const user = action.payload;
    return user;
  }
  return state;
};

const reducers = combineReducers({ valueReducer, userReducer });

const capitalizeUser = (store) => (next) => (action) => {
  if (action.type === UPDATE_USER) {
    // When the action.type is UPDATE_USER, we want to capitalize the user name
    const userName = action.payload
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    // Pass modified payload
    return next({ ...action, payload: userName });
  }
  //If not UPDATE_USER, just pass the action to the next middleware
  next(action);
};

// Here we have middleware there are 3 nested functions
const preventNegativeValue = (store) => (next) => (action) => {
  const value = store.getState().valueReducer;

  const logError = () => console.error("Value has to be greater than 0");

  // prevent from subtracting a value that will result in a negative number
  if (action.type === SUBTRACT && value - action.payload < 0) return logError();
  if (action.type === DECREMENT && value === 0) return logError();

  //If value will be greater than 0, just pass the action to the next middleware
  next(action);
};

const middleware = applyMiddleware(capitalizeUser, preventNegativeValue);

const store = createStore(reducers, middleware);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

store.dispatch(increment());
// SUBSCRIBER { valueReducer: 1, userReducer: 'John Doe' }

// This action will be prevented by the middleware
store.dispatch(subtract(10));
// Logs - Value has to be greater than 0

store.dispatch(add(6));
// SUBSCRIBER { valueReducer: 7, userReducer: 'John Doe' }

store.dispatch(decrement());
// SUBSCRIBER { valueReducer: 6, userReducer: 'John Doe' }

// This action will be capitalized by the middleware
store.dispatch(updateUser("edgar aLlan poe"));
// SUBSCRIBER { valueReducer: 6, userReducer: 'Edgar Allan Poe' }

store.dispatch(subtract(3));
// SUBSCRIBER { valueReducer: 3, userReducer: 'Edgar Allan Poe' }
```

Above we added two middlewares that can modify the payload and cancel the action.

Having some idea about the concept of middleware in redux we can jump into more complex examples with thunks and requests to mocked API.

#### Codebox sample

<iframe src="https://codesandbox.io/embed/simple-redux-example-with-middleware-np3qqw?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark&view=editor"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="simple-redux-example-with-middleware"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Prerequsites

To mock API we will use json-server with faker.js. That will require additional setup. **It is not the scope of redux but you can follow this section if you wish to learn something additional.**

The purpose of the code below is to generate random data for the user. We use faker.js to do it programmatically. and then we create create file `server.json` node.js build in function exported from the fs module.

```js
// /src/api/generateServerData.js
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

// generateUsersData takes one argument. The function creates arrays of users and users' accounts.
const generateUsersData = (number) => {
  const users = [];
  const accounts = [];
  // Provide as many users as the number of provided arguments
  while (number >= 0) {
    users.push({
      id: number,
      firstName: faker.person.firstName(),
      secondName: faker.person.lastName(),
      joining_date: faker.date.future(),
    });
    accounts.push({
      userId: number,
      balance: faker.finance.amount(),
    });
    number--;
  }
  return { users, accounts };
};

// generateUsersData return object. Desctructure the object here
const { users, accounts } = generateUsersData(5);

// user build-in function to create server.json file in ./src/api directory.
writeFileSync("./src/api/server.json", JSON.stringify({ users, accounts }));
```

Having this utility we can mock the server with the json-server package.

```js
  "scripts": {
    "server": "node ./src/api/generateServerData.js && json-server --watch ./src/api/server.json --port 3003"
  },
```

Having this script in package.json (first generate the file then run the json-server on it). We can run `npm run server`

It will run sever with the following endpoints:

```
  http://localhost:3003/users
  http://localhost:3003/users/:id
  http://localhost:3003/accounts
  http://localhost:3003/accounts/:id
```

We will have access to these endpoints from our front-end application.

Having mocked API we can start working on thunks and async logic

## Redux thunk

Now knowing how to add middleware to the store we can use thunks. Because **thunks are just middleware with the same structure we introduced before.**

### Thunk Middleware

Thunk middleware has one job. Recognize if provided `argument` `store.subscribe(argument)` is a function or object.

The whole logic of redux-thunk middleware is literally this:

```ts
const middleware: ThunkMiddleware<State, BasicAction, ExtraThunkArg> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // The thunk middleware looks for any functions that were passed to `store.dispatch`.
    // If this "action" is really a function, call it and return the result.
    if (typeof action === "function") {
      // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
      return action(dispatch, getState, extraArgument);
    }

    // Otherwise, pass the action down the middleware chain as usual
    return next(action);
  };
```

and you can inspect on [react-redux GitHub repo](https://github.com/reduxjs/redux-thunk/blob/master/src/index.ts)

It is the same structure as sample middlewares showed above the `capitalizeUser` and the `preventNegativeValue`

### App functionality

Let's make some silly example to have a reason for using async actions in the app.
Building upon our previous example. Instead of hardcoding the user's data, we will fetch it from the mocked API. We will be able to fetch the user's data, and his account balance and modify both of it

### Thunks

A *thunk function* is a function that accepts two arguments: the Redux store `dispatch` method, and the Redux store `getState` method.

Having the knowledge from the previous chapters, we can **add thunk middleware** to the existing app

### Thunk middleware

```js {2-3,42,44}
// main.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { add, increment, subtract, updateUser } from "./actions.js";
import { ADD, DECREMENT, INCREMENT, SUBTRACT, UPDATE_USER } from "./consts.js";

const initialState = {
  value: 0,
  user: "John Doe",
};

const valueReducer = (state = initialState.value, action) => {
  if (action.type === INCREMENT) {
    const value = state + 1;
    return value;
  }
  if (action.type === DECREMENT) {
    const value = state - 1;
    return value;
  }
  if (action.type === ADD) {
    const value = state + action.payload;
    return value;
  }
  if (action.type === SUBTRACT) {
    const value = state - action.payload;
    return value;
  }
  return state;
};

const userReducer = (state = initialState.user, action) => {
  if (action.type === UPDATE_USER) {
    const user = action.payload;
    return user;
  }
  return state;
};

const reducers = combineReducers({ valueReducer, userReducer });

const middlewareEnhancer = applyMiddleware(thunkMiddleware.default);

const store = createStore(reducers, middlewareEnhancer);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

store.dispatch(increment());

store.dispatch(add(6));

store.dispatch(updateUser("Jane Doe"));

store.dispatch(subtract(3));
```

### Thunk action creators

It is enough to start creating our **thunk action creators**.

We will start by creating `getUser`.

```js {10-21}
//actions.js
import { INCREMENT, DECREMENT, ADD, SUBTRACT, UPDATE_USER } from "./consts.js";
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const add = (amount) => ({ type: ADD, payload: amount });
export const subtract = (amount) => ({ type: SUBTRACT, payload: amount });

export const updateUser = (user) => ({ type: UPDATE_USER, payload: user });

// getUser function is a thunk action creator
export const getUser = (id) => {
  // getUser returns thunk action
  return async (dispatch, getState) => {
    const response = await fetch("http://localhost:3003/users/" + id)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    // thunk action returns updateUser action that we created in the previous chapter
    return dispatch(updateUser(response));
  };
};
```

There is no magic in the code sample above. We will be dispatching the same action as previously. But before we are able to do that, we have to fetch the user's data from the server.

**Because we use thunk middleware we are able to dispatch the `getUser` in the same way as we dispatch `updateUser`.** There is no difference for `store.dispatch` method when we pass either function or object.

The thunk middleware will do it for us, we inspected this behavior in <a href="#thunk-middleware">Thunk middleware</a> section.

### Final app

Having knowledge about async redux we can build a full example where we will be able to get the user's data, get the user's account balance, and update both of them.

It will require only two constants

```js {2-3}
// consts.js
export const UPDATE_USER = "updateUser";
export const UPDATE_ACCOUNT = "updateAccount";
```

```js {2-70}
// actions.js
import axios from "axios";
import { UPDATE_USER, UPDATE_ACCOUNT } from "./consts.js";

// Action creators
export const setUser = (user) => ({ type: UPDATE_USER, payload: user });
export const setAccount = (account) => ({
  type: UPDATE_ACCOUNT,
  payload: account,
});

// Thunk creators
export const getUser = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get("http://localhost:3003/users/" + id);

    const data = response.data;

    return dispatch(setUser(data));
  };
};

export const getBalance = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(
      "http://localhost:3003/accounts?userId=" + id
    );

    const data = response.data[0];

    return dispatch(setAccount(data));
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch, getState) => {
    const userState = getState().userReducer;
    const response = await axios.put("http://localhost:3003/users/" + id, {
      ...userState,
      ...userData,
    });

    const data = response.data;

    return dispatch(setUser(data));
  };
};

export const updateBalance = (id, amount) => {
  return async (dispatch, getState) => {
    const accountState = getState().accountReducer;

    const response = await axios.put("http://localhost:3003/accounts/" + id, {
      ...accountState,
      balance: Number(accountState.balance) + amount,
    });

    const data = response.data;

    return dispatch(setAccount(data));
  };
};
```

```js {4-5,8-23,26-40,51-56}
// main.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { getBalance, getUser, updateBalance, updateUser } from "./actions.js";
import { UPDATE_USER, UPDATE_ACCOUNT } from "./consts.js";

//Align initial state with API data
const user = {
  id: null,
  firstName: "",
  secondName: "",
  joining_date: null,
};

const account = {
  userId: null,
  balance: 0,
};

const initialState = {
  user,
  account,
};

// Reducers will update the state with data returned by API
const accountReducer = (state = initialState.account, action) => {
  if (action.type === UPDATE_ACCOUNT) {
    const account = action.payload;
    return account;
  }
  return state;
};

const userReducer = (state = initialState.user, action) => {
  if (action.type === UPDATE_USER) {
    const user = action.payload;
    return user;
  }
  return state;
};

const reducers = combineReducers({ accountReducer, userReducer });

const middlewareEnhancer = applyMiddleware(thunkMiddleware.default);

const store = createStore(reducers, middlewareEnhancer);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

await store.dispatch(getUser(1));
await store.dispatch(getBalance(1));

await store.dispatch(updateUser(1, { secondName: "Smith" }));
await store.dispatch(updateBalance(1, 10));
```

### Async Redux without thunks

Making async requests with redux without thunks is completely valid let's look at this example.

```js {12-18}
// actions.js
export const getUser = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get("http://localhost:3003/users/" + id);

    const data = response.data;

    return dispatch(setUser(data));
  };
};

export const getUserWithoutThunk = async (dispatch, getState, id) => {
  const response = await axios.get("http://localhost:3003/users/" + id);

  const data = response.data;

  return dispatch(setUser(data));
};
```

```js {4}
// main.js
await store.dispatch(getUser(1));

await getUserWithoutThunk(store.dispatch, store.getState, 1);
```

Calling `getUser` and `getUserWithoutThunk` will do the same thing.

The first thing we can notice here is, that with this approach we will call dispatch differently for sync and async actions.

If you would like to know more about the philosophy behind thunks there is [Dan Abramov's stack overflow response.](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

### Summary

In this tutorial, we introduced the redux middleware concept. And we applied thunk middleware that allows `store.dispatch method` to accept functions as arguments.
