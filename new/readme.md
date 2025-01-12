# Documentation

## Endpoints

### Categories

- `GET /api/categories`:
  - Fetches all categories.
  - Requires no parameters.
- `POST /api/categories`:

  - Creates a new category.
  - Requires the following JSON body:
    ```json
    {
      "title": "Sample Category",
      "mediaId": 1,
      "parentId": null,
      "isParent": true
    }
    ```

- `GET /api/categories/{id}`:

  - Retrieves a specific category by its `id`.

- `PUT /api/categories/{id}`:
  - Updates an existing category with the given `id`.
  - Requires the updated JSON body.
- `DELETE /api/categories/{id}`:
  - Deletes a category by its `id`.
  - No body is required for this request.
