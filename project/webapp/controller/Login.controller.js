sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "alan/projetos/projetinho/util/Identity"
], function (Controller, MessageBox, Identity) {
    "use strict";

    return Controller.extend("alan.projetos.projetinho.controller.Login", {
        onInit: function () {
            var oAuthModel = this.getOwnerComponent().getModel("auth");

            if (oAuthModel && oAuthModel.getProperty("/user")) {
                this._navigateToHome();
            }
        },

        onGoogleLogin: function () {
            var oAuthModel = this.getOwnerComponent().getModel("auth");
            oAuthModel.setProperty("/error", "");

            Identity.oauthLogin("google").catch(function (oError) {
                var sMessage = oError && oError.message
                    ? oError.message
                    : "Não foi possível iniciar o login com Google.";

                oAuthModel.setProperty("/error", sMessage);
                MessageBox.error(sMessage);
            });
        },

        _navigateToHome: function () {
            this.getOwnerComponent().getRouter().navTo("RouteHome", {}, true);
        }
    });
});
