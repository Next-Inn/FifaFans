
const inflateMessage = (chats) => {
    if ( chats.length !== 0) {
        let el;
        chats.forEach(chat => {
          if ( chat.sender_uuid === localStorage.getItem('friend_data')) {
              el = ` <div class="comment-bot pd-15">
                        <div class="sender-text">
                            <p> ${chat.message} </p>
                        </div>
                    </div>`
            } else {
                el = ` <div class="comment-bot pd-15">
                            <div class="sender-text">
                                <p> ${chat.message} </p>
                            </div>
                        </div>`
             }
        });
        return el;
    } else {
        return `<div></div>`
    }
}

const createChatBox = (data) => {
    const messageLayout = document.getElementById('message-layout');
    let html = `
      <div class="pd-15 pb-0">
          <div class="d-flex justify-content-start ">
              <div class="comment-img">
                  <img src="${
                    data["profile"].profile_pic || "img/4.jpg"
                  }" class="img-prof">
              </div>
              <div class="tap-cont-profile pd-3-12 ">
                  <h5 class="font-16 d-flex chat-layout">${data["user"].name}</h5>
                  <p class="font-14">Active: 1hrs ago</p>
              </div>
          </div>
      </div>
      <div class="line-bd"></div>
      <div class="scrollable-text">
         ${inflateMessage(data.chats)}
      </div>
      <div class="line-bd"></div>
      <div class="d-flex  pd-15 justify-content-start">
          <div class="pd-pos">
              <a href="#"><i class="fa fa-image"></i></a>
          </div>
          <div class="pd-pos">
              <a href="#"><i class="fa fa-paperclip"></i></a>
          </div>
              <form class="form-inline my-2"></form>
              <div class=" green-border-focus width-100">
                  <input type="search" placeholder="Type..." aria-label="Search" class="form-control post-input">
                  <button type="submit" class="fa fa-send border-none clip-attach"></button>
              </div>
          </form>
          
      </div>`;
   messageLayout.innerHTML = html;
}



const getFriendMessageData  = (uuid) => {
    options.method = 'GET';
    fetch(`${base}list-friend-message?follower_uuid=${uuid}`, options)
     .then((res) => res.json())
     .then((response) => {
       if (response.status != 'error') {
        console.log('this is response',response);
         createChatBox(response.data);
         };
       
     })
     .catch(e => console.log(e)); 
  }

  if ( window.location.pathname === '/message') {

    const data = localStorage.getItem('friend_data');
     getFriendMessageData(data);
 }