import CreateScene from "./CreateScene";
const baseUrl = "./3dModel/";
// const baseUrl = "https://www.kantu3d.com/demo/2205/SLCK/3dModel/";

export const scene = new CreateScene(baseUrl);

export const pageOnload = (canvas: HTMLCanvasElement, callback?: Function) => {
    scene.sceneOnLoad(canvas, callback)
}

export const switchLouc = (index: number) => {
    scene.louceng(index)
}

export const back = () => {
    scene.bcakHome()
}