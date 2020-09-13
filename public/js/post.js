const post = document.getElementById('postInput');
const sendPost = document.getElementById("sendPost");
const userPost = document.getElementById("user-posts");
const layout = document.getElementById('post-layout');
let comment = document.getElementsByClassName("comments");
let commentSection = document.getElementsByClassName("comment-section");
let commentButton = document.getElementsByClassName("comment-send");
const userLayout = document.getElementById('media-grid')
const postLayout = document.getElementById('post')
let textArea = document.getElementsByTagName('textarea');
// console.log(textarea)


const allPost = document.getElementById("getAllPosts")

function getLocalImage(image) {
  if (image) return image
  return '/img/21104.svg'
}

function displayProfileImage_(profile) {
  if (profile) {
    return profile.profile_pic  
  } else {
    return 'img/4.jpg'
  }
}

try {
  sendPost.addEventListener("click", createPost);
} catch (error) {
  console.log(error)
}
function createPost() {

  if (post.value == "") {
    Swal.fire('Please type a message');
  } else {
    let file = document.getElementById("image-upload").files[0];
    // readAsDataURL(file)
    console.log(file)
    options.method = 'POST'
    const formData = new FormData();

    // imageUpload.change((e) => {
    //   var clicked = e.target;
    //   var file = clicked.files[0];
    // })


    formData.append('post', post.value);
    formData.append('file', file);
    options.body = formData;
    fetch(`${base}/create-post`, options)
      .then(res => res.json())
      .then(x => {
        console.log(x);
        if (x.status != 'error') {
          // if (file) {

          // }
          Swal.fire(x.data);
          window.location.reload();
        } else {
          Swal.fire(x.error, '', 'error');
        }
      }).catch(e => Swal.fire(e));
  }

    
  }
  

function getMediaType(data) {
  console.log(data);
  const type = data.media.split('.')[3];
  if (type == 'mp4') {
    return `<video width="526" height="500" class="materialboxed"  controls>
    <source src="${data.media}" type="video/mp4">
     Your browser does not support HTML video.
     </video>`;
  }

  if (type == 'jpg' || type == 'png') {
    console.log(type);
    return `<img onclick="showPopUp(this)" src="${data.media}" class="img-fluid img-resized" width="500" alt=""></img>`
  }

  if ( type == undefined) {
    return ``;
  }
 
}

function createCanva(data) {
  console.log(data.post.toString().substring(0, 3))
  if (
    data.post.toString().substring(0, 4) === "http") {
    return `<div class="d-flex justify-content-center align-items-center" style="background: #005391; color: #fff; min-height: 200px;>
    <div class="post-txt d-flex justify-content-center align-items-center">
      <a class="n_link w-100 px-2 py-4 text-center" href="${data.post}" target="_blank" style="font-size:18px;">${data.post}</a>
    </div>
  `;
  } else {
    if (data.media && data.media !== "") {
      return `<p class="comment-p">${data.post}</p>`;
    } else {
      if (data.post.toString().length < 40) {
        return `<div class="post-bg">
        <div class="post-txt">
          <p style="font-size:50px">${data.post}</p>
        </div>
      </div>`;
      } else if (data.post.toString().length >= 40) {
        return `<div class="post-bg">
        <div class="post-txt">
          <p class="small-post" style="font-size:16px;">${data.post}</p>
        </div>
      </div>`;
      }
    }
  }

 
}


// userPost.addEventListener('click', listUserPost)

function listUserPosts() {
    options.method = 'GET'
    fetch(`${base}/list-user-posts`, options)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.status != 'error') {
            const array = [];
            let mediapost = response.data.filter(checkPost).map((x) => {
              return usersMedia(x)
            });
            userLayout.innerHTML = mediapost.join(' ')
            console.log(mediapost)

            response.data.forEach(x => {
              const el = usersPost(x);
              // el.join('')
              array.push(el);
              
            });
            

            // console.log(array)
            postLayout.innerHTML = array.join(" ");

            function checkPost(post) {
              return post.media !== '';
            }
          }
    })
}



const usersPost = (data) => {
  // let layout = document.getElementById('post-layout');
  // layout
  return `<div class="users-post-section">
  <div class="d-flex justify-content-start">
            <div>
                <a href="/img/21104.svg"><img src="/img/21104.svg" class="img-prof"></a>
            </div>
            <div class="tab-profile-detail ml-2">
              <p class="fan-name">${data.owner_name}</p> 
              <p><span class="color-red fan-fn">Coach</span> <span class="fan-time"> 1hrs ago</span></p>
              </div>
      </div
              <p class="my-3">${data.post}</p>
                ${getMediaType(data)}
           
            
        </div>
        <hr style=" border: 1px solid #ccc">`;
}


const usersMedia = (data) => {
  console.log(data)
  // let layout = document.getElementById('post-layout');
  // layout
  return `
    <div class="grid-image">${getMediaType(data)}</div>
  `;
}


{/* <div class="col-12 col-sm-6 col-lg-3">
  <img class="w-100" src="/image-1.jpg" data-target="#carouselExample" data-slide-to="${data.uuid}">
    ${getMediaType(data)}
  </div>

</div>
  <hr style=" border: 2px solid #ccc"> */}

// allPost.addEventListener('click', listAllPosts)

