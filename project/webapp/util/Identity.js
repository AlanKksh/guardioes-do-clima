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

    function getCookie(sName) {
        var aParts = document.cookie.split(";");
        var sPrefix = sName + "=";

        for (var i = 0; i < aParts.length; i++) {
            var sPart = aParts[i].trim();
            if (sPart.indexOf(sPrefix) === 0) {
                return decodeURIComponent(sPart.substring(sPrefix.length));
            }
        }

        return "";
    }

    function verifySession(oUser) {
        if (!oUser || !oUser.email) {
            return Promise.resolve(null);
        }

        var sJwt = getCookie("nf_jwt");
        if (!sJwt) {
            return Promise.resolve(null);
        }

        return fetch(window.location.origin + "/.netlify/identity/user", {
            method: "GET",
            credentials: "same-origin",
            headers: {
                Authorization: "Bearer " + sJwt
            }
        }).then(function (oResponse) {
            if (!oResponse.ok) {
                return null;
            }
            return oResponse.json().then(function (oData) {
                if (!oData || !oData.email) {
                    return null;
                }
                return oUser;
            });
        }).catch(function () {
            return null;
        });
    }

    return {
        getUser: function () {
            return invoke("getUser").then(verifySession);
        },

        isAuthenticated: function () {
            return this.getUser().then(function (oUser) {
                return !!oUser;
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
            return invoke("handleAuthCallback").then(function (oResult) {
                if (!oResult || !oResult.user) {
                    return oResult;
                }

                return verifySession(oResult.user).then(function (oUser) {
                    if (!oUser) {
                        return null;
                    }
                    return {
                        type: oResult.type,
                        user: oUser
                    };
                });
            });
        },

        onAuthChange: function (fnCallback) {
            return loadModule().then(function (oModule) {
                return oModule.onAuthChange(function (sEvent, oUser) {
                    verifySession(oUser).then(function (oVerifiedUser) {
                        fnCallback(sEvent, oVerifiedUser);
                    });
                });
            });
        }
    };
});
