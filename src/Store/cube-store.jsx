import { makeObservable, observable, action } from "mobx";

class CubeStore {
  cubes = [];

  constructor() {
    makeObservable(this, {
      cubes: observable,
      addCube: action,
    });
  }

  addCube(cube) {
    this.cubes.push(cube);
  }
}

const cubeStore = new CubeStore();
export default cubeStore;
