# Technical Overview

Content

- [Tools and Libraries](#tools-and-libraries)
- [Folder Structure](#folder-structure)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Styling](#styling)
- [Testing](#testing)
- [Continuous Integration](#continuous-integration)
- [Known Issues](#known-issues)



# Tools and Libraries

Framework: **React Native & Expo**

With: **Typescript**

- **Redux Toolkit**: State management.
- **Axios**: HTTP requests.
    - **Redux Toolkit Listener Middleware**: Side effect management.
- **React Navigation**: Screens and navigation.
- **React Native Safe Area Context**: Safe area insets.
- **React Native Toast Message**: Success and error messages.
- **Jest**: Testing.
- **React Native Testing Library**: Testing React Native components.
- **Expo Image**: Performant images.
- **Expo Image Picker**: Image picking with native module.
- **Shopify Flash List**: Performant lists.
- **Eslint & Prettier**: Linting and formatting. 

## Folder Structure

- **src:** Main source code directory.
    - **admin-panel:** Contains components, hooks, screens, and state management related to the admin panel, for managing products and categories
    - **common:** Contains shared assets, components, navigation, and store configuration.
    - **storefront:** Contains a webview component.

## State Management

### Redux Slices
- **productSlice**: Manages state related to products.
- **categorySlice**: Manages state related to categories.

### Selectors
- **productSelectors**: Functions to access product state.
- **categorySelectors**: Functions to access category state.

## Navigation

- **RootStack**: Main stack navigator.
- **Storefront Navigator**: Stack navigator for storefront.
- **Admin Panel Navigator**: Stack navigator for admin panel. Its screens are:
    - A tab navigator for switching between categories and products.
    - Detail and form screens

## Styling

- **StyleSheet:** Used for defining styles.
- **Colors:** Constant that stores app colors.
- **Dimensions:** Constant that stores values and functions for component sizes

## Testing

- Jest & React Native Testing Library

## Continuous Integration

- **Lefthook**
    - Ensures code quality checks are performed before commits. Configuration file: [lefthook.yml](../lefthook.yml)
    - **Pre-commit hooks** runs linting (`yarn lint`) and type checking (`yarn typecheck`) on staged files.
    - **Commit-msg hooks** uses 'Commitlint' to enforce conventional commit messages. 
- **Commitlint**
    - Ensures all commit messages follow conventional commit format: [Commitlint Conventional Config](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
    - Configuration is in [package.json](../package.json)
- **Github Actions**
    - The CI workflow is defined in the [ci.yml](../.github/workflows/ci.yml) file.
    - It carries out the following tasks:
        - Lint
        - Typecheck
        - Run tests



## Known Issues
1. Deprecated Component Usage: Deprecated Swipeable is used due to a bug in the new component.
2. Potential Performance Issues: Handling of the product and category lists in redux state should be optimized.
3. Error Messages: Single generic error message is not very explanatory.
4. Form Validation: Validation is basic and does not cover value types.
5. Keyboard Avoidance: Keyboard avoiding logic is very primitive. Needs to be improved by calculating the position of each input and scroll down accordingly.
6. API Key Storage: API keys should be stored as environment variables.
7. Unserializable Action Payloads: 'onSuccess' and 'onError' callbacks in action payloads may cause issues. There should be a system that watches the redux flow and calls these callbacks.
8. Toast behind Modal: When a modal is visible on the screen, the Toast component stays behind it, while the user expects to see it on top of everything. 
9. Insufficient Tests: Only list screens are tested. Add/Update flows also need testing.
10. ** Serverside Paging Issue: Paging in the serverside needs to accept skip/offset parameter. The reason is this issue: the client asks for page 1, then user deletes a couple of items, the client asks for page 2, the new page 2 starts with a couple of items later. So a couple of items are never shown in the UI until user reloads the list.
