(function () {
    var phoneHref = "tel:+375447707028";
    var phoneLabel = "+375 44 770-70-28";

    if (document.querySelector(".call-now-button")) {
        return;
    }

    var callButton = document.createElement("a");
    callButton.className = "call-now-button";
    callButton.href = phoneHref;
    callButton.setAttribute("aria-label", "Позвонить в ДенталХармони");
    callButton.innerHTML =
        '<span class="call-now-button__icon" aria-hidden="true">📞</span><span>Позвонить</span>';
    callButton.title = phoneLabel;

    document.body.appendChild(callButton);
})();
