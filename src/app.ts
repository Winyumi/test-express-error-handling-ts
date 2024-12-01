import PastaController from "@/api/pasta.controller";
import PizzaController from "@/api/pizza.controller";
import { HTTPException } from "@/exceptions/httpException";
import express, { type ErrorRequestHandler } from "express";

const app = express();

// Routes
app.use("/pasta", PastaController);
app.use("/pizza", PizzaController);
app.get("/", (req, res) => {
  throw new HTTPException(404, `Sorry! ${Date.now()}`);
});

// Error handling
app.use(<ErrorRequestHandler>((err, req, res, next) => {
  if (!err.code) console.error(err);
  res.status(err.code || 500).json({ error: err.message });
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} - http://localhost:${PORT}`);
});
