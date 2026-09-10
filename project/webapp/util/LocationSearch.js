sap.ui.define([], function () {
    "use strict";

    var INVALID_LOCATION_MESSAGE = "Digite um local válido.";

    function normalizeQuery(sQuery) {
        return (sQuery || "").trim();
    }

    function isValidSearchQuery(sQuery) {
        var sNormalized = normalizeQuery(sQuery);

        if (!sNormalized || sNormalized.length < 2) {
            return false;
        }

        var aLetters = sNormalized.match(/[A-Za-zÀ-ÿ]/g);
        return !!(aLetters && aLetters.length >= 2);
    }

    function isOpenWeatherMapNotFound(oData) {
        if (!oData) {
            return true;
        }

        if (oData.cod === "404" || oData.cod === 404) {
            return true;
        }

        return !oData.coord;
    }

    return {
        INVALID_LOCATION_MESSAGE: INVALID_LOCATION_MESSAGE,
        normalizeQuery: normalizeQuery,
        isValidSearchQuery: isValidSearchQuery,
        isOpenWeatherMapNotFound: isOpenWeatherMapNotFound
    };
});
