import { SceneManager } from "./scenes/sceneManager";
import { TownSquare } from "./scenes/townsquare";
import { WorkshopDistrict } from "./scenes/workshopdistrict";

export enum SceneNames {
  Loading = "loading",
  TownSquare = "townSquare",
  WorkshopDistrict = "workshopDistrict",
  About = "about",
  Projects = "projects",
  Imprint = "imprint",
}

export const sceneSetup = (sceneManager: SceneManager) => {
  const townSquareScene = new TownSquare();
  townSquareScene.onSceneComplete = () => {
    sceneManager.setSceneActive(SceneNames.WorkshopDistrict);
  };
  const workshopDistrictScene = new WorkshopDistrict();

  sceneManager.addScene(SceneNames.TownSquare, townSquareScene);
  sceneManager.addScene(SceneNames.WorkshopDistrict, workshopDistrictScene);
  workshopDistrictScene.onSceneComplete = () => {
    sceneManager.setSceneActive(SceneNames.TownSquare);
  };

  sceneManager.setSceneActive(SceneNames.TownSquare);
};
