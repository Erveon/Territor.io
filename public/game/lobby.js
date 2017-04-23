var Lobby = (function() {

    var info;
    var loaded = false;

    function load(info) {
        this.info = info;
        this.loaded = true;
    }

    function getInfo() {
        return this.info;
    }

    function isLoaded() {
        return this.loaded;
    }

    return {
        load: load,
        getInfo: getInfo,
        isLoaded: isLoaded
    };

})();
