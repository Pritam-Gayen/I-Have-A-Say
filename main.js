
//saving data in local storage----------------------------------------------------------------------
var localStorageKey = "state"

function initializeComments() {
    var state = localStorage.getItem(localStorageKey)
    if (!state) {
        return []
    }
    return JSON.parse(state)
}

function saveState() {
    var state = JSON.stringify(commentObject)
    localStorage.setItem(localStorageKey, state)
}
//----------------------------------------------------------------------------------------------
    
    
// at first making all reply buttons invisible
function hideButtonsFirst() {
    var CommentLowerButton = document.querySelectorAll(".comment-lower-button")
    CommentLowerButton.forEach((element)=>{
        element.style.display = "none"
    })
}
// ---------------------------------------------


// displays the reply buttons when mouse over message
function displayButton(x) { 
    var containerId = x.parentElement.id
    var buttons = document.querySelectorAll(`#${containerId} > .comment-lower > .reply-buttons-holder > i`)
    buttons.forEach((element) => {
        element.style.display = "block"
    })
}
//------------------------------------------------------------

// hides the reply buttons when mouse is not over message
function hideButton(x) {
    var containerId = x.parentElement.id
    var buttons = document.querySelectorAll(`#${containerId} > .comment-lower > .reply-buttons-holder > i`)
    buttons.forEach((element) => {
        element.style.display = "none"
    })
}
//-----------------------------------------------------------------


var commentParent = document.querySelector(".message-area")// this line need to be before render() because render function uses commentParent
var commentObject = initializeComments()
render()
hideButtonsFirst()

function createCommentObject(uId, newMessage, like) {
    return {
      id: uId,
      text: newMessage,
      likes: like,
      replies: [],
    }
}


var commentAddButton = document.querySelector(".comment-add-button")
commentAddButton.addEventListener("click", addComment)


function addComment() {
    var parent = document.querySelector(".message-area")// this line need to be before render() because render function uses commentParent

    var numericId = "u" + Math.random()//'u' is added so it becomes string now slice can be applied on it
    numericId = numericId.slice(3)
    var uId = "u" + numericId

    var newMessage = document.querySelector(".type-comment").value
    document.querySelector(".type-comment").value = ""

    messageCreator(parent, uId, newMessage, 0, [])
    document.querySelector(`#${uId} > .reply-wrapper`).style.display = "none"

    // saving comment in memory ---------------------------------------------------
    commentObject.push(createCommentObject(uId, newMessage, 0)) 
    //---------------------------------------------------------------------------------
    saveState() // saving comments in local storage
}

function addLike(x) {
    var parentId = x.parentElement.parentElement.parentElement.id

    var display = document.querySelector(`#${parentId} > .comment-lower > .like-display-holder > p`)
    display.innerText = parseInt(display.innerText) + 1

    var parent= dfsOnBackendObject(parentId, commentObject)
    parent.likes += 1
    saveState()
}

function deleteComment(x) {
    var parentId = x.parentElement.parentElement.parentElement.id
    var element = document.getElementById(parentId)
    element.remove()

    deleteThisId(parentId, commentObject)
    saveState()
}

function displayReplyArea(x) {
    var parentId = x.parentElement.parentElement.parentElement.id
    document.querySelector(`#${parentId} > .reply-wrapper`).style.display = "flex"
}

function hideReplyArea(x) {
    var parentId = x.parentElement.parentElement.id
    document.querySelector(`#${parentId} > .reply-wrapper`).style.display = "none"
}

function addReply(x) {
    var replyParentId = x.parentElement.parentElement.id
    var parent = document.getElementById(replyParentId)

    var numericId = "u" + Math.random()//u added so it becomes string now slice can be applied on it
    numericId = numericId.slice(3)
    var uId = "u" + numericId

    var newMessage = document.querySelector(`#${replyParentId} > .reply-wrapper > .type-comment`).value
    document.querySelector(`#${replyParentId} > .reply-wrapper > .type-comment`).value = ""

    messageCreator(parent, uId, newMessage, 0, [])
    document.querySelector(`#${uId} > .reply-wrapper`).style.display = "none"
    document.querySelector(`#${replyParentId} > .reply-wrapper`).style.display = "none"
    
    


    // saving comment in memory ---------------------------------------------------
    var objectFromMemory = dfsOnBackendObject(replyParentId, commentObject) 
    objectFromMemory.replies.push(createCommentObject(uId, newMessage, 0)) 
    //--------------------------------------------------------------------------------
    saveState() // saving comments in local storage
}

function dfsOnBackendObject(objId, parent) {
    //forEach did not work here
    for(var i=0; i<parent.length; i++) {
        var comment = parent[i]
        if(comment.id === objId) {
            return comment
        }
        var foundComment = dfsOnBackendObject(objId, comment.replies)
        if(foundComment) {
            return foundComment
        }
    }
}

function deleteThisId(commentId, commentObject) {
    for (var i = 0; i < commentObject.length; i++) {
        var comment = commentObject[i]
    
        if (comment.id === commentId) {
            commentObject.splice(i, 1)
            return
        }
    
        deleteThisId(commentId, comment.replies)
    }
}

function messageCreator(parent, messageId, messageText, messageLike, messageReply) {
    var newCommentWrapper = document.createElement("div")
    newCommentWrapper.classList.add("comment-wrapper")
    newCommentWrapper.setAttribute("id", messageId)
    newCommentWrapper.innerHTML = `
    <p class="comment-upper" onmouseover="displayButton(this)" onmouseout="hideButton(this)">${messageText}</p>
    <div class="comment-lower" onmouseover="displayButton(this)" onmouseout="hideButton(this)">
        <div class="like-display-holder">
            <i class="like-display fa-regular fa-heart"></i>
            <p class="like-display">${messageLike}</p>
        </div>
        <div class="reply-buttons-holder">
            <i class= "comment-lower-button like-button fa-solid fa-thumbs-up" onclick="addLike(this)"></i>
            <i class="comment-lower-button reply-button fa-solid fa-reply" onclick="displayReplyArea(this)"></i>
            <i class="comment-lower-button delete-button fa-solid fa-delete-left" onclick="deleteComment(this)"></i>
        </div>
    </div>
    <div class="reply-wrapper">
        <textarea class="type-comment" cols="20" rows="3"></textarea>
        <button class="reply-add-button" onclick="addReply(this)">OK</button>
        <button class="reply-cancel-button" onclick="hideReplyArea(this)">X</button>
    </div>
    `
    parent.appendChild(newCommentWrapper)
    document.querySelector(`#${messageId} > .reply-wrapper`).style.display = "none"
    for(var i=0; i<messageReply.length; i++) {
        var newReply = messageReply[i]
        messageCreator(newCommentWrapper, newReply.id, newReply.text, newReply.likes, newReply.replies)
    }
}

function render() {
    for(var i=0; i<commentObject.length; i++) {
        var comment = commentObject[i]
        messageCreator(commentParent, comment.id, comment.text, comment.likes, comment.replies)
    }
}



