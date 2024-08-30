import authMiddleware from "../middleware/auth.middleware";
import { attachmentRouter } from "./attachment.route";
import { fileRouter } from "./file.route";
import { folderRouter } from "./folder.route";
import { userRouter } from "./user.route";

const defineRoutes = (app: any) => {
  app.use("/api/users", userRouter);
  app.use("/api/folders", authMiddleware, folderRouter);
  app.use("/api/files", authMiddleware, fileRouter);
  app.use("/api/attachments", attachmentRouter);
};

export { defineRoutes };
