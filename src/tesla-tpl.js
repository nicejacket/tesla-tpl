/**
 * =========== tesla-tpl =============
 * @Author zhou_xg
 * @Version 1.0.0-beta
 * @Licence MIT License
 * @Email zhou84034339@sina.com
 *
 */
!function (undefined) {

    var $tpl = function (tpl, data, options) {
            options = options || {};

            for (var property in defaults) {
                if (!options[property]) {
                    options[property] = defaults[property];
                }
            }

            return compile(tpl, options);
        },
        cache = $tpl.cache = {},
        events = {},
        defaults = {
            openTag: "@{",
            closeTag: "}",
            escape: true,
            cache: true,
            compress: false
        };

    $tpl.on = function (name, callback) {
        var callbacks = events[name] || (events[name] = []);
        callbacks.push(callback);
    };

    $tpl.off = function (name, callback) {
        if (!name) {
            events = {};
            return;
        }

        if (!callback) {
            events[name] = [];
            return;
        }

        var arr = events[name];
        if (arr) {
            for (var i = 0, item; (item = arr[i]) != null; i++) {
                if (item === callback) {
                    arr.splice(i, 1);
                    return;
                }
            }
        }
    };

    $tpl.emit = function (name) {
        var data = undefined,
            callbacks = events[name] || [];
        if (arguments.length > 1) {
            data = Array.prototype.slice.call(arguments, 1);
        }

        for (var callback in callbacks) {
            callback.apply(undefined, callbacks);
        }
    };

    function compile(tpl, options) {
        if (options.cache && cache[tpl]) {
            return cache[tpl];
        }


    }

    if (typeof define === "function") {
        define(function () {
            return $tpl;
        });
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = $tpl;
    } else {
        this.$tpl = $tpl;
    }
}();