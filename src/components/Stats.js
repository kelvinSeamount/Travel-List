export default function Stats({ items }) {
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
