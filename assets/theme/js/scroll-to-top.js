(function () {
    var BTN_ID = "dh-scroll-to-top";
    var COOKIE_ID = "dh-cookie-consent";

    if (document.getElementById(BTN_ID)) {
        return;
    }

    var btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.type = "button";
    btn.className = "dh-scroll-to-top";
    btn.setAttribute("aria-label", "Наверх");
    btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

    function viewportHeight() {
        return window.innerHeight || document.documentElement.clientHeight || 0;
    }

    function scrollTopY() {
        return (
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        );
    }

    function updateVisibility() {
        var pastFirstScreen = scrollTopY() > viewportHeight();
        if (pastFirstScreen) {
            btn.classList.add("dh-scroll-to-top--visible");
        } else {
            btn.classList.remove("dh-scroll-to-top--visible");
        }
    }

    function syncCookieOffset() {
        var cookie = document.getElementById(COOKIE_ID);
        if (cookie) {
            var h = Math.ceil(cookie.getBoundingClientRect().height);
            btn.style.setProperty("--dh-cookie-offset", h + 12 + "px");
        } else {
            btn.style.removeProperty("--dh-cookie-offset");
        }
    }

    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function mount() {
        if (document.getElementById(BTN_ID)) {
            return;
        }
        document.body.appendChild(btn);
        updateVisibility();
        syncCookieOffset();

        var scrollTicking = false;
        window.addEventListener(
            "scroll",
            function () {
                if (!scrollTicking) {
                    window.requestAnimationFrame(function () {
                        updateVisibility();
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            },
            { passive: true }
        );

        window.addEventListener("resize", function () {
            updateVisibility();
            syncCookieOffset();
        });

        if (window.MutationObserver) {
            var mo = new MutationObserver(function () {
                syncCookieOffset();
            });
            mo.observe(document.body, { childList: true, subtree: false });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
    } else {
        mount();
    }
})();
