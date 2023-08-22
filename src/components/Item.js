export default function Item({ itemobj, handleDeleteItem, handleToggleItem }) {
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
