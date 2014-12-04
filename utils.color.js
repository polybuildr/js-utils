(function() {

    var Color = (function() {

        var Color = function(color) {
            return new Color.fn.init(color);
        };

        Color.fn = Color.prototype = {
            init: function(color) {
                if (color[0] == '#') {
                    var hex = color.substr(1);

                    var shortHexRe = /^[0-9a-f]{3}$/i;
                    var longHexRe = /^[0-9a-f]{6}$/i;

                    if (shortHexRe.test(hex)) {
                        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                    }

                    if (longHexRe.test(hex)) {
                        var intRepr = parseInt(hex, 16);
                        this.r = (intRepr >> 16) & 255;
                        this.g = (intRepr >> 8) & 255;
                        this.b = intRepr & 255;
                    }
                }

                else if (color.substring(0, 3) == 'rgb') {
                    var rgb = color.substr(3);

                    if (rgb[0] == '(' && rgb[rgb.length - 1] == ')') {
                        rgb = rgb.substr(1).slice(0, -1);
                        var rgbArray = rgb.split(',').map(function(str) {
                            return parseInt(str.trim());
                        });
                        var r = rgbArray[0];
                        var g = rgbArray[1];
                        var b = rgbArray[2];
                        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                            this.r = r;
                            this.g = g;
                            this.b = b;
                        }
                    }
                }
                return this;
            },
            toHex: function() {
                return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
            },
            toRGB: function() {
                return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
            }
        }

        Color.fn.init.prototype = Color.fn;

        return (window._c = window.Color = Color);

    })();

})();
