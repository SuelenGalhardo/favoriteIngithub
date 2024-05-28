
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


//import { githubUser } from "./pages/githubUser";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

    GithubUser.search('SuelenGalhardo')
    .then(user => console.log(user));
  }
  load() {
    const entries = JSON.parse(localStorage.getItem('@github-favorites')) || [];
    console.log(entries);
    this.entries = []
  }

  //Higher-oder functions (map, filter, find, recude, remove)
  delete(user) {
  
    const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login )

     this.entries = filteredEntries;
     this.update();
}
}

//esta funcion se encarga de renderizar los eventos del html

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");
    this.update();
  }

  update() {
    this.removeAll();

    this.entries.forEach((user) => {
      const row = this.createRow();
      //console.log(row)

      row
        .querySelector(".user img")
        .setAttribute("src", `https://github.com/${user.login}.png`);
      row.querySelector(".user img").setAttribute("alt", `${user.name}`);
      row.querySelector(".user span").textContent = user.name.login;

      row
        .querySelector(".user a")
        .setAttribute("href", `https://github.com/${user.login}`);
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".Repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector(".remove").addEventListener("click", () => {
        const isOk = confirm("seguro que desea eliminar este usuario?");
        if (isOk) {
          this.delete(user);
        }
      });

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `

   
    <td class="user">
        <img src="https://Github.com/SuelenGalhardo.png" alt="">
        <a href="https://github.com/SuelenGalhardo" target="_blank">
            <p> SuelenGalhardo
                
            </p>
            <span>SuelenGalhardo             
            </span>
        </a>
    </td>
    <td class="Repositories">35</td>
    <td class="followers">22</td>
    <td><button class="remove">&times;</button></td>


    `;

    return tr;
  }

  removeAll() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
