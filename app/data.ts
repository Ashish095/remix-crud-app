import invariant from "tiny-invariant";

export interface Item {
  id: string;
  name: string;
  description: string;
}

let items: Item[] = [
  { id: Math.random().toString(36).substring(2, 9), name: "Chris Evans", description: "Marvel's Captain America" },
  { id: Math.random().toString(36).substring(2, 9), name: "Jack Hugeman", description: "When enemies rise... when immortality ends... the ultimate battle begins." },
  { id: Math.random().toString(36).substring(2, 9), name: "Johnny Depp", description: "Not all treasure is silver and gold, mate." },
];

let nextId = 4;

export const getItems = () => items;

export const getItem = (id: string) => items.find(item => item.id === id);

export const createItem = (name: string, description: string) => {
  const newItem = { id: Math.random().toString(36).substring(2, 9), name, description };
  items.push(newItem);
  return newItem;
};

export const updateItem = (id: string, name: string, description: string) => {
  const item = items.find(item => item.id === id);
  if (item) {
    item.name = name;
    item.description = description;
    return item;
  }
  return null;
};

export const deleteItem = (id: string) => {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    return deletedItem[0];
  }
  return null;
};
