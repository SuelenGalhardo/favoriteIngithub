export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}


/*

export class GithubUser {
    static search(username) {

        const url = `https://api.github.com/users/${username}`;
      
        return fetch(url)
           .then(response => response.json())
           .then((data) => {
            if (data.message === 'Not Found') {
                throw new Error('Usuário não encontrado');
            }

           //const {login, name, public_repos, followers} = data;

           return {
            login: data.login,  
            name: data.name, 
            public_repos: data.public_repos, 
            followers: data.followers
        };
      

    }
           )}


};
 */