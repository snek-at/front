//> THREE.js
import * as THREE from "three";

let drawStats = function () { };

drawStats.drawDataCube = function (parameters) {
    // Check parameters
    if (parameters === undefined) parameters = {};

    var heading = parameters.hasOwnProperty("heading") ?
        parameters.heading : {};

    var headingText = heading.hasOwnProperty("text") ?
        parameters.heading["text"] : "Header";

    var headingFont = heading.hasOwnProperty("font") ?
        parameters.heading["font"] : "Arial";

    var headingFontWeight = heading.hasOwnProperty("weight") ?
        parameters.heading["weight"] : "normal";

    var headingFontSize = heading.hasOwnProperty("size") ?
        parameters.heading["size"] : 36;

    var headingFontColor = heading.hasOwnProperty("color") ?
        parameters.heading["color"] : { r: 0, g: 0, b: 255, a: 1.0 };

    var headingMargin = heading.hasOwnProperty("margin") ?
        parameters.heading["margin"] : { "l": 5, "t": 5, "r": 5, "b": 5 };


    var border = parameters.hasOwnProperty("border") ?
        parameters["border"] : {};

    var borderToDraw = border.hasOwnProperty("toDraw") ?
        parameters.border["toDraw"] : true;

    var borderThickness = border.hasOwnProperty("thickness") ?
        parameters.border["thickness"] : 4;

    var borderColor = border.hasOwnProperty("borderColor") ?
        parameters.border["borderColor"] : { r: 0, g: 0, b: 255, a: 1.0 };

    var fillColor = border.hasOwnProperty("fillColor") ?
        parameters.border["fillColor"] : { r: 0, g: 0, b: 255, a: 1.0 };

    var borderMargin = border.hasOwnProperty("margin") ?
        parameters.border["margin"] : { "l": 5, "t": 5, "r": 5, "b": 5 };

    var borderPadding = border.hasOwnProperty("padding") ?
        parameters.border["padding"] : { "l": 5, "t": 5, "r": 5, "b": 5 };

    var borderRadius = border.hasOwnProperty("radius") ?
        parameters.border["radius"] : 6;


    var texts = parameters.hasOwnProperty("texts") ?
        parameters["texts"] : new Array();

    texts.forEach(element => {
        var innerArray = element ?
            element : new Array();

        innerArray.forEach(element => {
            var text = element ?
                element : {};

            text.text = text.hasOwnProperty("text") ?
                text["text"] : "Element";

            text.font = text.hasOwnProperty("font") ?
                text["font"] : "Arial";

            text.weight = text.hasOwnProperty("weight") ?
                text["weight"] : "normal";

            text.size = text.hasOwnProperty("size") ?
                text["size"] : 24;

            text.color = text.hasOwnProperty("color") ?
                text["color"] : { r: 0, g: 0, b: 0, a: 1.0 };

            text.margin = text.hasOwnProperty("margin") ?
                text["margin"] : { "l": 5, "t": 5, "r": 5, "b": 5 };
        });
    });


    var footer = parameters.hasOwnProperty("footer") ?
        parameters.footer : {};

    var drawFooter = footer.hasOwnProperty("drawFooter") ?
        footer["drawFooter"] : false;

    var footerFont = footer.hasOwnProperty("footerFont") ?
        footer["footerFont"] : "Arial";

    var footerFontSize = footer.hasOwnProperty("footerFontSize") ?
        footer["footerFontSize"] : 18;

    var footerText = footer.hasOwnProperty("footerText") ?
        footer["footerText"] : new Array();

    footerText.forEach(element => {
        var text = element ?
            element : {};

        text.text = text.hasOwnProperty("text") ?
            text["text"] : "Footer";

        text.weight = text.hasOwnProperty("weight") ?
            text["weight"] : "normal";

        text.color = text.hasOwnProperty("color") ?
            text["color"] : { r: 0, g: 0, b: 0, a: 1.0 };
    });

    var footerMargin = footer.hasOwnProperty("margin") ?
        footer["margin"] : { "l": 5, "t": 5, "r": 5, "b": 5 };



    // Prepare Canvas and Context
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 8192;
    canvas.height = 4096;

    context.textBaseline = "alphabetic";
    context.textAlign = "left";

    // Prepare Start Coordinates
    var cx = 0;
    var cy = headingMargin.t + headingFontSize;

    // Output Header
    cx += headingMargin.l;
    cy += headingMargin.t;

    context.font = headingFontWeight + " " + headingFontSize + "px " + headingFont;
    context.fillStyle = getCanvasColor(headingFontColor);

    context.fillText(headingText, cx, cy);

    cx -= headingMargin.l;
    cy += headingMargin.b;

    // Reposition Cursor
    cx += borderMargin.l;
    if (borderMargin.t > headingMargin.b)
        cy += borderMargin.t - headingMargin.b;

    // Make Box; Calculate Height and Width from data
    if (borderToDraw) {
        // Include border, radius and padding
        var bx = (borderThickness + borderRadius) * 2 + borderPadding.l + borderPadding.r;
        var by = (borderThickness + borderRadius) * 2 + borderPadding.t + borderPadding.b;

        // For every element, calculate height and width and add it to bx and by
        var maxY = 0;
        texts.forEach(element => {
            var maxX = 0;
            var tmpY = 0;

            var prevElem = undefined;
            element.forEach(element => {
                // Include top padding/margin
                if (prevElem === undefined) {
                    if (element.margin.t > borderPadding.t)
                        tmpY += element.margin.t - borderPadding.t;
                } else {
                    if (element.margin.t > prevElem.margin.b)
                        tmpY += element.margin.t - prevElem.margin.b;
                }

                // Calculate left and right padding/margin
                var pl = element.margin.l > borderPadding.l ? element.margin.l : borderPadding.l;
                var pr = element.margin.r > borderPadding.r ? element.margin.r : borderPadding.r;

                // Include element height and width
                context.font = element.weight + " " + element.size + "px " + element.font;
                context.fillStyle = getCanvasColor(element.color);

                var tmpX = context.measureText(element.text).width;
                maxX = (tmpX + pl + pr) > maxX ? tmpX + pl + pr : maxX;
                tmpY += element.size;

                // Include bottom padding/margin
                tmpY += element.margin.b;

                // Set prevElement
                prevElem = element;
            });

            // Include bottom padding from border
            if (borderPadding.b > prevElem.margin.b)
                tmpY += borderPadding.b - prevElem.margin.b;

            // Update maxY and enlargen width
            maxY = tmpY > maxY ? tmpY : maxY;
            bx += maxX;
        });
        // Enlarge height with maxY
        by += maxY;

        roundRect(context, cx, cy, bx, by, borderRadius, borderThickness, borderColor, fillColor);
    }

    // Output Texts
    var resCx = cx;
    cx += borderThickness + borderRadius;
    var resCy = cy + borderThickness + borderRadius;

    texts.forEach(element => {
        var maxX = 0;
        var prevElem = undefined;

        element.forEach(element => {
            // Include top padding/margin
            if (prevElem === undefined) {
                cy = resCy;
                cy += borderPadding.t > element.margin.t ? borderPadding.t : element.margin.t;
            } else {
                cy += prevElem.margin.b > element.margin.t ? prevElem.margin.b : element.margin.t;
            }

            // Calculate left and right padding/margin
            var pl = element.margin.l > borderPadding.l ? element.margin.l : borderPadding.l;

            // Write element
            cy += element.size;

            context.font = element.weight + " " + element.size + "px " + element.font;
            context.fillStyle = getCanvasColor(element.color);

            context.fillText(element.text, cx + pl, cy);

            // Calculate furthest width
            var tmpX = context.measureText(element.text).width;
            maxX = (tmpX + pl + element.margin.r) > maxX ? tmpX + pl + element.margin.r : maxX;

            // Set prevElem
            prevElem = element;
        });
        cx += maxX;
    });

    // Output Footer
    if (drawFooter) {
        // Set Start Coordinates
        cx = resCx;
        var footerwidth = 0;
        footerText.forEach(element => {
            context.font = element.weight + " " + footerFontSize + "px " + footerFont;
            context.fillStyle = getCanvasColor(element.color);
            footerwidth += context.measureText(element.text).width;
        });
        cx += bx - footerwidth;
        cy = resCy + borderThickness + borderRadius + by + footerFontSize;
        if (footerMargin.t > borderMargin.b)
            cy += footerMargin.t - borderMargin.b;

        // Write Footer
        footerText.forEach(element => {
            context.font = element.weight + " " + footerFontSize + "px " + footerFont;
            context.fillStyle = getCanvasColor(element.color);
            context.fillText(element.text, cx, cy);

            cx += context.measureText(element.text).width;
        });
    }

    // Creating Canvas Texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);

    return sprite;
}

