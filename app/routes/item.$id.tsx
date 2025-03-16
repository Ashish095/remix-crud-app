import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getItem, Item, updateItem } from "app/data";
import invariant from "tiny-invariant";

export let loader: LoaderFunction = ({ params }) => {
  invariant(params.id, "Missing contactId param");
  const item = getItem(params.id);
  if (!item) {
    throw new Response("Item not found", { status: 404 });
  }
  return json(item);
};

export let action: ActionFunction = ({ request, params }) => {
  return request.formData().then((formData) => {
    invariant(params.id, "Missing contactId param");
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const updatedItem = updateItem(params.id, name, description);

    if (updatedItem) {
      return redirect("/");
    }
    throw new Response("Failed to update item", { status: 500 });
  });
};

export default function EditItem() {
  const item: Item = useLoaderData();

  return (
    <div id="edit-container">
      <h2>Edit Item</h2>
      <Form key={item.id} id="edit-form" method="post">
        <div id="input-container">
          <div className="margin-16">
            <label>Name:</label>&nbsp;
            <input type="text" name="name" defaultValue={item.name} required />
          </div>
          <div className="margin-16">
            <label>Description:</label>&nbsp;
            <input
              type="text"
              name="description"
              defaultValue={item.description}
              required
            />
          </div>
        </div>
        <button type="submit">Update</button>
      </Form>
      <Form
        action="destroy"
        method="post"
        onSubmit={(event) => {
          const response = confirm(
            "Please confirm you want to delete this record."
          );
          if (!response) {
            event.preventDefault();
          }
        }}
      >
        <button className="delete-button" type="submit">Delete</button>
      </Form>
    </div>
  );
}
