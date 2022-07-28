import express, { Response, Request, NextFunction } from "express";
import group from "../controllers/group";
import validateGroup, {
  createGroupSchema,
  updateGroupSchema,
} from "../validation/groupValidation";
import validateBody from "../middleware/validateBody";
// import { verfiyAccessToken } from "../middleware/auth";

// remove  check with access token
const verfiyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  next();
};

const router = express.Router();

router.get("/", [verfiyAccessToken], group.getAll);
router.get("/conversations", [verfiyAccessToken], group.conversationsList);

router.post(
  "/",
  [verfiyAccessToken, validateBody(validateGroup(createGroupSchema))],
  group.create
);

router.put(
  "/:groupId",
  [verfiyAccessToken, validateBody(validateGroup(updateGroupSchema))],
  group.update
);

router.delete("/:groupId", [verfiyAccessToken], group.remove);

export default router;
