function isAuthCallbackHash() {
    var sHash = window.location.hash.substring(1);

    return sHash.indexOf("access_token=") === 0
        || sHash.indexOf("confirmation_token=") === 0
        || sHash.indexOf("recovery_token=") === 0
        || sHash.indexOf("invite_token=") === 0
        || sHash.indexOf("email_change_token=") === 0;
}

export function bootstrapAuth() {
    if (!isAuthCallbackHash()) {
        return Promise.resolve(null);
    }

    return import("./lib/netlify-identity.js")
        .then(function (oIdentity) {
            return oIdentity.handleAuthCallback();
        })
        .then(function (oResult) {
            if (oResult && oResult.user) {
                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname + window.location.search + "#/home"
                );
            }
            return oResult;
        })
        .catch(function (oError) {
            console.error("Falha ao processar retorno do login:", oError);
            window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search + "#/login"
            );
            return null;
        });
}

export function loadUi5() {
    var oScript = document.createElement("script");

    oScript.id = "sap-ui-bootstrap";
    oScript.src = "https://ui5.sap.com/resources/sap-ui-core.js";
    oScript.setAttribute("data-sap-ui-theme", "sap_horizon");
    oScript.setAttribute("data-sap-ui-resourceroots", JSON.stringify({
        "alan.projetos.projetinho": "./"
    }));
    oScript.setAttribute("data-sap-ui-oninit", "module:sap/ui/core/ComponentSupport");
    oScript.setAttribute("data-sap-ui-compatVersion", "edge");
    oScript.setAttribute("data-sap-ui-async", "true");
    oScript.setAttribute("data-sap-ui-frameOptions", "trusted");

    document.head.appendChild(oScript);
}
