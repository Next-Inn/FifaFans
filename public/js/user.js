const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');
const userSearchInput = document.getElementById('userSearchInput')

const searchResult = document.getElementById('search-result-layout')

// addFriend.addEventListener('click', followFriend)

// function followFriend() {
//     options.method = "POST";

//     if (!friendId || friendName) {
//         errorMessage.innerHTML = 'Please put a valid input'
//     } else {
//         const formData = new FormData();
//         formData.append("friend_uuid", friendId.value);
//         formData.append("friend_name", friendName.value);
//         options.body = formData;
//         fetch(`${base}}/add-follow-users`, options)
//           .then((res) => res.json())
//           .then((response) => {
//             console.log(response);
//             if (response.status != "error") {
//               Swal.fire(response.data);
//               window.location.reload();
//             } else {
//               Swal.fire(response.error, "", "error");
//             }
//           })
//           .catch((e) => console.log(e));
//     }
    
// }

// get user details

function getUserDetails(user_uuid) {
    // options.method = "GET";
    // fetch(`${base}/view-user-details?user_uuid=${user_uuid}`, options)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
    // localStorage.setItem("group_uuid", group_uuid);
    window.location.replace(`/friendprofile?user_uuid=${user_uuid}`)
}


 function searchUser() {
   
   console.log('it is getting a string')
  options.method = "GET"
   fetch(`${base}/search-user?input=${userSearchInput.value}`, options)
  .then((res) => res.json())
     .then((response) => {
      console.log(response)
      const array = [];
      response.data.forEach(x => {
        const el = result(x);
        array.push(el);
      });
       searchResult.innerHTML = array.join("");
  }).catch((error) => console.log(error))
}


const result = (data) => {
  return `
  <div class="room-box d-flex">
      <div class="text-center">
        <img src="${ data.icon}" class="img-prof img-fluid">
      </div>
      <div class="room-detail">
        <p onclick="followUser('${data.uuid}')"><strong><span><a href="#">${ data.name}</a></span></strong>
        </p>
      </div>
      <span><button class="btn btn-primary" onclick="followUser('${data.uuid}')">Follow</button></span>
    </div>
  `
}

const followUser = (uuid) => {
      options.method = "POST";
        fetch(`${base}follow-user?user_uuid=${uuid}`, options)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status != "error") {
              Swal.fire(response.data);
            } else {
              Swal.fire(response.error, "", "error");
            }
          })
          .catch((e) => console.log(e));
}

