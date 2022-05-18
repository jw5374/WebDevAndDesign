const username = document.querySelector('#usernamefield')
const usernamebutton = document.querySelector('#username-button')
const usernameerror = document.querySelector("#usernameerror")
const chatlog = document.querySelector('#chatlog')
const createRoom = document.querySelector('#addchat')
const roomname = document.querySelector('#chatname')
const changeRoom = document.querySelector('#chat-select')
const messageinput = document.querySelector('#message-input')
const messagebutton = document.querySelector('#message-button')
const messageerror = document.querySelector("#messageerror")
const changeUser = document.querySelector('#changeuser')
const cookies = document.cookie.split(";")
let scrolling = false;

for(let cookie of cookies) {
    cookie = cookie.trim()
    if(cookie.startsWith("PHPSESSID")) {
        username.parentElement.classList.add('hide')
        chatlog.parentElement.classList.remove('hide')
    }
}

function regUser(user) {
    $.ajax({
        type: "POST",
        url: "lib/userreg.php",
        data: {
            username: user
        },
        success: (res) => {
            if(res) {
                let response = JSON.parse(res)
                alert(response.error) // for simplicity
                return
            }
            username.parentElement.classList.add('hide')
            chatlog.parentElement.classList.remove('hide')
        }
    })
}

function fetchMessages(chatid) {
    $.ajax({
        type: "GET",
        url: "lib/getmessages.php",
        data: {
            chatid: chatid
        },
        success: (res) => {
            let chatcontent = ""
            let parsed = JSON.parse(res)
            for(let message of parsed) {
                chatcontent += message.name + ": " + message.message + "\n"
            }
            chatlog.textContent = chatcontent
        }
    })
}

function sendMessage(chatid) {
    if(messageinput.value.length < 1) {
        messageinput.style.border = "2px solid red"
        messageerror.classList.remove('hide')
    } else {
        messageinput.style.border = ""
        messageerror.classList.add('hide')
        $.ajax({
            type: "POST",
            url: "lib/savemessage.php",
            data: {
                chatid: chatid,
                message: messageinput.value
            },
            success: (res) => {
                if(res) {
                    let response = JSON.parse(res)
                    alert(response.error) // for simplicity
                    return
                }
                messageinput.value = ''
                fetchMessages(chatid)
            }
        })
    }
}

setInterval(() => { fetchMessages(changeRoom.value); if(!scrolling) { chatlog.scrollTop = chatlog.scrollHeight } }, 3000)

chatlog.addEventListener('mouseenter', () => {
    scrolling = true;
})

chatlog.addEventListener('mouseleave', () => {
    scrolling = false;
})

usernamebutton.addEventListener('click', () => {
    let reg = /^[a-z0-9]+$/i
    if(username.value.length < 5 || (username.value.match(reg) == null)) {
        username.style.border = "2px solid red"
        usernameerror.classList.remove('hide')
    } else {
        username.style.border = ""
        usernameerror.classList.add('hide')
        regUser(username.value)
        username.value = ""
    }
})

messagebutton.addEventListener('click', () => {
    sendMessage(changeRoom.value)
    fetchMessages(changeRoom.value)
    chatlog.scrollTop = chatlog.scrollHeight
})

createRoom.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: "lib/add_chatroom.php",
        data: {
            chatname: roomname.value
        },
        success: (res) => {
            if(res) {
                let response = JSON.parse(res)
                alert(response.error) // for simplicity
                return
            }
            roomname.value = ''
            location.reload()
        }
    })
})

changeUser.addEventListener('click', () => {
    username.parentElement.classList.remove('hide')
    chatlog.parentElement.classList.add('hide')
})

changeRoom.addEventListener('change', () => {
    fetchMessages(changeRoom.value)
})