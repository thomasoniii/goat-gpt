import { useState, useRef, useEffect } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import UserIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import "@fontsource/roboto/300.css";

function App() {
  const [msg, setMsg] = useState("");
  const [msgs, addMsg] = useState([]);
  const key = useRef(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  const appendMsg = () => {
    const goat = ["Baah"];
    for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
      goat.push("B" + "a".repeat(Math.floor(Math.random() * 10)) + "h");
    }

    addMsg([
      ...msgs,
      { msg, type: "user", key: key.current++ },
      { msg: goat.join(" "), type: "goat", key: key.current++ },
    ]);
    setMsg("");
  };

  const GoatIcon = <img src="/goat.jpg" width="32" height="32" />;

  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center">
        Goat GPT
      </Typography>
      <List
        component="section"
        sx={{
          p: 2,
          border: "1px dashed grey",
          height: "500px",
          overflow: "scroll",
          width: "500px",
          mb: 1,
        }}
      >
        {msgs.map((msg) => (
          <ListItem
            key={msg.key}
            sx={{
              display: "flex",
              justifyContent: msg.type === "goat" ? "flex-end" : "flex-start",
              backgroundColor: msg.type === "goat" ? "#DDFFDD" : "#FFDDFF",
            }}
          >
            {msg.type === "goat" ? "" : <UserIcon />}
            {msg.msg}
            {msg.type === "goat" ? GoatIcon : ""}
          </ListItem>
        ))}
        <ListItem ref={scrollRef} />
      </List>
      <Box
        sx={{
          border: "1px solid black",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={{ m: 1 }}
          size="small"
          fullWidth
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              appendMsg();
            }
          }}
        />

        <Button variant="contained" onClick={appendMsg} sx={{ m: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default App;
