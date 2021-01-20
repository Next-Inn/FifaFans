import express from 'express';
import AuthController from './../controllers/AuthController';
import Auth from './../middleware/Auth';

const userRouter = express.Router();

const {
  signup,
  signin,
  me,
  verifyUser,
  forgetpassword,
  verifyPasswordLink,
  resetPassword,
  updateUser,
  getNewEmailToken,
  getAllUserUsernameAndEmail
} = AuthController;

userRouter.post(`/signup`, signup);
// userRouter.post(`/signin`, signin);
// userRouter.get(`/me`, Auth, me);
// userRouter.get(`/verification/:token/:email/:id`, verifyUser);
// userRouter.post(`/forgetpassword`, forgetpassword);
// userRouter.get(`/verifypassword/:token/:email/:id`, verifyPasswordLink);
// userRouter.post(`/resetpassword`, Auth, resetPassword);
// userRouter.patch(`/updateprofile`, Auth, updateUser);
// userRouter.post(`/refresh-email-token`, getNewEmailToken);
// userRouter.get(`/form/validations`, getAllUserUsernameAndEmail);

export default userRouter;
