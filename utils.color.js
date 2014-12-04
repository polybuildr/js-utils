Color = function() {};

Color.hex2rgb = function(hex) {
    if (hex[0] == '#') {
        hex = hex.substr(1);
    }
    var shortHexRe = /^[0-9a-f]{3}$/i;
    var longHexRe = /^[0-9a-f]{6}$/i;
    if (shortHexRe.test(hex)) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (longHexRe.test(hex)) {
        var intRepr = parseInt(hex, 16);
        var r = (intRepr >> 16) & 255;
        var g = (intRepr >> 8) & 255;
        var b = intRepr & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    return null;
}

Color.rgb2hex = function() {

    if (arguments.length == 3) {
        var r = arguments[0];
        var g = arguments[1];
        var b = arguments[2];
    }

    else if (arguments.length == 1) {
        //assuming "  rgb(r, g, b) " here
        var rgb = arguments[0];
        rgb = rgb.trim();

        if (rgb.substring(0, 3) == 'rgb') {
            rgb = rgb.substr(3);
        }
        //(r, g, b) here

        if (rgb[0] == '(' && rgb[rgb.length - 1] == ')') {
            rgb = rgb.substr(1).slice(0, -1);
            var rgbArray = rgb.split(',').map(function(str) {
                return parseInt(str.trim());
            });
            var r = rgbArray[0];
            var g = rgbArray[1];
            var b = rgbArray[2];
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                return null;
            }
        }
    }
    else return null;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
