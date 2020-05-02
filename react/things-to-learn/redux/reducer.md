# Reducer

{% embed url="https://redux.js.org/basics/reducers" %}

**Reducers** specify how the application's state changes in response to [actions](https://redux.js.org/basics/actions) sent to the store. Remember that actions only describe _what happened_, but don't describe how the application's state change

> **Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

**SIGNATURE:** `type Reducer = (state: S, action: A) => S`

Reducer is a pure function, implements the update logic of application i.e. how the next state is calculated given the current state and the action being dispatched.

Should have reducer composition if reducer is getting big

Reducer composition can be done using Arrays or Objects  
Redux provides a top level function : combineReducers\(\)

