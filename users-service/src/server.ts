import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});