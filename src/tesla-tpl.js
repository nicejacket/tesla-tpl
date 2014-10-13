/**
 * Created by zhou_xg on 2014/10/13 0013.
 */
!function (window, undefined) {

    //TODO 实现 $tpl的模板引擎实现，暂时将文件框架搭建出来
    var $tpl = function () {

    };

    if (typeof define === "function") {
        define(function () {
            return $tpl;
        });
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = $tpl;
    } else {
        window.$tpl = $tpl;
    }
}(window);