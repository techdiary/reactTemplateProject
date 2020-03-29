# Actions

{% embed url="https://redux.js.org/basics/actions" %}

### Definition

{% tabs %}
{% tab title="Action" %}
**Actions** are payloads of information that send data from your application to your store. They are the _only_source of information for the store. You send them to the store using [`store.dispatch()`](https://redux.js.org/api/store#dispatch). 

```javascript
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
{% endtab %}

{% tab title="Action Creators" %}
**Action creators** are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

```jsx
 function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
{% endtab %}
{% endtabs %}

### Async Action with `redux-thunk`:

\*\*\*\*[**Redux thunk middle-ware**:](https://github.com/gaearon/redux-thunk) using this middle-ware, an action creator can return a function instead of an action object. This way _action creator_ becomes [thunk](https://en.wikipedia.org/wiki/Thunk)

{% page-ref page="middleware.md" %}



