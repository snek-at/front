import color from "../Colour.js";

// Variables
var runs = 0;

// ForEachLoop for every week
function loopWeeksRender(item, index) {
    if ((runs / 50) >= index) {
        item.days.forEach(loopDaysOfWeekRender);
    }
    runs++;
}

// ForEachLoop for every day within a week
function loopDaysOfWeekRender(item, index) {
    if ((runs / 100) >= index) {
        if (item.cube.scale.y < item.maxBoxHeight) {
            if (item.cube.scale.y / item.maxBoxHeight < 0.8) {
                item.cube.scale.y = item.maxBoxHeight * 0.8;
                item.cube.position.y = item.maxBoxHeight * 0.8 / 20 - 0.05;
                setColour(item);
            }
            else if (item.maxBoxHeight - item.cube.scale.y > 0.2) {
                item.cube.scale.y = item.cube.scale.y + 0.2;
                item.cube.position.y = item.cube.position.y + 0.01;
                setColour(item);
            } else {
                item.cube.position.y = item.maxBoxHeight / 20 - 0.05;
                item.cube.scale.y = item.maxBoxHeight;
                colourMaterialFaces(item.cube.geometry.faces, item.color);
                item.cube.geometry.colorsNeedUpdate = true;
            }
        }
    }
}


function setColour(item) {
    var colour;
    var proHeight = item.cube.scale.y / 30;
    switch (true) {
        // If precision greater than 80%
        case proHeight > 0.8:
            colour = "#196127";
            break;
        // If precision greater than 60%
        case proHeight > 0.6:
            colour = "#239a3b";
            break;
        // If precision greater than 40%
        case proHeight > 0.4:
            colour = "#7bc96f";
            break;
        // If precision greater than 0%
        case proHeight > 0:
            colour = "#c6e48b";
            break;
        // If precision is 0%
        default:
            colour = "#ebedf0";
    }
    colourMaterialFaces(item.cube.geometry.faces, colour);
    item.cube.geometry.colorsNeedUpdate = true;
}

module.exports = { loopWeeksRender };