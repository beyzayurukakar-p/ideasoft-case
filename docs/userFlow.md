# User Flow

## 1. Landing Screen:
- The first screen user sees.
- Provides buttons to navigate to the Storefront or Admin Panel.

## 2. Storefront:
- A webview that opens the storefront website.

## 3. Admin Panel:
- Includes several screens for viewing, adding, editing and deleting products and categories.

### Viewing Products
- **ProductListScreen**: 

    Displays:
    - A list of products
    - A loading indicator while the first read is going on.
    - A 'Try again' button if the read fails.

    Users can:
    - Refresh the list by pulling down.
    - Load more by scrolling to the end of list.
    - Delete a product by swiping left.
    - Navigate to Product Detail screen.
    - Navigate to an add screen with the plus button.
    - When

- **ProductDetailScreen**: Displays detailed information about a product. Users can:
    - Delete the product with the delete button.
    - Navigate to an edit screen with the edit button.

### Adding and Updating a Product
- To add a product, users can press the **plus** button on **Product List** screen to navigate to a form screen.

- To update a product, users can press the **edit** button on **Product Detail** screen to navigate to an update screen.

- **ProductFormScreen**: Allows users to add or update a product. Includes validation of required fields. The fields' name and input type are:
    - Name: Text Input
    - Status: Switch
    - Images: Input for adding/removing images
    - Stock Code: Text Input
    - Stock Amount: Text Input with numbers only keyboard.
    - Stock Type: Dropdown with available stock types.
    - Price: ext Input with numbers only keyboard.
    - Currency: Dropdown with available currencies.
    - Categories: Input for adding/removing categories. Adding includes debounced search & select.

### Viewing Categories
- **CategoryListScreen**:

    Displays:
    - A list of products
    - A loading indicator while the first read is going on.
    - A 'Try again' button if the read fails.

    Users can:
    - Refresh the list by pulling down.
    - Load more by scrolling to the end of list.
    - Delete a category by swiping left.
    - Navigate to Category Detail screen.
    - Navigate to an add screen with the plus button.

- **CategoryDetailScreen**: Displays detailed information about a category. Users can:
    - Delete the category with the delete button.
    - Navigate to an edit screen with the edit button.

### Adding and Updating a Category
- To add a category, users can press the **plus** button on **Category List** screen to navigate to a form screen.

- To update a category, users can press the **edit** button on **Category Detail** screen to navigate to an update screen.

- **CategoryFormScreen**: Allows users to add or update a category. Includes validation of required fields. The fields' name and input type are:
    - Name: Text Input
    - Status: Switch
