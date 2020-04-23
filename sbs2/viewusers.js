const sbsURL = "https://new.smilebasicsource.com/api/";
const userURL = "user";
const avatarURL = "File/raw/";
const userSite = 'https://new.smilebasicsource.com/user/';

let usernames = new Array();

let generateTable = function(data) {
    let t = document.getElementById('user-data-display');
    for (let i of data) {
        let r = t.insertRow(-1);
        let idCell = r.insertCell(-1);
        let avCell = r.insertCell(-1);
        let nmCell = r.insertCell(-1);
        let lnCell = r.insertCell(-1);
        let dtCell = r.insertCell(-1);
        idCell.innerHTML = i.id;
        // if the user doesnt have a username, they will have a response of 0
        if (i.avatar != 0)
            avCell.innerHTML = '<img src="' + sbsURL + avatarURL + i.avatar + '?size=48&square=true">';
        else
            avCell.innerHTML = '<img src="http://smilebasicsource.com/user_uploads/avatars/tbdefault.png" class="user-avatar">';
        nmCell.innerHTML = i.username;
        lnCell.innerHTML = '<a href="'+userSite+i.id+'" target="_blank">'+userSite+i.id+'</a>';
        dtCell.innerHTML = i.createDate;
    }
};

document.getElementById('username-search').addEventListener('click', function(e) {
    let ins = document.getElementById('username-search-input');
    if (ins.style.display === 'block') {
        ins.style.display = 'none';
        // reset filtering
        let r = document.querySelectorAll('.defiltered-un');
        for (i of r)
            i.classList.remove('defiltered-un');
        ins.value = '';
    }
    else {
        ins.style.display = 'block';
        // we also want to generate a list of the usernames to search so that we can filter them
        if (usernames.length == 0) {
            let r = document.getElementById('user-data-display').rows;
            usernames.push('');
            for (let i = 1; i < r.length; i++)
                usernames.push(r[i].cells.item(2).innerHTML);
            console.log(usernames);
        }
    }
});

document.getElementById('username-search-input').addEventListener('keyup', function(e) {
    let t = e.target.value.toUpperCase();
    let r = document.getElementById('user-data-display').rows;
    for (let i = 1; i < usernames.length; i++) {
        if (!(usernames[i].toUpperCase().indexOf(t) > -1))
            r[i].classList.add('defiltered-un');
        else
            r[i].classList.remove('defiltered-un');
    }
});

document.addEventListener("DOMContentLoaded", (e) => {
    let sReq = new XMLHttpRequest();
    sReq.onload = function() {
        let d = JSON.parse(this.responseText);
        generateTable(d);
    };
    sReq.onerror = function(err) {
        console.log('-S', err);
    }
    sReq.open('get', sbsURL + userURL, 1);
    sReq.send();
});