# Why async flow in redux?

## Why do we need middleware for async flow in Redux?

> Why would I want to use Redux Thunk or Redux Promise, as the documentation suggests?

There is nothing wrong with this approach. It’s just inconvenient in a large application because you’ll have different components performing the same actions, you might want to debounce some actions, or keep some local state like auto-incrementing IDs close to action creators, etc. So it is just easier from the maintenance point of view to extract action creators into separate functions.

**You can read my answer to “How to dispatch a Redux action with a timeout” for a more detailed walkthrough.**

Middleware like Redux Thunk or Redux Promise just gives you “syntax sugar” for dispatching thunks or promises, but you don’t _have to_ use it.

So, without any middleware, your action creator might look like

```text
// action creator
function loadData(dispatch, userId) { // needs to dispatch, so it is first argument
  return fetch(`http://data.com/${userId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
    );
}

// component
componentWillMount() {
  loadData(this.props.dispatch, this.props.userId); // don't forget to pass dispatch
}
```

But with Thunk Middleware you can write it like this:

```text
// action creator
function loadData(userId) {
  return dispatch => fetch(`http://data.com/${userId}`) // Redux Thunk handles these
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
    );
}

// component
componentWillMount() {
  this.props.dispatch(loadData(this.props.userId)); // dispatch like you usually do
}
```

So there is no huge difference. One thing I like about the latter approach is that the component doesn’t care that the action creator is async. It just calls `dispatch` normally, it can also use `mapDispatchToProps` to bind such action creator with a short syntax, etc. The components don’t know how action creators are implemented, and you can switch between different async approaches \(Redux Thunk, Redux Promise, Redux Saga\) without changing the components. On the other hand, with the former, explicit approach, your components know _exactly_ that a specific call is async, and needs `dispatch` to be passed by some convention \(for example, as a sync parameter\).

Also think about how this code will change. Say we want to have a second data loading function, and to combine them in a single action creator.

With the first approach we need to be mindful of what kind of action creator we are calling:

```text
// action creators
function loadSomeData(dispatch, userId) {
  return fetch(`http://data.com/${userId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_SOME_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_SOME_DATA_FAILURE', err })
    );
}
function loadOtherData(dispatch, userId) {
  return fetch(`http://data.com/${userId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_OTHER_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_OTHER_DATA_FAILURE', err })
    );
}
function loadAllData(dispatch, userId) {
  return Promise.all(
    loadSomeData(dispatch, userId), // pass dispatch first: it's async
    loadOtherData(dispatch, userId) // pass dispatch first: it's async
  );
}


// component
componentWillMount() {
  loadAllData(this.props.dispatch, this.props.userId); // pass dispatch first
}
```

With Redux Thunk action creators can `dispatch` the result of other action creators and not even think whether those are synchronous or asynchronous:

```text
// action creators
function loadSomeData(userId) {
  return dispatch => fetch(`http://data.com/${userId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_SOME_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_SOME_DATA_FAILURE', err })
    );
}
function loadOtherData(userId) {
  return dispatch => fetch(`http://data.com/${userId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'LOAD_OTHER_DATA_SUCCESS', data }),
      err => dispatch({ type: 'LOAD_OTHER_DATA_FAILURE', err })
    );
}
function loadAllData(userId) {
  return dispatch => Promise.all(
    dispatch(loadSomeData(userId)), // just dispatch normally!
    dispatch(loadOtherData(userId)) // just dispatch normally!
  );
}


// component
componentWillMount() {
  this.props.dispatch(loadAllData(this.props.userId)); // just dispatch normally!
}
```

With this approach, if you later want your action creators to look into current Redux state, you can just use the second `getState` argument passed to the thunks without modifying the calling code at all:

```text
function loadSomeData(userId) {
  // Thanks to Redux Thunk I can use getState() here without changing callers
  return (dispatch, getState) => {
    if (getState().data[userId].isLoaded) {
      return Promise.resolve();
    }

    fetch(`http://data.com/${userId}`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: 'LOAD_SOME_DATA_SUCCESS', data }),
        err => dispatch({ type: 'LOAD_SOME_DATA_FAILURE', err })
      );
  }
}
```

If you need to change it to be synchronous, you can also do this without changing any calling code:

```text
// I can change it to be a regular action creator without touching callers
function loadSomeData(userId) {
  return {
    type: 'LOAD_SOME_DATA_SUCCESS',
    data: localStorage.getItem('my-data')
  }
}
```

So the benefit of using middleware like Redux Thunk or Redux Promise is that components aren’t aware of how action creators are implemented, and whether they care about Redux state, whether they are synchronous or asynchronous, and whether or not they call other action creators. The downside is a little bit of indirection, but we believe it’s worth it in real applications.

Finally, Redux Thunk and friends is just one possible approach to asynchronous requests in Redux apps. Another interesting approach is [Redux Saga](https://github.com/yelouafi/redux-saga) which lets you define long-running daemons \(“sagas”\) that take actions as they come, and transform or perform requests before outputting actions. This moves the logic from action creators into sagas. You might want to check it out, and later pick what suits you the most.

> I searched the Redux repo for clues, and found that Action Creators were required to be pure functions in the past.

This is incorrect. The docs said this, but the docs were wrong.  
Action creators were never required to be pure functions.

