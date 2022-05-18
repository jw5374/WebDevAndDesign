const addComment = document.querySelector('#new-comment-button')
const commentForm = document.querySelector('#post-comment-form')
const postidval = document.querySelector('#postidfield').value
const sortOldest = document.querySelector('#sortcommentoldest')
const sortNewest = document.querySelector('#sortcommentnewest')
const commentContainer = document.querySelector('.comment-container')
const cookies = document.cookie.split(';')

let loginStatus = false;

for(let cookie of cookies) {
    cookie = cookie.trim()
    if(cookie.startsWith('pikachu')) {
        loginStatus = true;
    }
}

function retrieveComments(postId, sort='') {
    $.ajax({
        type: "GET",
        url: "lib/get_comments.php?postid=" + postId + (sort ? `&sort=${sort}` : ''),
        success: (res) => {
            let commentRes = JSON.parse(res)
            if(loginStatus) {
                for(let comment of commentRes) {
                    let commentDiv = document.createElement('div')
                    let commenter = document.createElement('p')
                    commenter.textContent = `Commented by ${comment.name} on ${comment.time}`
                    let commentContent = document.createElement('p')
                    commentContent.style.fontStyle = 'italic'
                    commentContent.style.fontWeight = 'bold'
                    commentContent.style.paddingLeft = '3em'
                    commentContent.textContent = `${comment.body}`
                    let deleteitem = document.createElement('a')
                    deleteitem.href = `lib/delete.php?commentid=${comment.id}&referer=${postId}`
                    deleteitem.textContent = "(Delete)"
                    commentContent.appendChild(deleteitem)
                    commentDiv.appendChild(commenter)
                    commentDiv.appendChild(commentContent)
                    commentContainer.appendChild(commentDiv)
                }
            } else {
                for(let comment of commentRes) {
                    let commentDiv = document.createElement('div')
                    let commenter = document.createElement('p')
                    commenter.textContent = `Commented by ${comment.name} on ${comment.time}`
                    let commentContent = document.createElement('p')
                    commentContent.style.fontStyle = 'italic'
                    commentContent.style.fontWeight = 'bold'
                    commentContent.style.paddingLeft = '3em'
                    commentContent.textContent = `${comment.body}`
                    commentDiv.appendChild(commenter)
                    commentDiv.appendChild(commentContent)
                    commentContainer.appendChild(commentDiv)
                }
            }
        }
    })
}

addComment.addEventListener('click', (e) => {
    e.preventDefault()
    commentForm.classList.toggle('hide')
})

$(document).ready(() => {
    retrieveComments(postidval)
})

sortOldest.addEventListener('click', (e) => {
    e.preventDefault()
    while(commentContainer.firstElementChild) {
        commentContainer.removeChild(commentContainer.lastElementChild)
    }
    retrieveComments(postidval, 'ASC')
})

sortNewest.addEventListener('click', (e) => {
    e.preventDefault()
    while(commentContainer.firstElementChild) {
        commentContainer.removeChild(commentContainer.lastElementChild)
    }
    retrieveComments(postidval, 'DESC')
})