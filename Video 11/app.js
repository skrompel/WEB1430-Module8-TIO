const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

// const userId = 'u123';
// const user = {
//     name: 'Sahara',
//     age: 19,
//     hobbies: ['Guitar', 'Crochet']
// }

storeBtn.addEventListener('click', () => {
//     sessionStorage.setItem('uid', userId);
//     localStorage.setItem('user', JSON.stringify(user));
    const userId = 'u123';
    const user = {
        name: 'Sahara',
        age: 19
    }
    document.cookie = `uid=${userId}: max-age=360`;
    document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener('click', () => {
//     const extractedId = sessionStorage.getItem('uid');
//     const extractedUser = JSON.parse(localStorage.getItem('user'));
//     console.log(extractedUser);
//     if(extractedId) {
//         console.log('Got the ID - ' + extractedId)
//     } else {
//         console.log('Could not find ID');
//     }
    const cookieData = document.cookie.split(';');
    const data = cookieData.map(i => {
        return i.trim();
    });

    console.log(data[1].split('=')[1]);
    console.log(data[2].split('=')[2]);
    console.log(document.cookie);
});

