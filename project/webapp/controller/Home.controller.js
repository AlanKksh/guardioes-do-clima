sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "alan/projetos/projetinho/util/Identity"
], function (Controller, Identity) {
    "use strict";

    return Controller.extend("alan.projetos.projetinho.controller.Home", {
        onOpenClimateApp: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onLogout: function () {
            Identity.logout().then(function () {
                var oAuthModel = this.getOwnerComponent().getModel("auth");
                oAuthModel.setProperty("/user", null);
                this.getOwnerComponent().getRouter().navTo("RouteLogin", {}, true);
            }.bind(this));
        }
    });
});
