sap.ui.define([], function () {
    "use strict";

    var oModulePromise = null;

    function loadModule() {
        if (!oModulePromise) {
            var sUrl = sap.ui.require.toUrl("alan/projetos/projetinho/lib/netlify-identity.js");
            oModulePromise = import(/* webpackIgnore: true */ sUrl);
        }
        return oModulePromise;
    }

    function invoke(fnName, aArgs) {
        return loadModule().then(function (oModule) {
            return oModule[fnName].apply(oModule, aArgs || []);
        });
    }

    return {
        getUser: function () {
            return invoke("getUser");
        },

        isAuthenticated: function () {
            return invoke("getUser").then(function (oUser) {
                return !!(oUser && oUser.email);
            });
        },

        oauthLogin: function (sProvider) {
            return loadModule().then(function (oModule) {
                oModule.oauthLogin(sProvider);
            });
        },

        logout: function () {
            return invoke("logout");
        },

        handleAuthCallback: function () {
            return invoke("handleAuthCallback");
        },

        hydrateSession: function () {
            return invoke("hydrateSession");
        },

        onAuthChange: function (fnCallback) {
            return loadModule().then(function (oModule) {
                return oModule.onAuthChange(fnCallback);
            });
        }
    };
});
