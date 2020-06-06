import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile } = model;


// helper method for mediaType
function getMediaType(data) {
  console.log(data);
  const type = data.media.split('.')[3];
  if (type == 'mp4') {
    return `<video width="526" class="materialboxed"  controls>
    <source src="${data.media}" type="video/mp4">
     Your browser does not support HTML video.
     </video>`;
  }

  if (type == 'jpg' || type == 'png') {
    console.log(type);
    return `<img src="${data.media}" class="img-fluid" width="526" alt=""></img>`
  }

  if ( type == undefined) {
    return ``;
  }
 
}

const UserController = {
  async searchUsers(req, res) {
      try {
        const { input } = req.query;
        const users = await helperMethods.searchForUser(User, input);
        return sendSuccessResponse(res, 200, users);
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred finding user');
      };
  },
  
  // view a user detail
  async viewUserDetails(req, res) {
      try {
         let id;
         let uuid;
         if (req.userData) {
          uuid = req.userData.uuid
         }
         const { user_uuid } = req.query;
         if (!user_uuid) {
           id = uuid;
         } else {
           id = user_uuid
         }
         const user = await helperMethods.getAUserByUuid(User, id);
         if (!user) return sendErrorResponse(res, 404, 'User not found');
        //  return sendSuccessResponse(res, 200, user);
        const posts = await user.posts.map((x) => {
         x.media = getMediaType(x);
         return x;
        })
        user.posts = posts;
        return res.render('friendprofile', { user });
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred viewing user details');
      }
  }
};

export default UserController;
