import { makeObservable, observable, action } from "mobx";

class CubeStore {
  cubes = [
    {
      position: [Number, Number, Number],
      rotation: [Number, Number, Number],
      mass: Number,
      type: String,
      color: String,
    },
  ];

  constructor() {
    makeObservable(this, {
      cubes: observable,
      addCube: action,
      getCubes: action,
    });
  }

  addCube({ position: [], rotation, mass, type, color }) {
    this.cubes.push({ position: [], rotation, mass, type, color });
  }

  getCubes() {
    return this.cubes;
  }

  getCubeByIndex(index) {
    this.cubes.findIndex((cube, index) => {
      if (cube.index === index) {
        return cube;
      }
    });
  }
}

const cubeStore = new CubeStore();
export default cubeStore;
