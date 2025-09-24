import { ResidentialArea } from "./scenes/residentialarea";
import { SceneManager } from "./scenes/sceneManager";
import { TownSquare } from "./scenes/townsquare";
import { WorkshopDistrict } from "./scenes/workshopdistrict";

export enum SceneNames {
  Loading = "loading",
  TownSquare = "townSquare",
  WorkshopDistrict = "workshopDistrict",
  ResidentialArea = "residentialArea",
  About = "about",
  Projects = "projects",
  Imprint = "imprint",
}

export const sceneSetup = (sceneManager: SceneManager) => {
  const townSquareScene = new TownSquare();
  const workshopDistrictScene = new WorkshopDistrict();
  const residentialScene = new ResidentialArea();

  sceneManager.addScene(SceneNames.TownSquare, townSquareScene);
  sceneManager.addScene(SceneNames.ResidentialArea, residentialScene);
  sceneManager.addScene(SceneNames.WorkshopDistrict, workshopDistrictScene);
  sceneManager.setSceneActive(SceneNames.TownSquare);
  sceneManager.showNavigation();
};
