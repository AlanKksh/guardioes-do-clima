sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "alan/projetos/projetinho/model/models",
    "alan/projetos/projetinho/util/Identity"
], (UIComponent, JSONModel, models, Identity) => {
    "use strict";

    var aProtectedRoutes = ["RouteHome", "RouteView1", "RouteView2"];

    function isAuthenticated(oUser) {
        return !!(oUser && oUser.email);
    }

    return UIComponent.extend("alan.projetos.projetinho.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(models.createDeviceModel(), "device");

            var oAuthModel = new JSONModel({
                user: null,
                loading: true,
                error: ""
            });
            this.setModel(oAuthModel, "auth");

            var oRouter = this.getRouter();
            oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

            this._initializeAuth();
        },

        _initializeAuth() {
            var oAuthModel = this.getModel("auth");
            var oRouter = this.getRouter();

            Identity.handleAuthCallback()
                .then(function (oResult) {
                    if (oResult && oResult.user) {
                        oAuthModel.setProperty("/user", oResult.user);
                    }
                    return Identity.getUser();
                })
                .then(function (oUser) {
                    if (!isAuthenticated(oUser)) {
                        oUser = null;
                    }
                    oAuthModel.setProperty("/user", oUser);
                    oAuthModel.setProperty("/loading", false);

                    return Identity.onAuthChange(function (_sEvent, oChangedUser) {
                        if (!isAuthenticated(oChangedUser)) {
                            oChangedUser = null;
                        }
                        oAuthModel.setProperty("/user", oChangedUser);

                        if (!oChangedUser) {
                            oRouter.navTo("RouteLogin", {}, true);
                        }
                    });
                })
                .catch(function (oError) {
                    oAuthModel.setProperty("/loading", false);
                    oAuthModel.setProperty("/error", oError && oError.message
                        ? oError.message
                        : "Netlify Identity não está disponível.");
                })
                .finally(function () {
                    oRouter.initialize();

                    var oUser = oAuthModel.getProperty("/user");
                    if (!isAuthenticated(oUser)) {
                        oAuthModel.setProperty("/user", null);
                        oRouter.navTo("RouteLogin", {}, true);
                        return;
                    }

                    var sHash = window.location.hash.replace(/^#\/?/, "");
                    if (!sHash || sHash === "login") {
                        oRouter.navTo("RouteHome", {}, true);
                    }
                });
        },

        _onBeforeRouteMatched(oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var oAuthModel = this.getModel("auth");
            var oUser = oAuthModel.getProperty("/user");
            var bLoading = oAuthModel.getProperty("/loading");
            var oRouter = this.getRouter();
            var bLoggedIn = isAuthenticated(oUser);

            if (bLoading) {
                oEvent.preventDefault();
                return;
            }

            if (sRouteName === "RouteLogin" || sRouteName === "RouteLoginDefault") {
                if (bLoggedIn) {
                    oEvent.preventDefault();
                    oRouter.navTo("RouteHome", {}, true);
                }
                return;
            }

            if (aProtectedRoutes.indexOf(sRouteName) !== -1 && !bLoggedIn) {
                oEvent.preventDefault();
                oRouter.navTo("RouteLogin", {}, true);
            }
        }
    });
});
