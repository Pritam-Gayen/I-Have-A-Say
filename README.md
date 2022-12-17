# **I-Have-A-Say**
***
A comment/message-reply section using JavaScript, CSS and HTML

### **Description**
-----------------------
* The page is always launched with one static textarea at the top and an add button that allows the user to add comments.

* Every comment added will have a reply, a like, and a delete button.
(Above mentioned buttons are only visible when mouse is over the corresponding comment)  

* A reply button will launch a new text area below the parent comment, allowing the user to either add a reply or cancel the addition.

* A like button will keep incrementing the number of likes on the respective comment at every click.

* A delete button will delete the entire comment chain.

* Comments can be chained resembling a tree-like structure wherein every child comment will be aligned some pixels left to the parent comment.

* Comments once added should be persisted on page re-load.

### Use Cases
----------------------------
Many companies uses their own comment/message transfer system in local network. This project can be a template of similar kind. This project can't communicate with other user. It uses local storage area of browser to store comments. In future communicating with multiple user through this project is possible.

### Tech Stack
------------------
* HTML - used to make the APIs.
* CSS - styles are used in the APIs.
* JavaScript - used to make the backend message creation, store, all the functionality of buttons and rendering.


### Features Implemented
--------------------------------
* Made an API comment area that always sticks to the right side of screen.

* Added scroll bar in the comment area. User can scroll and see all the messages within the same screen. User do not need to scroll the web-page.

* All the buttons of the added messages are hidden so that user can easily read the comments and it also looks clean. On mouse hover user can see the corresponding buttons for reply, like and delete for the comment.

* All the text areas are also scroll able. So user can type multi-line comments (User can type enter. Many comment/message Apps does not support it). 