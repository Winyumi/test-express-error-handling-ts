import { HTTPException } from "@/exceptions/httpException";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  throw new HTTPException(400, `Pizza! ${Date.now()}`);
});

export default router;
