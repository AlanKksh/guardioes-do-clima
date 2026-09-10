sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "alan/projetos/projetinho/util/Identity"
], function (Controller, MessageBox, Identity) {
    "use strict";

    return Controller.extend("alan.projetos.projetinho.controller.Login", {
        onInit: function () {
            var oAuthModel = this.getOwnerComponent().getModel("auth");

            if (this._isAuthenticated(oAuthModel.getProperty("/user"))) {
                this._navigateToHome();
            }
        },

        onGoogleLogin: function () {
            var oAuthModel = this.getOwnerComponent().getModel("auth");
            oAuthModel.setProperty("/error", "");

            Identity.oauthLogin("google").catch(function (oError) {
                this._handleLoginError(oError, oAuthModel);
            }.bind(this));
        },

        _handleLoginError: function (oError, oAuthModel) {
            var sMessage = oError && oError.message ? oError.message : "";

            if (sMessage.indexOf("Redirecting to OAuth provider") !== -1) {
                return;
            }

            if (!sMessage) {
                sMessage = "Não foi possível iniciar o login com Google.";
            }

            oAuthModel.setProperty("/error", sMessage);
            MessageBox.error(sMessage);
        },

        _isAuthenticated: function (oUser) {
            return !!(oUser && oUser.email);
        },

        _navigateToHome: function () {
            this.getOwnerComponent().getRouter().navTo("RouteHome", {}, true);
        }
    });
});
