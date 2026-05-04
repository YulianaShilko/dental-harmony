(function () {
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.onload = resolve;
            script.onerror = function () {
                reject(new Error("Failed to load script: " + src));
            };
            document.body.appendChild(script);
        });
    }

    function loadScriptsSequentially(sources) {
        return sources.reduce(function (chain, src) {
            return chain.then(function () {
                return loadScript(src);
            });
        }, Promise.resolve());
    }

    function shouldLoadParallax() {
        return !!document.querySelector(".mbr-parallax-background");
    }

    function shouldLoadScrollGallery() {
        return !!document.querySelector(".gallery-wrapper");
    }

    function shouldLoadFormEnhancers() {
        return !!document.querySelector(".form-with-styler");
    }

    

    var scriptChunks = [
        "assets/web/assets/jquery/jquery.min.js",
        "assets/popper/popper.min.js",
        "assets/tether/tether.min.js",
        "assets/bootstrap/js/bootstrap.min.js",
        "assets/smoothscroll/smooth-scroll.js",
        "assets/dropdown/js/nav-dropdown.js",
        "assets/dropdown/js/navbar-dropdown.js",
        "assets/touchswipe/jquery.touch-swipe.min.js"
    ];

    if (shouldLoadParallax()) {
        scriptChunks.push("assets/parallax/jarallax.min.js");
    }

    if (shouldLoadScrollGallery()) {
        scriptChunks.push("assets/scrollgallery/scroll-gallery.js");
    }

    if (shouldLoadFormEnhancers()) {
        scriptChunks.push("assets/formstyler/jquery.formstyler.min.js");
        scriptChunks.push("assets/datepicker/jquery.datetimepicker.full.js");
    }

    scriptChunks.push(
        "assets/theme/js/script.js",
        "assets/theme/js/call-button.js",
        "assets/theme/js/cookie-consent.js",
        "assets/theme/js/scroll-to-top.js",
        "assets/theme/js/hero-typing.js"
    );

    loadScriptsSequentially(scriptChunks).catch(function () {
        // Keep page functional even when one optional chunk fails.
    });

    window.addEventListener("load", function () {
        loadThirdPartyAnalytics();
    });
})();
