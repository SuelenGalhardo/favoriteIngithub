import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.entries = [];
    this.load();
  }
  load() {
    const entries =
      JSON.parse(localStorage.getItem("@github-favorites:")) || [];
    this.entries = entries;
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username);

      if (userExists) {
        throw new Error("El usuario ya está en favoritos");
      }
      const user = await GithubUser.search(username);

      if (user.login === undefined) {
        throw new Error("El usuario no existe");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  //Higher-oder functions (map, filter, find, recude, remove)
  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

//esta funcion se encarga de renderizar los eventos del html

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".buttonFav");

    // favoritar através da tecla Enter
   /* window.document.onkeyup = (event) => {
      if (event.key === "Enter") {
        const { value } = this.root.querySelector(".buttonFav");
        this.add(value);
      }
    };*/
    
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".js__inputFav");
      this.add(value);
    };
  }

  update() {
    this.emptyState();

    this.removeAll();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(".user img").setAttribute("src", `https://github.com/${user.login}.png`);
      row.querySelector(".user img").setAttribute("alt", `${user.name}`);
      row.querySelector(".user span").textContent = user.login;

      row.querySelector(".user a").setAttribute("href", `https://github.com/${user.login}`);
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


 

emptyState() {
  if (this.entries.length === 0) {
      this.root.querySelector('.stateHide').classList.remove('hide')
  } else {
      this.root.querySelector('.stateHide').classList.add('hide')
  }
}
}


