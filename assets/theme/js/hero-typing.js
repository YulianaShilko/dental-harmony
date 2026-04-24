(function () {
    function typeText(element, text, speed, done) {
        var index = 0;

        function tick() {
            if (index <= text.length) {
                element.textContent = text.slice(0, index);
                index += 1;
                setTimeout(tick, speed);
                return;
            }

            done();
        }

        tick();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var title = document.querySelector("#header01-27 .hero-typing-title");
        if (!title) {
            return;
        }

        var sequence = Array.prototype.slice.call(
            title.querySelectorAll("[data-typing-part]")
        );

        if (!sequence.length) {
            return;
        }

        var typingDelay = 42;
        var index = 0;

        title.classList.add("is-typing");

        sequence.forEach(function (part) {
            part.dataset.originalText = part.textContent.trim();
            part.textContent = "";
        });

        function typeNext() {
            if (index >= sequence.length) {
                title.classList.remove("is-typing");
                return;
            }

            var current = sequence[index];
            var text = current.dataset.originalText || "";

            typeText(current, text, typingDelay, function () {
                index += 1;
                setTimeout(typeNext, 160);
            });
        }

        typeNext();
    });
})();
