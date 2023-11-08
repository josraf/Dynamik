import { useState } from "react";

export default function Form({ onAddDevs }) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth_date, setBirthDate] = useState("2023/05/20");
  const [stacks, setStacks] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newDev = {
      name: name,
      nickname: nickname,
      birth_date: birth_date,
      stack: stacks,
    };

    onAddDevs(newDev);

    setName("");
    setNickname("");
    setBirthDate("2023/05/20");
    setStacks("");
  }

  function handleCancel(e) {
    setName("");
    setNickname("");
    setBirthDate("20/05/2023");
    setStacks("");
  }

  const handleStackChange = (e) => {
    const inputValue = e.target.value;
    const stackArray = inputValue.split(",").map((stack) => stack.trim());

    const hasInvalidStack = stackArray.some((stack) => stack.length > 32);

    if (!hasInvalidStack) {
      setStacks(inputValue);
    }
  };

  return (
    <div className="summary">
      <h2>Create your developer profile 👨‍💻</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-left" htmlFor="name">
            Full Name:
          </label>
          <input
            className="input-right"
            type="text"
            id="name"
            placeholder="John Cena"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            required
          />
        </div>

        <div className="form-group">
          <label className="label-left" htmlFor="nickname">
            Nickname:
          </label>
          <input
            className="input-right"
            type="text"
            id="nickname"
            placeholder="Jony123"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label className="label-left" htmlFor="birth_date">
            Birth Date:
          </label>
          <input
            className="input-right"
            type="date"
            id="birth_date"
            placeholder="20-05-2023"
            value={birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label-left" htmlFor="stack">
            Stack:
          </label>
          <textarea
            className="input-right"
            id="stack"
            placeholder="Enter stack, separated by commas"
            value={stacks}
            onChange={handleStackChange}
          />
        </div>

        <div className="button-group">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-add" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
