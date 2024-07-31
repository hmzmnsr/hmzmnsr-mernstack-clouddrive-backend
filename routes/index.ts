import { userRouter } from "./user";

const defineRoutes = (app: any) => {
  app.use(`/api/users`, userRouter);
};

export { defineRoutes };
