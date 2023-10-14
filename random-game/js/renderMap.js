import dataBrickWalls from "./data/dataBrickWalls.js";
import dataSteelWalls from "./data/dataSteelWalls.js";
import dataTrees from "./data/dataTrees.js";
import dataWater from "./data/dataWater.js";
import currentLevel from "./currentLevel.js";
import BrickWall from "./classes/map-objects/BrickWall.js";
import SteelWall from "./classes/map-objects/SteelWall.js";
import Trees from "./classes/map-objects/Trees.js";
import Water from "./classes/map-objects/Water.js";

function renderMap(objects) {
  dataBrickWalls[currentLevel.currentLevel - 1].forEach((el) => {
    objects.push(new BrickWall(el.x, el.y));
  });

  dataSteelWalls[currentLevel.currentLevel - 1].forEach((el) => {
    objects.push(new SteelWall(el.x, el.y));
  });

  dataTrees[currentLevel.currentLevel - 1].forEach((el) => {
    objects.push(new Trees(el.x, el.y));
  });

  dataWater[currentLevel.currentLevel - 1].forEach((el) => {
    objects.push(new Water(el.x, el.y));
  });
};

export default renderMap;