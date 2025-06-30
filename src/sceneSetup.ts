import { About } from "./scenes/about";
import { LandingScene } from "./scenes/landing";
import { Projects } from "./scenes/projects";
import { SceneManager } from "./scenes/sceneManager";

export enum SceneNames {
  Loading = "loading",
  Landing = "landing",
  About = "about",
  Projects = "projects",
  Imprint = "imprint",
}

export const sceneSetup = (sceneManager: SceneManager) => {
  const landingScene = new LandingScene();
  landingScene.onSceneComplete = () => {
    sceneManager.setSceneActive(SceneNames.Projects);
  };
  const aboutScene = new About();
  aboutScene.onSceneComplete = () => {
    sceneManager.setSceneActive(SceneNames.Landing);
  };
  const projectsScene = new Projects();

  sceneManager.addScene(SceneNames.Landing, landingScene);
  sceneManager.addScene(SceneNames.About, aboutScene);
  sceneManager.addScene(SceneNames.Projects, projectsScene);
  projectsScene.onSceneComplete = () => {
    sceneManager.setSceneActive(SceneNames.Landing);
  };

  sceneManager.setSceneActive(SceneNames.Landing);
};
