const body = document.querySelector("body");
const div = document.createElement("div");

div.innerHTML = `
<div id="modal" class="modal big">
    <div class="modal-container">
        <div class="close-button close-modal" onclick="closeModal()">&times;</div>
        <h1 class="modal-header">PUT IN <span class="modal-link">PERSONAL ACCESS</span> CODE TO DOWNLOAD THE GAME</h1>
        <div style="display:flex; gap:10px">
        <input id="modal-input"  type="text" class="modal-input" placeholder="Enter your code">
        <button id="modal-btn" onclick="applyCode()" class="modal-button">
            DOWNLOAD
        </button>
        </div>
        <p id="modal-text-error">WRONG CODE</p>
        <p class="modal-text">IF YOU DON'T HAVE A CODE, PLEASE VISIT OUR <a href="https://discord.com/invite/rocketlegacy" class="modal-link">DISCORD COMMUNITY</a> AND CONTACT THE MODERATORS TO GET YOUR PERSONAL ACCESS</p>
        <p><a href="https://discord.com/invite/rocketlegacy" class="modal-link">CLICK HERE</a></p>
    </div>
</div>`;

function openModal() {
  const modal = document.getElementById("modal");

  const activeModal = document.querySelector(".modal-visible");
  if (activeModal) return;
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }

  modal.style.display = "block";
  if (modal.classList.contains("modal-visible")) {
    return;
  }
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
    this.createOverlay();
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("modal");

  const body = document.querySelector("body");
  body.style.overflow = "auto";
  modal.style.opacity = 0;
  modal.classList.add("modal-hidden");
  modal.classList.remove("modal-visible");
  setTimeout(() => {
    modal.style.display = "none";
    removeOverlay();
  }, 30);
}

function removeOverlay() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("overlay-visible");
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }
}

function createOverlay() {
  const IsOverlay = document.querySelector(".overlay");
  if (IsOverlay) return;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.classList.add("overlay-visible");
  }, 10);
  overlay.addEventListener("click", () => {
    closeModal();
  });
}

function openModal() {
  const modal = document.getElementById("modal");
  const activeModal = document.querySelector(".modal-visible");
  if (activeModal) return;
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }

  modal.style.display = "block";
  if (modal.classList.contains("modal-visible")) {
    return;
  }
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
    createOverlay();
  }, 10);
}

async function applyCode() {
  const os = window.os;
  let code = document.getElementById("modal-input").value;
  const modalTextError = document.getElementById("modal-text-error");

  let response = undefined;
  try {
    response = await fetch("https://sleipnirbrowser.org/api/check/" + code);
  } catch (_) {
    modalTextError.style.display = "block";

    document.getElementById("modal-input").classList.toggle("shake2");

    setTimeout(() => {
      document.getElementById("modal-input").classList.toggle("shake2");
    }, 300);
  }

  if (response?.ok) {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      );

    let Linkresponse = await fetch(
      `https://sleipnirbrowser.org/api/downloadroarland/${code}/${os}${
        isMobile ? "?isMobile=1" : ""
      }`
    );
    let json = await Linkresponse.json();

    window.open(json.link, "_blank");
    modalTextError.style.display = "none";
  } else {
    document.getElementById("modal-input").classList.toggle("shake2");

    setTimeout(() => {
      document.getElementById("modal-input").classList.toggle("shake2");
    }, 300);

    modalTextError.style.display = "block";
  }
}

function load() {
  // wait while all next dynamic shit loading, & than subscribe to events
  const loadCheck = setInterval(() => {
    if (document.querySelector("#joinNowButton")) {
      clearInterval(loadCheck);

      document.querySelector("#joinNowButton").addEventListener("click", (e) => {
        e.preventDefault()
        // Определяем операционную систему
        console.log(navigator.userAgent);
        const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
        window.os = isMac ? "mac" : "win";
        openModal();
      });
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  body.appendChild(div);
  load();
});
