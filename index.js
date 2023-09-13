document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const searchButton = document.getElementById('searchButton');
    const userInfo = document.getElementById('userInfo');

    searchButton.addEventListener('click', () => {
        const username = usernameInput.value;
        if (username) {
            searchGitHubUser(username);
        }
    });

    async function searchGitHubUser(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const userData = await response.json();
                displayUserInfo(userData);
            } else {
                userInfo.textContent = 'User not found.';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            userInfo.textContent = 'An error occurred while fetching data.';
        }
    }

    function displayUserInfo(user) {
        userInfo.innerHTML = `
            <h2>${user.login}</h2>
            <img src="${user.avatar_url}" alt="${user.login}" width="100">
            <p>Name: ${user.name || 'N/A'}</p>
            <p>Followers: ${user.followers}</p>
            <p>Following: ${user.following}</p>
            <p>Public Repos: ${user.public_repos}</p>
        `;
    }
});