import { userRouter } from "./user";
import { folderRouter } from "./folder";
import { fileRouter } from "./file";
import { attachmentRouter } from "./attachment";

const defineRoutes = (app: any) => {
  app.use("/api/users", userRouter);
  app.use("/api/folders", folderRouter);
  app.use("/api/files", fileRouter);
  app.use("/api/attachments", attachmentRouter);
};
 
export { defineRoutes };