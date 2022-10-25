import CreateScene from "./CreateScene";
const baseUrl = "./3dModel/";
// const baseUrl = "https://www.kantu3d.com/demo/2205/SLCK/3dModel/";

const scene = new CreateScene(baseUrl);

export const pageOnload = (canvas: HTMLCanvasElement, callback?: Function) => {
    scene.sceneOnLoad(canvas, callback)
}