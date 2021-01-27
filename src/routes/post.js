import express from 'express';
import Auth from './../middleware/Auth';
import PostController from './../controllers/PostController';

const {
  createPost,
  deletePost,
  commentOnPost,
  likePost,
  listUserPosts,
  listPosts
} = PostController;

const router = express.Router();
router.post('/create-post', Auth, createPost);
router.delete('/delete-post', Auth, deletePost);
router.put('/comment-post', Auth, commentOnPost);
router.put('/like-post', Auth, likePost);
router.get('/list-user-posts', Auth, listUserPosts);
router.get('/list-posts', Auth, listPosts);

export default router;
