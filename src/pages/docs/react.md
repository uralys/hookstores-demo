# React example

## [Setup](#setup)

Here is the way to follow to setup `La Taverne` on your app:

- 1: Write `reactions`: the way your store must reduce actions.
- 2: Pass your instance `{dispatch, store}` through the provider `<Taverne>`.
- 3: `pour` data in your containers
- 4: `dispatch` actions to trigger `reactions`.

<details>
 <summary>🔍 Illustration</summary>

In the following, let's illustrate how to use `Taverne` with:

- a store of `Items` and its fetch function
- a `container` plugged to this store,
- and the `component` rendering the list of items.

Illustration will be marked with 🔍

</details>

## [Create a reducer](#create-a-reducer)

You'll have to define a reducer with

- an initialState,
- and a list of reactions.

```js
const items = {
  initialState: {},
  reactions: []
};

export default items;
```

You should use one reducer for each feature.

`La Taverne` will:

- handle an immutable nested state with [Immer](https://immerjs.github.io/immer/docs/introduction),
- listen to actions to trigger the appropriate `reactions`,
- emit updates to the containers **only when** there are changes **they need**.

![computeAction](https://user-images.githubusercontent.com/910636/103582817-e2d13600-4ede-11eb-8fbf-f0eb2a7cd3e7.png)

<details>
<summary>🔍 Example</summary>

Here is the example for our illustrating `items`

```js
/* ./features/items/store.js */
import apiCall from './fetch-items.js';

const FETCH_ITEMS = 'FETCH_ITEMS';

const initialState = {items: null};

const fetchItems = {
  on: FETCH_ITEMS,
  perform: async (parameters, dispatch, getState) => {
    // This function will be called whenever {type:FETCH_ITEMS} is dispatched.
    // `getState` is provided here for convenience, to access the current store state.

    const items = await apiCall(parameters);
    return items;
  },
  reduce: (draft, payload) => {
    // 'reduce' will be called after `perform` is over.
    // 'perform' returns the items, so here payload === items
    draft.items = payload;
  }
};

const reactions = [fetchItems];

export default {initialState, reactions};
export {FETCH_ITEMS};
```

</details>

## [Provider](#setup-the-provider)

Once all reducers are ready, instanciate and pass `{dispatch, store}` to the `<Taverne>` provider.

🔍 Example:

```js
/* ./index.js */
import React from 'react';
import {render} from 'react-dom';
import {Taverne} from 'taverne/hooks';

import items from './features/items/reducer.js';
import anyOtherStuff from './features/whatever/reducer.js';

const {dispatch, store} = createLaTaverne({
  items,
  anyOtherStuff
});

render(
  <Taverne dispatch={dispatch} store={store}>
    <App />
  </Taverne>,
  container
);
```

## [Pouring](#pouring)

`La Taverne` pours data for you by:

- Extracting your content from your global state
- (Only when there is an update:) notifying and giving it to your containers

The `pour` hook allows to listen to changes in your global state, use the part you need in your local props.

That's the `mapStateToProps` if you come from Redux.

🔍 Here is the example for our illustrating `items`:

```js
/* ./features/items/container.js */

import React from 'react';
import ItemsComponent from './component';

const ItemsContainer = props => {
  const {pour} = useTaverne();
  const items = pour('items');

  return <ItemsComponent items={items} />;
};
```

To listen to specific changes in the global state, and update your local props only on those changes, you can use many kinds of parameters to `pour()` (see the [advanced section](#-advanced-usage)).

## [Dispatching actions](#dispatching-actions)

Use [`prop drilling`](https://kentcdodds.com/blog/prop-drilling) from your containers to your components: pass functions dispatching the actions

```js
import {SELECT_ITEM} from './features/items/reducer.js';

const ItemsContainer = props => {
  const {dispatch} = useTaverne();

  const selectItem = id => () => {
    dispatch({
      type: SELECT_ITEM,
      payload: {itemId: id}
    });
  };

  return <ItemsComponent selectItem={selectItem} />;
};
```

## [Advanced usage](#advanced-usage)

### [Local rendering](#local-rendering)

The whole point of `Taverne` is to be able to perform extremely local rendering.

So, rather than the listening for the whole state updates, you can update rendering depending on specific updates in your global state.

To do so, specify the `props` mapping you want to listen for changes, telling corresponding paths in your state.

```js
const Container = () => {
  const {pour} = useTaverne();
  const foo = pour('path.to.anything.within.your.store');

  return <Component foo={foo} />;
};
```

This way, on every store update, specific props will be extracted for the components.

If those props don't change, the store won't notify your container, preventing a re-rendering: this will allow accurate local rendering from a global app state.

### [Many ways to pour](#many-ways-to-pour)

You can map a many props in one single pouring:

```js
const ItemsContainer = props => {
  const {pour} = useTaverne();
  const {items, other} = pour({
    items: 'items',
    other: 'plop.plip.plup'
  });

  return <ItemsComponent items={items} other={other} />;
};
```

You can also use your state to read paths depending on your state:

```js
const BookContainer = props => {
  const {pour} = useTaverne();
  const book = pour(state => ({
    book: `shelves.${state.selectedShelfId}.books.${state.selectedBookId}`
  }));

  return <BookComponent book={book} />;
};
```

cheers 🍻
