const apiUrl = 'https://api.github.com/users/';
const input = document.getElementById('input');
const userName = input.value;

async function getUser(userName) {
    const resp = await fetch(apiUrl + userName)
    const respData = await resp.json();

    addUserToMain(respData);
    getRepos(userName);

    console.log(respData);
}

async function getRepos(userName) {
    const resp = await fetch(apiUrl + userName + '/repos');
    const respData = await resp.json();

    addReposToMain(respData);
    console.log(respData);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        getUser(input.value);
        input.value = '';
    }
})

function addUserToMain(userData) {

    const mainEl = document.getElementById('main');

    mainEl.innerHTML = `
        <div class="card">
            <div class="imageContainer">
                <img src="${userData.avatar_url}" alt="">
            </div>
            <div class="infoContainer">
                <h2 class="name">${userData.name}</h2>
                <p class="bio">${userData.bio}</p>
                <ul class="infoAlt">
                    <li>${userData.followers}<strong> Follewers</strong></li>
                    <li>${userData.following}<strong> Following</strong></li>
                    <li>${userData.public_repos}<strong> Public Repos</strong></li>
                </ul>
                <div class="repoContainer" id="repoContainer"></div>
            </div>
        </div>  
    `;

}

function addReposToMain(gitRepos) {
    const reposEl = document.getElementById('repoContainer');

    gitRepos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach(rep => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');

            repoEl.href = rep.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = rep.name;

            reposEl.appendChild(repoEl);
        })
}