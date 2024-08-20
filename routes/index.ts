import authMiddleware from "../middleware/authMiddleware";
import { attachmentRouter } from "./attachment";
import { fileRouter } from "./file";
import { folderRouter } from "./folder";
import { userRouter } from "./user";

const defineRoutes = (app: any) => {
  app.use("/api/users", userRouter);
  app.use("/api/folders", authMiddleware, folderRouter);
  app.use("/api/files", authMiddleware, fileRouter);
  app.use("/api/attachments", attachmentRouter);
};

export { defineRoutes };
