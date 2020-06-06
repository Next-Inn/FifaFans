import express from 'express';
import UserController from './../controllers/UserController';
import FriendController from './../controllers/FriendController';
import FollowerController from './../controllers/FollowerController';
import Auth from './../middleware/Auth';

const router = express.Router();

router.get('/search-user', UserController.searchUsers);
router.get('/view-user-details', Auth, UserController.viewUserDetails);
router.post('/follow-user', Auth, FollowerController.followUser);
router.get('/list-followers', Auth, FollowerController.listUserFollowers);
router.get('/check-if-follow', Auth, FollowerController.CheckFollowUser);

export default router;