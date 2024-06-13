import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import "@fontsource/roboto/300.css";

const useThemeDetector = () => {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (e) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme ? "dark" : "light";
};

function App() {
  const [msg, setMsg] = useState("");
  const [msgs, addMsg] = useState([]);
  const key = useRef(0);
  const scrollRef = useRef(null);

  const currentTheme = useThemeDetector();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
        },
      }),
    [currentTheme]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  const appendMsg = () => {
    const goat = [];
    for (let i = 0; i < 1 + Math.floor(Math.random() * 6); i++) {
      goat.push("B" + "a".repeat(1 + Math.floor(Math.random() * 9)) + "h");
    }

    addMsg([
      ...msgs,
      { msg, type: "user", key: key.current++ },
      { msg: goat.join(" "), type: "goat", key: key.current++ },
    ]);
    setMsg("");
  };

  const GoatIcon = <img src="/goat-gpt/goat.jpg" width="32" height="32" />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                color: "black",
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
            autoFocus
          />

          <Button variant="contained" onClick={appendMsg} sx={{ m: 1 }}>
            Send
          </Button>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <a href="https://github.com/thomasoniii/goat-gpt" target="_blank">
            https://github.com/thomasoniii/goat-gpt
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
