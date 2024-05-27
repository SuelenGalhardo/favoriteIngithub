//import { githubUser } from "./pages/githubUser";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }
  load() {
    this.entries  = [
      {
        login: "suelengalhardo",
        name: "SuelenGalhardo",
        public_repos: 35,
        followers: 22,
      },
      {
        login: "suelengalhardo",
        name: "SuelenGalhardo",
        public_repos: 35,
        followers: 22,
      },
    ];
   
  }
}

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

     row.querySelector('.user img').setAttribute('src', `https://github.com/${user.login}.png`)
     row.querySelector('.user img').setAttribute('alt', `${user.name}`)
     row.querySelector('.user span').textContent = user.name.login;

     row.querySelector('.user a').setAttribute('href', `https://github.com/${user.login}`)
     row.querySelector('.user p').textContent= user.name
     row.querySelector('.Repositories').textContent= user.public_repos
     row.querySelector('.followers').textContent= user.followers

     this.tbody.append(row)
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
