import { Link, LoaderFunction } from "react-router-dom";
import { getItems, deleteItem, Item } from "app/data";
import { Form, json, useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = () => {
  return json(getItems());
};

export default function Index() {
  const items: Item[] = useLoaderData();

  return (
    <div>
      <div id="heading-container">
        <button id="create-button">
          <Link to="/new">Create Item</Link>
        </button>
        <h2>Items List</h2>
      </div>
      <ul>
        {items.map((item) => (
          <Link to={`/item/${item.id}`}>
            <p key={item.id}>
              <span><b>{item.name}</b>: {item.description}</span>
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
