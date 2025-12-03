import { Reorder } from "framer-motion";
import { useState } from "react";

export default function Test() {
  const [items, setItems] = useState(["A", "B", "C", "D"]);

  return (
    <Reorder.Group 
      axis="y" 
      values={items} 
      onReorder={setItems}
      style={{ width: "200px", margin: "50px auto" }}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item}
          value={item}
          style={{
            padding: "10px",
            marginBottom: "10px",
            background: "skyblue",
            cursor: "grab",
            borderRadius: "8px",
            textAlign: "center"
          }}
          whileDrag={{ scale: 1.1 }}
        >
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
