
const menuButton = document.getElementById("menu-button");
const navigationMenu = document.getElementById("navigation-menu");

if (menuButton && navigationMenu) {
    menuButton.addEventListener("click", function () {
        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        navigationMenu.hidden = isExpanded;
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
    });
}


const defaultSettings = {
    theme: "light",
    visitorName: "learner",
    lastVisit: ""
};

let settings = { ...defaultSettings };

try {
    const storedValue = localStorage.getItem("settings");

    if (storedValue) {
        const parsedSettings = JSON.parse(storedValue);

        if (parsedSettings && typeof parsedSettings === "object") {
            settings = { ...defaultSettings, ...parsedSettings };
        }
    }
} catch (error) {
    settings = { ...defaultSettings };
}

if (settings.theme !== "dark" && settings.theme !== "light") {
    settings.theme = defaultSettings.theme;
}

function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

document.body.classList.toggle("dark-mode", settings.theme === "dark");
settings.lastVisit = new Date().toLocaleString();
saveSettings();


const darkModeButton = document.getElementById("dark-mode-button");

if (darkModeButton) {
    darkModeButton.setAttribute(
        "aria-pressed",
        String(settings.theme === "dark")
    );
    darkModeButton.textContent =
        settings.theme === "dark" ? "Light mode" : "Dark mode";

    darkModeButton.addEventListener("click", function () {
        settings.theme =
            settings.theme === "dark" ? "light" : "dark";

        document.body.classList.toggle(
            "dark-mode",
            settings.theme === "dark"
        );

        darkModeButton.setAttribute(
            "aria-pressed",
            String(settings.theme === "dark")
        );
        darkModeButton.textContent =
            settings.theme === "dark" ? "Light mode" : "Dark mode";

        saveSettings();
    });
}

const artworks = [
    { title: "Character Design" },
    { title: "Character Expression" },
    { title: "Typography Output" }
];

const artworkList = document.getElementById("artwork-list");

if (artworkList) {
    artworkList.replaceChildren();

    if (artworks.length === 0) {
        artworkList.textContent = "No artwork available.";
    } else {
        artworks.forEach(function (artwork) {
            const card = document.createElement("article");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = artwork.title || "Untitled Artwork";

            card.append(title);
            artworkList.append(card);
        });
    }
}


const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");
        const status = document.getElementById("form-status");

        if (
            !name || !email || !message ||
            !nameError || !emailError || !messageError || !status
        ) {
            return;
        }

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        status.textContent = "";

        if (name.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
        }

        email.value = email.value.trim();

        if (email.value === "") {
            emailError.textContent = "Please enter your email.";
        } else if (email.validity.typeMismatch) {
            emailError.textContent =
                "Please enter a valid email, such as name@example.com.";
        }

        if (message.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
        }

        name.setAttribute(
            "aria-invalid",
            String(nameError.textContent !== "")
        );
        email.setAttribute(
            "aria-invalid",
            String(emailError.textContent !== "")
        );
        message.setAttribute(
            "aria-invalid",
            String(messageError.textContent !== "")
        );

        if (
            nameError.textContent === "" &&
            emailError.textContent === "" &&
            messageError.textContent === ""
        ) {
            status.textContent =
                "All fields are valid. No message has been sent.";
        }
    });
}