const addPost = document.querySelector('#new-post-button')
const postForm = document.querySelector('#post-form')
const sortOldest = document.querySelector('#sortoldest')
const sortNewest = document.querySelector('#sortnewest')
const postContainer = document.querySelector('.post-container')
const cookies = document.cookie.split(';')

let loginStatus = false;

for(let cookie of cookies) {
    cookie = cookie.trim()
    if(cookie.startsWith('pikachu')) {
        loginStatus = true;
    }
}

console.log(loginStatus)

function retrievePosts(sort='') {
    $.ajax({
        type: "GET",
        url: "lib/get_posts.php" + (sort ? `?sort=${sort}` : ''),
        success: (res) => {
            let postRes = JSON.parse(res)
            if(loginStatus) {
                for(let post of postRes) {
                    let postDiv = document.createElement('div')
                    let poster = document.createElement('p')
                    poster.textContent = `Posted by ${post.name} on ${post.time}`
                    let postContent = document.createElement('p')
                    postContent.style.fontStyle = 'italic'
                    postContent.style.fontWeight = 'bold'
                    postContent.style.paddingLeft = '3em'
                    postContent.textContent = `${post.title}`
                    let expand = document.createElement('a')
                    expand.href = `view.php?postid=${post.id}`
                    expand.textContent = "(expand)"
                    let deleteitem = document.createElement('a')
                    deleteitem.href = `lib/delete.php?postid=${post.id}`
                    deleteitem.textContent = "(Delete)"
                    postContent.appendChild(expand)
                    postContent.appendChild(deleteitem)
                    postDiv.appendChild(poster)
                    postDiv.appendChild(postContent)
                    postContainer.appendChild(postDiv)
                }
            } else {
                for(let post of postRes) {
                    let postDiv = document.createElement('div')
                    let poster = document.createElement('p')
                    poster.textContent = `Posted by ${post.name} on ${post.time}`
                    let postContent = document.createElement('p')
                    postContent.style.fontStyle = 'italic'
                    postContent.style.fontWeight = 'bold'
                    postContent.style.paddingLeft = '3em'
                    postContent.textContent = `${post.title}`
                    let expand = document.createElement('a')
                    expand.href = `view.php?postid=${post.id}`
                    expand.textContent = "(expand)"
                    postContent.appendChild(expand)
                    postDiv.appendChild(poster)
                    postDiv.appendChild(postContent)
                    postContainer.appendChild(postDiv)
                }
            }
        }
    })
}

addPost.addEventListener('click', (e) => {
    e.preventDefault()
    postForm.classList.toggle('hide')
})

$(document).ready(() => {
    retrievePosts()
})

sortOldest.addEventListener('click', (e) => {
    e.preventDefault()
    while(postContainer.firstElementChild) {
        postContainer.removeChild(postContainer.lastElementChild)
    }
    retrievePosts('ASC')
})

sortNewest.addEventListener('click', (e) => {
    e.preventDefault()
    while(postContainer.firstElementChild) {
        postContainer.removeChild(postContainer.lastElementChild)
    }
    retrievePosts('DESC')
})