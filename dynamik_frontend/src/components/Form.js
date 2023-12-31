import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    setBirthDate(null);
    setStacks("");
  }

  function handleCancel() {
    if (window.confirm("Are you sure?")) {
      setName("");
      setNickname("");
      setBirthDate(null);
      setStacks("");
    }
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
    <>
      <form className="pretty-form" onSubmit={handleSubmit}>
        <h2>Create your developer profile 👨‍💻</h2>
        <TextField
          sx={{ mb: 1, mt: 1, backgroundColor: "white" }}
          label="Full Name"
          variant="outlined"
          fullWidth
          id="name"
          placeholder="John Cena"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={32}
          required
        />

        <TextField
          sx={{ mb: 1, mt: 1, backgroundColor: "white" }}
          label="Nickname"
          variant="outlined"
          fullWidth
          id="nickname"
          placeholder="Jony123"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={100}
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ mb: 1, mt: 1, backgroundColor: "white" }}
            label="Birth date"
            onChange={setBirthDate}
            required
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>

        <TextField
          sx={{ mb: 1, mt: 1, backgroundColor: "white" }}
          label="Enter stack, separated by commas"
          variant="outlined"
          fullWidth
          id="stack"
          placeholder="Enter stack, separated by commas"
          value={stacks}
          onChange={handleStackChange}
        />

        <div className="button-group">
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button className="btn-add" variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
    </>
  );
}
