# Key Notes

Content:

- [Handling Async API Requests](#handling-api-data--async-request-flows)
- [Data format in Redux State](#data-format-in-redux-state)

## Handling API Data & Async Request Flows

There are two ways to handle API data and request flows:
- **1. useService hook**: Used for handling data that is local to a component.
- **2. Redux flow**: Used for managing data that needs to be shared globally across the application.

### 1. useService Hook
A custom hook designed to simplify making service requests within components. It manages loading state, handles errors and provides a clean API.

In this app, it used for searching categories to add to a product in ProductFormScreen.

### 2. Redux Flow
Here, Redux Toolkit's listener middleware is used to handle asynchronous operations.

#### Key Components:
1. **Listener Middleware:** Created using createListenerMiddleware and configured in the Redux store.
2. **Listeners:** Functions that define the side effects for specific actions.
3. **Service Functions:** Functions that perform the actual asynchronous API calls.
4. **Redux Slices:** Store data and define actions.

Flow:
1. All listeners are registered immediately after Redux store is configured.
2. **UI** dispatches an action using a slice's defined action creators. Optionally attaches success and error callbacks.
3. **Listener** starts. Makes necessary checks. If checks pass, turns on loading state and calls the corresponding service function with parameters from action payload.
4. **Service function** creates request body/params in an API-accepted format, if necessary. Sends the request and gets the response. Converts the response into UI-accepted format and returns it. Or throws error.
5. **Listener** gets the response or shows error toast. Turns off loading state. Dispatches actions to update data in Redux state. Calls onSuccess or onError callbacks
6. **Redux slice** reducer makes necessary modifications on the data and updates state.
7. **UI** listens for data in Redux state through custom selectors. When data changes, UI updates and re-renders.


## Data format in Redux State
The data for products and categories is stored in a normalized format in two values:
1. An array of ids.
````
idList: [1,2,3,...]
````

2. An object with keys as ids and values as items.
````
normalized: {
    '1': {
        id: 1,
        name: 'Product',
        price: 100,
    },
    '2': ...
    ...
}
````

This format is used to enhance the performance with CRUD operations. Especially the performance of selectors that read an item by ID (ex: productById) are improved (from O(n) to O(1)), making this format more advantageous.
