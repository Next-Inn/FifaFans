<< << << < HEAD
const edit_profile = document.getElementById('edit_profile');
const change_password = document.getElementById('change_pass');
const details_about_you = document.getElementById('details_abt_you');
const contact_info = document.getElementById('contact_info');
const title = document.getElementById('profile_page_title');

let argUrl = window.location.pathname;
console.log(argUrl);
// if (this.readyState == 4 && this.status == 200) {
//     header.innerHTML = this.responseText;
// }
switch (argUrl) {
    case '/editprofile':

        document.querySelector('#edit_profile').classList.add('active');
        break;
    case '/changepassword':
        console.log(argUrl);
        document.querySelector('#change_pass').classList.add('active');
        break;
    case '/aboutuser':
        document.querySelector('#details_abt_you').classList.add('active');
        break;
    case '/usercontactinfo':
        document.querySelector('#contact_info').classList.add('active');
        break;
    default:
        break;
}

title.innerText = localStorage.getItem('title');

function changeTitle(array_elements, element) {
    array_elements.forEach(x => {
        x.addEventListener('click', () => {
            localStorage.setItem('title', x.innerText);
        })
    });
}


changeTitle([edit_profile, change_password, details_about_you, contact_info], title);
const username_profile = document.getElementById('user-name-header');
const fullname_profile = document.getElementById('user-full-name');
const status_profile = document.getElementById('user-profile-status');
const input_profile_fullname = document.getElementById('input_profile_fullname');
const input_profile_username = document.getElementById('input_profile_username');
const input_profile_email = document.getElementById('input_profile_email');
const input_profile_gender = document.getElementById('input_profile_gender');
const input_profile_status = document.getElementById('input_profile_status');
const input_short_bio_profile = document.getElementById('input_short_bio_profile');
const input_favorite_quote_profile = document.getElementById('input_favorite_quote_profile');
const edit_profile_button = document.getElementById('edit_profile_button');
const old_pass_change_pass = document.getElementById('old_pass_change_pass');
const new_pass_change_pass = document.getElementById('new_pass_change_pass');
const input_address_profile = document.getElementById('input_address_profile');
const input_website_profile = document.getElementById('input_website_profile');
const input_club_profile = document.getElementById('input_club_profile');
const input_language_profile = document.getElementById('input_language_profile');
const new_pass_change_pass_confirm = document.getElementById('new_pass_change_pass_confirm');
const change_pass_btn = document.getElementById('change_pass_btn');
const edit_contact_button = document.getElementById('edit_contact_button');
const logout_user = document.getElementById('logout_user');

if (edit_profile_button) {
    edit_profile_button.addEventListener('click', (e) => {
        editProfile(e)
    })
}

if (change_pass_btn) {
    change_pass_btn.addEventListener('click', (e) => {
        changePassword(e);
    })
}


if (edit_contact_button) {
    edit_contact_button.addEventListener('click', (e) => {
        editProfile(e)
    })
}

if (logout_user) {
    logout_user.addEventListener('click', () => {
        logoutUSer();
    })
}


function logoutUSer() {
    localStorage.removeItem('token');
    window.location.replace('/login');
}



// objects for different profile related page to populate fields

const profileObject = (data) => {
    fullname_profile.innerText = data.name,
        status_profile.innerText = data.status
}

const fillEditInputs = (data) => {
    input_profile_fullname.value = data.name;
    input_profile_email.value = data.email;
    input_profile_username.value = data.username;
    const el = input_profile_status.options;
    Array.from(el).forEach(element => {
        if (element.text == data.status) { element.selected = true }
    });
};

// fill in the details page
const fillInDetails = (data) => {
    input_short_bio_profile.value = data.profiles[0].shortBio;
    input_favorite_quote_profile.value = data.profiles[0].favoriteQuote;
}

const fillContact = (data) => {
    input_club_profile.value = data.club;
    input_address_profile.value = data.address;
    input_language_profile.value = data.profiles[0].language;
    input_website_profile.value = data.profiles[0].website
}

function getProfile() {
    const theToken = localStorage.getItem('token');
    if (!theToken) {
        alert('Please Login')
        window.location.replace("/login");
    }
    fetch('/api/v1/auth/me', {
            method: "GET",
            headers: new Headers({
                'Authorization': `Bearer ${theToken}`
            }),
        })
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
                username_profile.innerText = x.data.username;
                if (window.location.pathname == '/profile') { profileObject(x.data) };
                if (window.location.pathname == '/editprofile') { fillEditInputs(x.data) };
                if (window.location.pathname == '/aboutuser') { fillInDetails(x.data) };
                if (window.location.pathname == '/usercontactinfo') { fillContact(x.data) };
            }
        })
};

// Edit profile

function editProfile(e) {
    console.log(input_address_profile.value);
    e.preventDefault();
    const theToken = localStorage.getItem('token');
    if (!theToken) {
        alert('Please Login')
        window.location.replace("/login");
    }
    // this where the post to server will occur
    const formData = new FormData();
    if (window.location.pathname == '/editprofile') {
        formData.append('name', input_profile_fullname.value);
        formData.append('username', input_profile_username.value);
        formData.append('gender', input_profile_gender.value);
    }

    if (window.location.pathname == '/aboutuser') {
        formData.append('shortBio', input_short_bio_profile.value);
        formData.append('favoriteQuote', input_favorite_quote_profile.value);
    }

    if (window.location.pathname == '/usercontactinfo') {
        formData.append('club', input_club_profile.value);
        formData.append('language', input_language_profile.value);
        formData.append('website', input_website_profile.value);
        formData.append('address', input_address_profile.value);
    }
    fetch('/api/v1/auth/updateprofile', {
            method: "PATCH",
            body: formData,
            headers: new Headers({
                'Authorization': `Bearer ${theToken}`
            }),
        })
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
                alert('update successfully')
                window.location.reload();
            } else { alert(x.error) };
        })
};

// change password
function changePassword(e) {
    e.preventDefault();
    if (!new_pass_change_pass.value || !new_pass_change_pass_confirm.value || !old_pass_change_pass.value) {
        return alert('Please fill in necessary inputs')
    }
    if (new_pass_change_pass.value !== new_pass_change_pass_confirm.value) {
        return alert('New password and confirm password must be the same')
    }
    const theToken = localStorage.getItem('token');
    if (!theToken) {
        alert('Please Login')
        window.location.replace("/login");
    }
    // this where the post to server will occur
    const formData = new FormData();
    formData.append('newPassword', new_pass_change_pass.value);
    formData.append('oldPassword', old_pass_change_pass.value);
    fetch('/api/v1/auth/resetpassword', {
            method: "POST",
            body: formData,
            headers: new Headers({
                'Authorization': `Bearer ${theToken}`
            }),
        })
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
                alert('Password updated successfully')
                window.location.reload();
            } else { alert(x.error) };
        })
};


if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
    getProfile()
}