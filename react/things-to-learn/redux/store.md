# Store

Redux: `createStore`

```text
const createStore = (reducer) => {
    let state;
    let listners;
    
    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer( state, action) => {
            listners.forEach( listner => listner(); 
        }
    };
    
    const subscribe = (listner) => {
        listners.push(listner);
        return () => {
            listners = listners.filter( l => l !== listner );
        }
    };
    
    dispatch({}) // to set inital value
    
    return { getState, dispatch, subscribe };
}
```

