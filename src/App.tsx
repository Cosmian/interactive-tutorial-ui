import { Button } from "cosmian_ui";
import "cosmian_ui/style.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>
    </>
  );
}

export default App;
