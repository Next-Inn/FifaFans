const errorMessage = document.getElementById('alert_message');
const submit = document.getElementById('submit');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const club = document.getElementById('club');
const status = document.getElementById('status');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const checkbox = document.getElementById('checkbox');

if (submit) {
    submit.addEventListener('click', onsubmit);
}

 
function onsubmit(e) {
    console.log(club.value);
    e.preventDefault();
    TOAST.infoToast('Please wait whie we sign you up')

    if (!fullName.value || !userName.value || !email.value || !club.value || status.value === "" || password.value === "" || confirmPassword.value === "") {
        errorMessage.innerHTML = 'Please enter all fields';
        if (errorMessage.style.display == 'none') {
            errorMessage.style.display = 'block'
            TOAST.errorToast('Please enter all fields');
        }
        setTimeout(function() {
            errorMessage.style.display = 'none';
        }, 10000);

    } else if (password.value !== confirmPassword.value) {
        TOAST.errorToast('Password doesn\'t match')
        document.getElementById('pass-message').style.display = 'block';
        document.getElementById('pass-message').innerHTML = 'Password doesn\'t match';
        setTimeout(function() {
            document.getElementById('pass-message').style.display = 'none';
        }, 10000);

    } else {
        // this where the post to server will occur
        const formData = new FormData();
        formData.append('name', fullName.value);
        formData.append('username', userName.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('role', 'user');
        formData.append('club', club.value);
        formData.append('status', status.value);
        fetch('/api/v1/auth/signup', {
                method: "POST",
                body: formData,
            })
            .then(res => res.json())
            .then(x => {
                console.log(x);
                if (x.status != 'error') {
                    errorMessage.innerHTML = x.data.message;
                    return window.location.href = '/verify';
                } else {
                    errorMessage.innerHTML = x.error;
                }
            }).catch(e => TOAST.errorToast(e));
    }
}