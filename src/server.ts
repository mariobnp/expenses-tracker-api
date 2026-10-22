import { app } from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Berjalan di http://localhost:${PORT}`);
});