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

            return compile(tpl, options).render(data);
        },
        cache = $tpl.cache = {},
        events = {},
        defaults = {
            openTag: "@{",
            closeTag: "}",
            cache: true
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

    //TODO 实现模板引擎的代码实现
    function Engine(tpl, options) {
        this.code = "";
        this.tpl = tpl;
        this.options = options;

        this.render = function () {

        };

        (function () {

        })();
    }

    //模板逻辑处理，字符转义等方法实现通过原型实现以降低内存占用
    Engine.prototype = {
        _langAnalyze: function () {
            var _reg = new RegExp(this.options.openTag + "("
                + "[^" + this.options.closeTag + "]*" + ")" + this.options.closeTag, "igm");

            this.tpl.replace(_reg, function (pattern, str) {
                return parse(str);
            });
        }
    };

    function parse(str) {
        var arr = str.split(/\s+/);
        switch (arr.shift()) {
            case "each" :
                break;
            case "if" :
                break;
            case "else" :
                break;
            case "html" :
                break;
            default :
                break;
        }
        ;
    }

    function compile(tpl, options) {
        try {
            var engine = cache[tpl] ? cache[tpl] : new Engine(tpl, options);

            if (options.cache) {
                cache[tpl] = engine;
            }

            return engine;
        } catch (e) {
            $tpl.on("error", e);
            return {render: function () {
            }};
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