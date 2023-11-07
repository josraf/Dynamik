import { useState } from "react";

export default function Form({ onAddDevs }) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth_date, setBirthDate] = useState("2023/05/20");
  const [stack, setStack] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newDev = {
      name: name,
      nickname: nickname,
      birth_date: birth_date,
      stack: stack,
    };

    onAddDevs(newDev);

    setName("");
    setNickname("");
    setBirthDate("2023/05/20");
    setStack([]);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Create your dev 👨‍💻</h3>
      <input
        type="text"
        placeholder="John..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        max={32}
        required
      />
      <input
        type="text"
        placeholder="Jony..."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        max={100}
        required
      />
      <input
        type="date"
        placeholder="2023/05/20..."
        value={birth_date}
        onChange={(e) => setBirthDate(e.target.value)}
        format="YYYY-MM-DD"
        required
      />
      <input
        type="text"
        placeholder="React..."
        value={stack}
        onChange={(e) => setStack(e.target.value)}
      />
      <button className="btn-add">Add</button>
    </form>
  );
}
