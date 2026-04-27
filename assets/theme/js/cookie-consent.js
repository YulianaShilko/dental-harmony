(function () {
    var STORAGE_KEY = "dh_cookie_consent_accepted";
    var SHOW_DELAY_MS = 4000;

    function hideBanner() {
        var banner = document.getElementById("dh-cookie-consent");
        if (banner) {
            banner.remove();
        }
    }

    function createBanner() {
        if (document.getElementById("dh-cookie-consent")) {
            return;
        }

        var banner = document.createElement("div");
        banner.id = "dh-cookie-consent";
        banner.style.position = "fixed";
        banner.style.left = "20px";
        banner.style.right = "20px";
        banner.style.bottom = "20px";
        banner.style.zIndex = "99999";
        banner.style.maxWidth = "860px";
        banner.style.margin = "0 auto";
        banner.style.padding = "16px 18px";
        banner.style.borderRadius = "12px";
        banner.style.background = "rgba(24, 24, 24, 0.96)";
        banner.style.color = "#ffffff";
        banner.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.35)";
        banner.style.fontFamily = "Arial, sans-serif";
        banner.style.fontSize = "14px";
        banner.style.lineHeight = "1.5";
        banner.style.display = "flex";
        banner.style.gap = "12px";
        banner.style.alignItems = "center";
        banner.style.justifyContent = "space-between";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-live", "polite");

        var text = document.createElement("div");
        text.textContent = "Этот сайт использует файлы cookies для хранения данных. Продолжая использовать сайт, вы даете свое согласие на работу с этими файлами в соответствии с политикой конфиденциальности.";
        text.style.flex = "1 1 auto";
        text.style.minWidth = "0";

        var button = document.createElement("button");
        button.type = "button";
        button.textContent = "OK";
        button.style.flex = "0 0 auto";
        button.style.border = "none";
        button.style.borderRadius = "8px";
        button.style.padding = "10px 16px";
        button.style.background = "#79B9D0";
        button.style.color = "#1f1f1f";
        button.style.fontWeight = "700";
        button.style.cursor = "pointer";

        button.addEventListener("click", function () {
            try {
                localStorage.setItem(STORAGE_KEY, "1");
            } catch (e) {
                // Ignore storage errors (private mode, blocked storage)
            }
            hideBanner();
        });

        banner.appendChild(text);
        banner.appendChild(button);
        document.body.appendChild(banner);

        if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
            banner.style.left = "12px";
            banner.style.right = "12px";
            banner.style.bottom = "12px";
            banner.style.flexDirection = "column";
            banner.style.alignItems = "stretch";
            button.style.width = "100%";
        }
    }

    function shouldShowBanner() {
        try {
            return localStorage.getItem(STORAGE_KEY) !== "1";
        } catch (e) {
            return true;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (!shouldShowBanner()) {
            return;
        }

        window.setTimeout(createBanner, SHOW_DELAY_MS);
    });
})();