export default drawStats;

function roundRect(ctx, x, y, w, h, r, borderThickness, borderColor, fillColor) {
    // no point, if it is invisible
    if (fillColor === undefined && borderColor === undefined)
        return;

    // Set Startinpoint and width/height
    x += borderThickness;
    y += borderThickness;

    w += borderThickness;
    h += borderThickness;

    // Draw rectangle
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x - r + w, y);
    ctx.quadraticCurveTo(x + r + w, y, x + r + w, y + 2 * r);
    ctx.lineTo(x + r + w, y - r + h);
    ctx.quadraticCurveTo(x + r + w, y + r + h, x - r + w, y + r + h);
    ctx.lineTo(x + 2 * r, y + r + h);
    ctx.quadraticCurveTo(x, y + r + h, x, y - r + h);
    ctx.lineTo(x, y + 2 * r);
    ctx.quadraticCurveTo(x, y, x + 2 * r, y);
    ctx.closePath();

    ctx.lineWidth = borderThickness;

    // background color
    // border color

    // if the fill color is defined, then fill it
    if (fillColor !== undefined) {
        ctx.fillStyle = getCanvasColor(fillColor);
        ctx.fill();
    }

    if (borderThickness > 0 && borderColor !== undefined) {
        ctx.strokeStyle = getCanvasColor(borderColor);
        ctx.stroke();
    }
}

function getCanvasColor(color) {
    return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}