import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile, Follower } = model;

const FollowerController = {
  async followUser(req, res) {
      try {
        const { uuid } = req.userData;  
        const { user_uuid } = req.query;
        const user = await helperMethods.checkForFollower(Follower, user_uuid, uuid);
        if(user)return sendErrorResponse(res, 403, 'User already followed');
        await helperMethods.createFollower(Follower, uuid, user_uuid);
        return sendSuccessResponse(res, 200, 'Followed successfully');
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred following user');
      };
  },
  
  // view a user followers
  async listUserFollowers(req, res) {
      try {
          const { uuid } = req.userData;
        //  const { user_uuid } = req.query;
         const user = await helperMethods.listAllFollowers(Follower, uuid);
         if (!user) return sendErrorResponse(res, 404, 'User not found');
         return sendSuccessResponse(res, 200, user);
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred viewing user details');
      }
  },

  // check if a user is following another
  async CheckFollowUser(req, res) {
    try {
      const { uuid } = req.userData;  
      const { user_uuid } = req.query;
      const user = await helperMethods.checkForFollower(Follower, user_uuid, uuid);
      if (!user) return sendSuccessResponse(res, 201, false);
      return sendSuccessResponse(res, 201, true);
    } catch (e) {
        console.log(e);
        return sendErrorResponse(res, 500, 'An error occurred following user');
    };
},
};

export default FollowerController;
