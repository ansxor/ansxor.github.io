const sbsURL = "https://new.smilebasicsource.com/api/";
const userURL = "user";
const avatarURL = "File/raw/";
const userSite = 'https://new.smilebasicsource.com/user/';

let usernames = new Array();
let ids = new Array();

let generateTable = function(data) {
    let t = document.getElementById('user-data-display').tBodies[0];
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

let getSearchTypeName = function(id) {
    return id.substring(0, id.indexOf('-'));
}

// this is just to reduce amount of code needed lol
let getSearchTypeArr = function(id) {
    let i = getSearchTypeName(id);
    if (i == 'username')
        return usernames;
    else
        return ids;
}

let searchToggle = function(e) {
    let id = e.target.id;
    let nm = getSearchTypeName(id);
    let ins = document.getElementById(nm+'-search-input');
    if (ins.style.display === 'block') {
        ins.style.display = 'none';
        // reset filtering
        console.log('owo');
        let r = document.querySelectorAll('.defiltered-'+nm);
        for (i of r)
            i.classList.remove('defiltered-'+nm);
        ins.value = '';
    }
    else {
        ins.style.display = 'block';
        let arr = getSearchTypeArr(id);
        let index = ['id','','username','',''].indexOf(nm);
        if (arr.length == 0) {
            let r = document.getElementById('user-data-display').tBodies[0].rows;
            arr.push('');
            for (let i = 1; i < r.length; i++)
                arr.push(r[i].cells.item(index).innerHTML);
        }
        ins.focus();
    }
};

let searchTyping = function(e) {
    let id = e.target.id;
    let t = e.target.value.toUpperCase();
    let r = document.getElementById('user-data-display').tBodies[0].rows;
    let nm = getSearchTypeName(id);
    let arr = getSearchTypeArr(id);
    for (let i = 1; i < arr.length; i++) {
        if (!(arr[i].toUpperCase().indexOf(t) > -1))
            r[i].classList.add('defiltered-'+nm);
        else
            r[i].classList.remove('defiltered-'+nm);
    }
};

document.getElementById('username-search').addEventListener('click', (e) => {searchToggle(e)});
document.getElementById('username-search-input').addEventListener('keyup', (e) => {searchTyping(e)});
document.getElementById('id-search').addEventListener('click', (e) => {searchToggle(e)});
document.getElementById('id-search-input').addEventListener('keyup', (e) => {searchTyping(e)});

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