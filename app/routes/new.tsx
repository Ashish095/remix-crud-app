// app/routes/new.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createItem } from "app/data";

// Action to handle item creation
export let action: ActionFunction = ({ request }) => {
  return request.formData().then((formData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    // Create the new item
    createItem(name, description);

    return redirect("/");
  });
};

export default function NewItem() {
  return (
    <div id="create-container">
      <h1>Create New Item</h1>
      <Form method="post">
        <div className="margin-16">
          <label>Name:</label>&nbsp;
          <input type="text" name="name" required />
        </div>
        <div className="margin-16">
          <label>Description:</label>&nbsp;
          <input type="text" name="description" required />
        </div>
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}
