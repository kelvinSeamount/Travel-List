import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handleDeleteItem,
  handleToggleItem,
  handleClearList,
}) {
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
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}
