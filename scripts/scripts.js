/*//----------------------------------------// SIDENAV //----------------------------------------//*/
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*//----------------------------------------// SHORTENER //----------------------------------------//*/
'use strict';

//Variables
const inputLink = document.querySelector(".shortener-input");
const inputLabel = document.querySelector(".user__link-label");
const submitButton = document.querySelector(".short-button");
const containerOutput = document.querySelector(".shortener-creations");

class URLShortener {

  #API_URL = "https://api.shrtco.de/v2/shorten?url=";
  #flag = 0;

  constructor() {
    submitButton.addEventListener("click", this.getShortenUrl.bind(this));
    containerOutput.addEventListener("click", this.copyText.bind(this));
  }

  getShortenUrl(e) {
    e.preventDefault();

    const inputURL = inputLink.value;
    if (inputURL === "") {
      inputLink.classList.add("invalid-input");
      inputLabel.classList.add("invalid-msg");
      this.#flag = 1;
    }

    if (inputURL !== "") {

      if (this.#flag === 1) {
        inputLink.classList.remove("invalid-input");
        inputLabel.classList.remove("invalid-msg");
        this.#flag = 0;
      }

      inputLink.value = "";
      // const shortenURL = this.callAPI(inputLink);
      this.callAPI(inputURL);
      // this.renderOutput(inputLink, shortenURL);
    }
  }

  callAPI(inputURL) {

    const request = fetch(`${this.#API_URL + inputURL}`);
    request.then((response) => response.json()).then((data) => this.renderOutput(inputURL, data.result.full_short_link));

  }

  renderOutput(inputLink, shortenUrl) {

    const html = `
    <div class="shortener-creation flex space-between m-auto items-center">
    <div class="flex align-center">
      <span class="full-link">
      ${inputLink}
      </span>
    </div>
    <div class="creation-left flex gap-20 align-center">
      <span class="shortener-link">
      ${shortenUrl}
      </span>
      <button class="copy-btn" data-component="cyan-button">
        Copy
      </button>
    </div>
  </div>
  `;

    containerOutput.insertAdjacentHTML("afterbegin", html);
  }

  copyText(e) {
    if (!e.target.classList.contains("copy-btn")) return;

    const text = e.target.closest(".shortener-creation").querySelector(".shortener-link").innerText;

    const inputElement = document.createElement('input');
    inputElement.setAttribute("value", text);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand("copy");
    inputElement.parentNode.removeChild(inputElement);

    e.target.innerHTML = "Copied!";
    e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
  }


}

const app = new URLShortener();

/*

<div class="shortener-creation flex space-between m-auto items-center">
  <div class="flex align-center">
    <span>
      aca va el link normal
    </span>
  </div>
  <div class="creation-left flex gap-20 align-center">
    <span class="shortener-link">
      aca va el link acortado
    </span>
    <button data-component="cyan-button">
      Copy
    </button>
  </div>
</div>

*/