async function listAllPosts() {
    TOAST.welcomeToast();
    options.method = 'GET'
   await fetch(`${base}/list-posts`, options)
        .then((res) => res.json())
        .then((response) => {
         console.log(response);
            if (response.status != 'error') {
                const array = [];
              response.data.forEach(x => { 
                 const el = generalPost(x);
                array.push(el);
                console.log(array)
                });
              layout.innerHTML = array.join(" ");
         }
    })
}


// socket io for posting comments 
function commentPost(post_uuid) {
    
    console.log('i see you')
   
    const post = document.getElementById(`${post_uuid}-comment-input`);
    if (post.value == "") {
      Swal.fire('Type a comment');
    } else {
      TOAST.infoToast('Sending your comment....');
      socketClient.emit('post-comment', { post_uuid, post: post.value })
      post.value = ''
    }
    
  }


function likePost(post_uuid, elem) {
  elem.style.backgroundColor = "lightblue";
  options.method = 'PUT'
  fetch(`${base}/like-post?post_uuid=${post_uuid}&like=${true}`, options)
  .then((res) => res.json())
  .catch(e => TOAST.errorToast('Error occured'))
}  
  

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function deletePost() {
  options.method = 'DELETE'
  fetch(`${base}/delete-post?post_uuid`, options)
  .then((res) => res.json())
}


const displayComments = (data) => {
  console.log('my comment',data);
    const array = [];
    if (data) { 
      console.log(data)
        data.forEach(x => {
        const element = ` <div class="d-flex justify-content-start mt-3">
          <div>
            <img src="${displayProfileImage_(data.profile)}" class="img-prof ">
          </div>
          <div class="ml-2">
            <h4 class="fan-name">${x.user_name}<p class="fan-fn">${x.user_club}<span class="fan-fn"> ${x.user_status}</span></p> <span class="fan-time">${GETDURATION(x.date_sent)}(s) ago</span></h4>
              <p class="comment-p">${x.comment}</p>
          </div>
          
        </div>
        <hr>
         `; 
    array.push(element);    
    });
    }
   return array.join(" ")
}

const displayRoomChats = (data) => {
  const array = [];
  if (data) {
    data.forEach(x => {
      const element = `<div class="comment-bot pd-15">
            <div class="sender-text">
                <p>${user}</p>
                <p> ${message} </p>
            </div>
        </div>`
      array.push(element);
    });
  }
  return array
}
//${ GETDURATION(data.createdAt)}
const generalPost = (data) => {
  console.log(data)
    // let layout = document.getElementById('post-layout');
    // layout
    return `<div class="card mt-5 pd-15" >
                  <div class="d-flex justify-content-start py-2" style="border-bottom: 3px solid #ccc;">
                    <div>
                      <img src="${displayProfileImage_(data.profile)}" class="img-prof">
                    </div>
                    <div class="ml-2">
                    <a href="/profile">
                      <h4 class="fan-name cursor">${
                        data.owner_name
                      }<p class="fan-fn">${
                        data.User.club
                      } <span class="fan-fn">${
                        data.User.status
                      }</span></p> <span class="fan-time">${GETDURATION(data.createdAt)}(s) ago</span></h4>
                    </a>
                    </div>

                  </div>
                  <div id="post-canva" class="py-3">
                      ${createCanva(data)}
                      </div>
                      <div class="img-boxz">
                         ${getMediaType(data)}
                      </div>
                  <div class="tap-content-post">
                    <div class="d-flex justify-content-between m-bd">
                      <p class="p-2 text-center" onclick="likePost('${data.uuid}', this)">
                        <i class="fa fa-thumbs-up"></i> Likes <span class="comment-number">${displayNumber(data.likes)} </span>
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-comments"></i> Comment <span class="comment-number">${displayNumber(data.comment)}</span>
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-share-alt"></i> Share
                      </p>
                    </div>
                    <div class="comment-section scrollable-comments" id="comments${
                      data.uuid
                    }">
                       ${displayComments(data.comment)}
                    </div>

                    <div class="d-flex  pd-155 justify-content-start comments">
                            
                    <form class="form-inline my-2"></form>
                    <div class=" green-border-focus w-100">
                        <textarea name="" placeholder="Write comments..."id="${ data.uuid }-comment-input" class="form-control textarea-autosize"></textarea>
                    </div>

                    <p class="fa fa-send border-none px-2 py-3" onclick="commentPost('${data.uuid}')"></p>
                </div>
</div>                   
                </div>`;
}

{/* <div class="text-center mr-2">
  <img src="${getLocalImage(localStorage.getItem('profile_pics'))}" class="img-prof">
                       
                      </div> */}

// function messageBox() {
//   return `

//   `
// }

function removeMessageBox(e) {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.parentElement.remove();
  }
}


// const tx = document.getElementsByTagName("textarea");
// for (let i = 0; i < tx.length; i++) {
//   tx[i].setAttribute(
//     "style",
//     "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
//   );
//   tx[i].addEventListener("input", OnInput, false);
// }

// function OnInput() {
//   this.style.height = "auto";
//   this.style.height = this.scrollHeight + "px";
// }


const loadPosts = async () => {
  try {
    if (window.location.pathname == '/') {
      await listAllPosts()
      
    } 
    if (window.location.pathname == '/profile') {
      await listUserPosts()
    }

    if (window.location.pathname == '/notification') {
      let notificationCount = document.querySelector('.notification');
      notificationCount.style.display = "none";
    }

  } catch (error) {
    console.log(error);
  }
}

loadPosts()



