---
title: "Understanding redux"
description: "The common problem with redux is seeing the library as overcomplicated. The fact that is most commonly learned with React which also adds more complexity. Does not help in understanding how it works and how different parts of redux cooperate."
pubDate: "Nov 23 2023"
heroImage: "/blog/aws-dev-badge.webp"
imgAlt: "Redux logo"
---

The common problem with redux is seeing the library as overcomplicated. The fact that is most commonly learned with React which also adds more complexity. Does not help in understanding how it works and how different parts of redux cooperate.

In a series of tutorials, we will build up the understanding by starting with the bare 'redux' package. We will first use its API without the framework and then add React.
The fact that is most common learned with React that also adds more complexity. Does not help in understending how it works and how different parts of redux cooperates with each other

You probably may know that redux beside react-redux has its stand-alone package 'redux'. It means that redux core is just a javascript library. It means you can run it anywhere you want either node app or web browser. The key to getting things in order is to understand the core library and then use it in our app.

We can quickly investiagte what is exported from https://redux.js.org/api/api-reference and we have a view of the whole redux API.

## Definition

What is the shortest redux definition?

_A Predictable State Container for JS Apps_

### Creating simple store

These three pieces are enough to create redux store.

```
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

// Initializing the store by calling createStore and passing in the reducer and initialState variables. It returns a store object, than contains the state and a few methods to interact with the state.
const store = createStore(reducer, initialState);
```

### Interacting with the store

When the store is created we can use its methods to interact with it.

```js
// main.js

// Let's just log the state to the console
console.log(store.getState());

// Modify state by dispatching an action.
store.dispatch({ type: "increment" });

// Log the state again to see the change.
console.log(store.getState());
```

The createStore function that we invoked above returns an object with multiple methods. We used **getState** to change state and **dispatch** with action object as an argument to change a state.

#### Subscribing to the store

Instead of manually logging the state we can write a subscribe function that we will pass as callback to the subscribe method.

```js
// main.js

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);
```

Right now we will get noticed every time the state changes.

## More complex reducer

Let's write the reducer that can increment, decrement, add and subtract.

To the previous example, we added multiple if statements, where the last two ones also use action objects.

```js
// main.js

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
  if (action.type === "substract") {
    const value = state.value - action.payload;
    return { value };
  }
  return state;
};
```

Having this logic inside our reducer we can decide what action to we want to take, based on the type variable that we pass inside the action object.

```js
//main.js

store.dispatch({ type: "increment" });

store.dispatch({ type: "add", payload: 6 });

store.dispatch({ type: "subtract", payload: 3 });
```

Above we used essential redux functionalities. Based on that knowledge we can use redux in the more complex scenarios. But before that let's structure the existing code to be easier for extension.

## Constants and action creators

### Constants

In real applications, it is a better idea to keep action types as a constant. It reduces the possibility of breaking the code because of typos.

```js
// consts.js

export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const ADD = "add";
export const SUBTRACT = "substract";
```

### Action creators

Action creator is simply the function that returns the action object. So we can use the function everywhere we want to dispatch it without the need to write the whole object in multiple places.

```js
// actions.js

export const increment = () => ({type: INCREMENT})
export const decrement = () => ({type: DECREMENT})
export const add = (amount) => ({type: ADD, payload: amount})
export const subtract = (amount) => ({type: SUBSTRACT, payload: amount)
```

### Refactoring existing code

```js
// main.js

import { createStore } from "redux";
import { add, increment, subtract } from "./actions";
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

```js
const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) {
    const user = action.payload;
  }
  return state;
};
```
