const resultContainer = document.querySelector('.queryresults')
const sortOldest = document.querySelector('#sortsearcholdest')
const sortNewest = document.querySelector('#sortsearchnewest')
const filterSearch = document.querySelector('#searchfilter')
const cookies = document.cookie.split(';')

let loginStatus = false;

for(let cookie of cookies) {
    cookie = cookie.trim()
    if(cookie.startsWith('pikachu')) {
        loginStatus = true;
    }
}

function sortResults(results, order) {
    if(order) {
        results.sort((a, b) => {
            if(BigInt(a.dataset.timestamp) < BigInt(b.dataset.timestamp)) {
                return 1
            } else if(BigInt(a.dataset.timestamp) > BigInt(b.dataset.timestamp)) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        results.sort((a, b) => {
            if(BigInt(a.dataset.timestamp) < BigInt(b.dataset.timestamp)) {
                return -1
            } else if(BigInt(a.dataset.timestamp) > BigInt(b.dataset.timestamp)) {
                return 1
            } else {
                return 0
            }
        })
    }
}

function filterResults(resultArray, val) {
    let filtered
    switch(val) {
        case "posts-comments":
            filtered = resultArray.filter((res) => {
                return (res.dataset.type == "post") || (res.dataset.type == "comment")
            })
            break
        case "posts":
            filtered = resultArray.filter((res) => {
                return res.dataset.type == "post"
            })
            break
        case "comments":
            filtered = resultArray.filter((res) => {
                return res.dataset.type == "comment"
            })
            break
    }
    return filtered
}

function hideResults(resultArray) {
    for(let item of resultArray) {
        item.classList.add('hide')
    }
}

if(results.length == 0) {
    resultContainer.textContent = "Sorry your search came back with no results. Please try with fewer search terms, or something less specific."
} else {
    results.sort((a, b) => {
        if(BigInt(a.timestamp) < BigInt(b.timestamp)) {
            return 1
        } else if(BigInt(a.timestamp) > BigInt(b.timestamp)) {
            return -1
        } else {
            return 0
        }
    })
    if(loginStatus) {
        for(let result of results) {
            console.log(result)
            if(result.postid) {
                let commentDiv = document.createElement('div')
                let commenter = document.createElement('p')
                commenter.textContent = `Commented by ${result.name} on ${result.time} `
                let parentPost = document.createElement('a')
                parentPost.href = `view.php?postid=${result.postid}`
                parentPost.textContent = "(go to parent post)"
                commenter.appendChild(parentPost)
                let commentContent = document.createElement('p')
                commentContent.style.fontStyle = 'italic'
                commentContent.style.fontWeight = 'bold'
                commentContent.style.paddingLeft = '3em'
                commentContent.textContent = `${result.body}`
                let deleteitem = document.createElement('a')
                deleteitem.href = `lib/delete.php?commentid=${result.id}&query=${result.querystring}`
                deleteitem.textContent = "(Delete)"
                commentContent.appendChild(deleteitem)
                commentDiv.appendChild(commenter)
                commentDiv.appendChild(commentContent)
                commentDiv.dataset.timestamp = result.timestamp
                commentDiv.dataset.type = "comment"
                resultContainer.appendChild(commentDiv)
            } else if(result.title) {
                let postDiv = document.createElement('div')
                let poster = document.createElement('p')
                poster.textContent = `Posted by ${result.name} on ${result.time}`
                let postContent = document.createElement('p')
                postContent.style.fontStyle = 'italic'
                postContent.style.fontWeight = 'bold'
                postContent.style.paddingLeft = '3em'
                postContent.textContent = `${result.title}`
                let expand = document.createElement('a')
                expand.href = `view.php?postid=${result.id}`
                expand.textContent = "(expand)"
                let deleteitem = document.createElement('a')
                deleteitem.href = `lib/delete.php?postid=${result.id}&query=${result.querystring}`
                deleteitem.textContent = "(Delete)"
                postContent.appendChild(expand)
                postContent.appendChild(deleteitem)
                postDiv.appendChild(poster)
                postDiv.appendChild(postContent)
                postDiv.dataset.timestamp = result.timestamp
                postDiv.dataset.type = "post"
                resultContainer.appendChild(postDiv)
            }
        }
    } else {
        for(let result of results) {
            if(result.postid) {
                let commentDiv = document.createElement('div')
                let commenter = document.createElement('p')
                commenter.textContent = `Commented by ${result.name} on ${result.time} `
                let parentPost = document.createElement('a')
                parentPost.href = `view.php?postid=${result.postid}`
                parentPost.textContent = "(go to parent post)"
                commenter.appendChild(parentPost)
                let commentContent = document.createElement('p')
                commentContent.style.fontStyle = 'italic'
                commentContent.style.fontWeight = 'bold'
                commentContent.style.paddingLeft = '3em'
                commentContent.textContent = `${result.body}`
                commentDiv.appendChild(commenter)
                commentDiv.appendChild(commentContent)
                commentDiv.dataset.timestamp = result.timestamp
                commentDiv.dataset.type = "comment"
                resultContainer.appendChild(commentDiv)
            } else if(result.title) {
                let postDiv = document.createElement('div')
                let poster = document.createElement('p')
                poster.textContent = `Posted by ${result.name} on ${result.time}`
                let postContent = document.createElement('p')
                postContent.style.fontStyle = 'italic'
                postContent.style.fontWeight = 'bold'
                postContent.style.paddingLeft = '3em'
                postContent.textContent = `${result.title}`
                let expand = document.createElement('a')
                expand.href = `view.php?postid=${result.id}`
                expand.textContent = "(expand)"
                postContent.appendChild(expand)
                postDiv.appendChild(poster)
                postDiv.appendChild(postContent)
                postDiv.dataset.timestamp = result.timestamp
                postDiv.dataset.type = "post"
                resultContainer.appendChild(postDiv)
            }
        }
    }
}



sortOldest.addEventListener('click', (e) => {
    e.preventDefault()
    let resultsDivs = [...resultContainer.children]
    sortResults(resultsDivs, 0)
    for(let item of resultsDivs) {
        resultContainer.appendChild(item)
    }
})

sortNewest.addEventListener('click', (e) => {
    e.preventDefault()
    let resultsDivs = [...resultContainer.children]
    sortResults(resultsDivs, 1)
    for(let item of resultsDivs) {
        resultContainer.appendChild(item)
    }

})

filterSearch.addEventListener('change', () => {
    hideResults(resultContainer.children)
    let resultsDivs = [...resultContainer.children]
    let filter = filterResults(resultsDivs, filterSearch.value)
    for(let item of filter) {
        item.classList.remove('hide')
        resultContainer.appendChild(item)
    }
})

