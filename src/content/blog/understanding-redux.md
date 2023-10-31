---
title: "Understanding redux"
description: "The common problem with redux is seeing the library as overcomplicated. The fact that is most commonly learned with React which also adds more complexity. Does not help in understanding how it works and how different parts of redux cooperate."
pubDate: "Oct 23 2023"
heroImage: "/blog/redux.webp"
imgAlt: "Redux logo"
---

- [Introduction](#introduction)
- [Definition](#definition)
- [Creating simple store](#creating-simple-store)
- [Interacting with the store](#interacting-with-the-store)
- [Subscribing to the store](#subscribing-to-the-store)
- [More complex reducer](#more-complex-reducer)
  - [Constants](#constants)
  - [Action creators](#action-creators)
  - [Refactoring existing code](#refactoring-existing-code)
- [Multiple reducer with combineReducers](#multiple-reducer-with-combinereducers)
- [Summary](#summary)
- [Codesandbox example](#codesandbox-example)

## Introduction

The common problem with redux is seeing the library as overcomplicated. The fact that is most commonly learned with React which also adds more complexity. Does not help in understanding how it works and how different parts of redux cooperate.

**In a series of tutorials, we will build up the understanding by starting with the bare redux package**. We will first use its API without the framework and then add React.
The fact that is most commonly learned with React also adds more complexity. Does not help in understanding how it works and how different parts of redux cooperate.

You probably may know that **redux beside react-redux has its stand-alone package redux**. It means that redux core is just a javascript library. It means **you can run it anywhere you want either node app or web browser**. The key to getting things in order is to understand the core library and then use it in our app.

We can quickly investigate what is exported from https://redux.js.org/api/api-reference and we have a view of the whole redux API.

## Definition

What is the shortest redux definition?

_A Predictable State Container for JS Apps_

## Creating simple store

These three pieces are enough to create a redux store.

```js
// main.js
import { createStore } from "redux";

// assigning state to the initialState variable
const initialState = {
  value: 0,
};

// simple reducer function, that takes the state and action as arguments. If the action type is "increment", it returns a new state object with the value incremented by 1. If the action type is anything else, it returns the state as is.
const reducer = (state, action) => {
  if (action.type === "increment") {
    const value = state.value + 1;
    return { value };
  }
  return state;
};

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, then contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);
```

## Interacting with the store

When the store is created we can use its methods to interact with it.

```js {21-28}
// main.js
import { createStore } from "redux";

// assigning state to the initialState variable
const initialState = {
  value: 0,
};

// simple reducer function, that takes the state and action as arguments. If the action type is "increment", it returns a new state object with the value incremented by 1. If the action type is anything else, it returns the state as is.
const reducer = (state, action) => {
  if (action.type === "increment") {
    const value = state.value + 1;
    return { value };
  }
  return state;
};

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, then contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);

// Let's just log the state to the console
console.log(store.getState());

// Modify state by dispatching an action.
store.dispatch({ type: "increment" });

// Log the state again to see the change.
console.log(store.getState());
```

The `createStore` function that we invoked above returns an object with multiple methods. We used `getState` to change the state and `dispatch` with an action object as an argument to change a state.

## Subscribing to the store

Instead of manually logging the state we can write a subscribe function that we will pass as a callback to the `subscribe` method.

```js {21-22}
// main.js
import { createStore } from "redux";

// assigning state to the initialState variable
const initialState = {
  value: 0,
};

// simple reducer function, that takes the state and action as arguments. If the action type is "increment", it returns a new state object with the value incremented by 1. If the action type is anything else, it returns the state as is.
const reducer = (state, action) => {
  if (action.type === "increment") {
    const value = state.value + 1;
    return { value };
  }
  return state;
};

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, then contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

// Modify state by dispatching an action.
store.dispatch({ type: "increment" });
```

Right now we will get noticed every time the state changes.

## More complex reducer

Let's write the `reducer` that can increment, decrement, add and subtract.

To the previous example, we added multiple if statements, where the last two ones also use action objects.

```js {15-28}
// main.js
import { createStore } from "redux";

// assigning state to the initialState variable
const initialState = {
  value: 0,
};

// simple reducer function, that takes the state and action as arguments. If the action type is "increment", it returns a new state object with the value incremented by 1. If the action type is anything else, it returns the state as is.
const reducer = (state, action) => {
  if (action.type === "increment") {
    const value = state.value + 1;
    return { value };
  }
  if (action.type === "decrement") {
    const value = state.value - 1;
    return { value };
  }

  // Here we need to include some additional information that is required
  //to properly update the state
  if (action.type === "add") {
    const value = state.value + action.payload;
    return { value };
  }
  if (action.type === "subtract") {
    const value = state.value - action.payload;
    return { value };
  }
  return state;
};

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, then contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

// Modify state by dispatching an action.
store.dispatch({ type: "increment" });
```

Having this logic inside our reducer we can decide what action we want to take, based on the type variable that we pass inside the action object.

```js {42-46}
// main.js
import { createStore } from "redux";

// assigning state to the initialState variable
const initialState = {
  value: 0,
};

// simple reducer function, that takes the state and action as arguments. If the action type is "increment", it returns a new state object with the value incremented by 1. If the action type is anything else, it returns the state as is.
const reducer = (state, action) => {
  if (action.type === "increment") {
    const value = state.value + 1;
    return { value };
  }
  if (action.type === "decrement") {
    const value = state.value - 1;
    return { value };
  }

  // Here we need to include some additional information that is required
  //to properly update the state
  if (action.type === "add") {
    const value = state.value + action.payload;
    return { value };
  }
  if (action.type === "subtract") {
    const value = state.value - action.payload;
    return { value };
  }
  return state;
};

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, then contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

// Modify state by dispatching an action.
store.dispatch({ type: "increment" });

store.dispatch({ type: "add", payload: 6 });

store.dispatch({ type: "subtract", payload: 3 });
```

Above we used essential redux functionalities. Based on that knowledge we can use redux in the more complex scenarios. But before that let's structure the existing code to be easier for an extension.

## Constants and action creators

### Constants

In real applications, it is a better idea to keep action types as a constant. It reduces the possibility of breaking the code because of typos.

```js
// consts.js

export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const ADD = "add";
export const SUBTRACT = "subtract";
```

### Action creators

Action creator is simply the function that returns the action object. So we can use the function everywhere we want to dispatch it without the need to write the whole object in multiple places.

```js
// actions.js
import { INCREMENT, DECREMENT, ADD, SUBTRACT, UPDATE_USER } from "./consts.js";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const add = (amount) => ({ type: ADD, payload: amount });
export const subtract = (amount) => ({ type: SUBTRACT, payload: amount });
```

### Refactoring existing code

```js {4-5,12,16,20,24,36-40}
// main.js

import { createStore } from "redux";
import { add, increment, subtract } from "./actions.js";
import { ADD, DECREMENT, INCREMENT, SUBTRACT } from "./consts.js";

const initialState = {
  value: 0,
};

const reducer = (state, action) => {
  if (action.type === INCREMENT) {
    const value = state.value + 1;
    return { value };
  }
  if (action.type === DECREMENT) {
    const value = state.value - 1;
    return { value };
  }
  if (action.type === ADD) {
    const value = state.value + action.payload;
    return { value };
  }
  if (action.type === SUBTRACT) {
    const value = state.value - action.payload;
    return { value };
  }
  return state;
};

const store = createStore(reducer, initialState);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

store.dispatch(increment());

store.dispatch(add(6));

store.dispatch(subtract(3));
```

## Multiple reducer with combineReducers

There is a last part we have to include in this tutorial. The combineReducers method allows more complex applications to split reducers into multiple functions so we can manage independent parts of the state.

```js {8}
// consts.js

export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const ADD = "add";
export const SUBTRACT = "subtract";

export const UPDATE_USER = "updateUser";
```

```js {9}
// actions.js
import { INCREMENT, DECREMENT, ADD, SUBTRACT, UPDATE_USER } from "./consts.js";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const add = (amount) => ({ type: ADD, payload: amount });
export const subtract = (amount) => ({ type: SUBTRACT, payload: amount });

export const updateUser = (user) => ({ type: UPDATE_USER, payload: user });
```

```js {4-5,9,12,15,19,23,27,32-37,40,42,51}
// main.js

import { createStore, combineReducers } from "redux";
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

const store = createStore(reducers);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

store.dispatch(increment());

store.dispatch(add(6));

store.dispatch(updateUser("Jane Doe"));

store.dispatch(subtract(3));
```

## Summary

**We have learned how to build a store by combining multiple reducers and how to subscribe and dispatch synchronous actions.** As you can see redux did not require any frontend or user interactions we can simply use the store by running javascript.

## Codesandbox example

<iframe src="https://codesandbox.io/embed/thirsty-monad-ljyh3r?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark&view=editor"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="thirsty-monad-ljyh3r"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
