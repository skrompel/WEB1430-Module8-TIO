const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {

    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(Response => {
        if(response.status >= 200 && response.status < 300) {
            return Response.json();
        } else {
            return response.json().then(errData => {
                console.log(errData);
                throw new Error("Something went wrong - server side.");
            });
        }

    }).catch(error => {
        console.log(error);
        throw new Error("Something went wrong.");
    })
}

async function fetchPosts() {
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
    const listOfPosts = responseData;

    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id;
        listElement.append(postEl);
    }
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});