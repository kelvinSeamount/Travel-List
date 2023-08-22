import { useState } from "react";

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
  return (
    <div className="app">
      <Logo />
      <Form newAddItem={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌴 Far Away 🧳</h1>
    </div>
  );
}

function Form({ newAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    newAddItem(newItem);
    //To go back to intial stage
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤦‍♂️</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleDeleteItem, handleToggleItem }) {
  //IMPLEMENT SORTING
  const [sortby, setSortBy] = useState("input");

  let sortedItems;
  //SortedItems replaces
  if (sortby === "input") sortedItems = items;
  if (sortby === "decription")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  //Here we use rendering list
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            itemobj={item}
            handleDeleteItem={handleDeleteItem}
            key={item.id}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortby} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ itemobj, handleDeleteItem, handleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemobj.packed}
        onChange={() => handleToggleItem(itemobj.id)}
      />
      <span style={itemobj.packed ? { textDecoration: "line-through" } : {}}>
        {itemobj.quantity}
        {itemobj.description}
      </span>
      {/*HERE REACT CALLS THE FUNCTION ONLY WHEN EVENT HAPPENS */}
      <button onClick={() => handleDeleteItem(itemobj.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing List</em>
      </p>
    );

  //IMPLEMENTING DERIVED STATE
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready"
          : `🧳 You have ${numItems} on your list, and you already packed ${numPacked}
        (${percentage}%)`}
      </em>
    </footer>
  );
}
