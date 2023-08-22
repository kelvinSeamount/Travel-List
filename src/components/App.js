import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  //LIFTING STATE

  //Default value for the state will be ARRAY
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    //adding or updating wihout mutating
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    //We call setItem function to display the arrays

    //we use filter method because we want to delete an item array
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //IMPLMENTING CLEAR LIST
  function handleClearList() {
    const confirmed = window.confirm("Are you sure to delete");

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form newAddItem={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
