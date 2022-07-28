import express from "express";
import message from "../controllers/message";
import validateMessage, {
  createMessageSchema,
  updateMessageSchema,
} from "../validation/messageValidation";
import validateBody from "../middleware/validateBody";
import { verfiyAccessToken } from "../middleware/auth";

const router = express.Router();

router.get("/", [verfiyAccessToken], message.getAll);

router.post(
  "/",
  [verfiyAccessToken, validateBody(validateMessage(createMessageSchema))],
  message.create
);

router.put(
  "/:messageId",
  [verfiyAccessToken, validateBody(validateMessage(updateMessageSchema))],
  message.update
);

router.delete("/:messageId", [verfiyAccessToken], message.remove);

export default router;
