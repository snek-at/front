import color from "../Colour.js";

// ForEachLoop for every week
function loopWeeksRender(item, index) {
    item.days.forEach(loopDaysOfWeekRender);
}

// ForEachLoop for every day within a week
function loopDaysOfWeekRender(item, index) {
    if (item.cube.scale.y < item.maxBoxHeight) {
        colourMaterialFaces(item.cube.geometry.faces, item.color);
        item.cube.scale.y = item.maxBoxHeight;
        item.cube.position.y = item.maxBoxHeight / 20 - 0.05;
    }
}

module.exports = { loopWeeksRender };