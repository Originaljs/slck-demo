import * as Bol3D from "./main";
import { common_attribute } from "./common";
import router from "@/2d/router/index";
import { getDT_RobotProcessData } from "../request/second";
import "@/2d/css/3d_index.css";

export default class CreateScene {
  container!: any
  PRO_ENV: string
  options: any;
  clickIndex!: number
  mouseCartoon!: Array<any>
  clock: any;
  pointVector3!: any
  lookVector3!: any
  changeList: Array<any> = []
  objLineArr: Array<any> = []
  smtCartoonList: Array<any> = []
  meshList: Array<any> = []
  lineIndex: number = 0
  currentCartoon: Array<any> = []
  cartoonStatus: boolean = false
  agvCartoon: Array<any> = []
  agvCartoonList1: Array<any> = []
  textru!: any
  lightFlashingList!: Array<any>
  ajaxData = [
    { type: "上板机", lineID: 1, data: {} },
    { type: "下板机", lineID: 1, data: {} },
    { type: "回流焊", lineID: 1, data: {} },
    { type: "上板机", lineID: 2, data: {} },
    { type: "下板机", lineID: 2, data: {} },
    { type: "回流焊", lineID: 2, data: {} },
    { type: "上板机", lineID: 3, data: {} },
    { type: "下板机", lineID: 3, data: {} },
    { type: "回流焊", lineID: 3, data: {} },
    { type: "上板机", lineID: 4, data: {} },
    { type: "下板机", lineID: 4, data: {} },
    { type: "THT", lineID: 4, data: {} },
  ]
  tipPopupState = 0
  floor2_Cartoon: any = []
  isPause = false

  constructor(url: string) {
    this.PRO_ENV = url;
    this.options = common_attribute;
    this.clock = new Bol3D.Clock();

  }
  sceneOnLoad(domElement: HTMLCanvasElement, callback?: Function) {
    let delScene = new Date().getTime();
    if (delScene <= 0) {
      this.container = { count: 0 };
    } else {
      this.container = new Bol3D.Container({
        publicPath: this.PRO_ENV,
        container: domElement,
        viewState: "orbit",
        bgColor: 0x000000,
        cameras: {
          orbitCamera: {
            position: [1761, 954, -1987],
            near: 10,
            far: 100000,
            fov: 45,
          },
        },
        controls: {
          orbitControls: {
            autoRotate: false,
            autoRotateSpeed: 1,
            target: [571, 20, 94],
            minDistance: 1,
            maxDistance: 3000,
            maxPolarAngle: Math.PI * 0.45,
            // minPolarAngle: Math.PI * 0.1,
            enableDamping: false,
            dampingFactor: 0.05,
          },
        },
        lights: {
          sunLight: {
            color: 0xedeacc,
            intensity: 2.5,
            position: [2000.3, 6000, 4000.2],
            mapSize: [4096, 4096],
            near: 1,
            far: 15000,
            bias: -0.001,
            distance: 8000,
          },
          ambientLight: {
            color: 0xffffff,
            intensity: 0.4,
          },
        },
        // dof: {
        //   focus: 5500.0, // 模拟相机焦距
        //   aperture: 0, // 模糊系数1
        //   maxblur: 0, // 模糊系数2
        // },
        nodePass: {
          hue: 0, // 0 - 6.2
          sataturation: 2, // 0 - 2
          vibrance: 0, // -1 - 1
          brightness: 0, // 0 - 0.5
          contrast: 1, // 0 - 2
        },
        skyBox: {
          urls: ["3d/217.jpg"],
          scale: 1,
          rotation: [0, 0, 0],
        },
        modelUrls: [
          "3d/models/main/01_Lou.glb",
          "3d/models/main/02_Lou.glb",
          "3d/models/main/03_Lou.glb",
          "3d/models/main/cywai1.glb",
          "3d/models/main/cywai2.glb",
          "3d/models/main/AGV.glb",
          "3d/models/main/AGV-2.glb",
          "3d/models/main/baisegongren.glb",
          "3d/models/main/baisegongren.glb",
          "3d/models/main/baisegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
          "3d/models/main/lansegongren.glb",
        ],
        outline: {
          edgeStrength: 10,
          edgeGlow: 0,
          edgeThickness: 1,
          pulsePeriod: 1,
          visibleEdgeColor: "#BF3B47",
          hiddenEdgeColor: "#BF3B47",
        },
        bloomEnabled: true,
        bloom: {
          bloomStrength: 0.001, // 强度
          threshold: 0, // 阈值
          bloomRadius: 0.1, // 半径
        },
        enableShadow: true,
        hdrUrls: ["3d/6.hdr"],
        toneMappingExposure: 1,
        antiShake: false,
        bounds: {
          radius: 30000,
          center: [-70, 20, 376],
        },
        fog: {
          color: "#000306", // 雾颜色
          intensity: 0.00035, // 雾强度
        },
        stats: false,
        onProgress: (item: any) => {
          item.scale.set(10, 10, 10);
          if (item.name == "01_Lou") {
            this.options.LouCheng1 = item;
            item.visible = false;
            item.userData.position = item.position.clone();
          } else if (item.name == "02_Lou") {
            this.options.LouCheng2 = item;
            item.visible = false;
            item.userData.position = item.position.clone();
          } else if (item.name == "03_Lou") {
            this.options.LouCheng3 = item;
            item.visible = false;
            item.userData.position = item.position.clone();
          } else if (item.name == "cywai1") {
            this.options.waibu1 = item;
          } else if (item.name == "cywai2") {
            this.options.waibu2 = item;
          } else if (item.name == "AGV") {
            item.position.set(-391.75, 84.6, 57.62);
            item.rotation.y = -Math.PI / 2;
            item.userData.index = 0;
            this.options.AGV = item;
            item.visible = false;
          } else if (item.name == "AGV-2") {
            item.position.set(-186.3, 79.08, 45);
            item.rotation.y = Math.PI / 2;
            this.options.AGV1 = item;
            item.visible = false;
          } else if (item.name == "baisegongren") {
            item.visible = false;
            this.options.whiteStaffList.push(item);
          } else if (item.name == "lansegongren") {
            item.visible = false;
            this.options.blueStaffList.push(item);
          }
          item.traverse((chlid: any) => {
            if (chlid.isMesh) {
              // 外部房子
              if (
                chlid.name.includes("hulou") ||
                chlid.name == "4cding" ||
                chlid.name == "d004" ||
                chlid.name == "plx1" ||
                chlid.name == "d005"
              ) {
                chlid.material.metalness = 1;
                chlid.material.roughness = 0.7;
                chlid.material.color.set("#f8f9fb");
                chlid.material.envMapIntensity = 2;
                // 房子包围盒
                this.options.hulouList.forEach((chi: any) => {
                  if (chi == chlid.name) {
                    chlid.material.color.set("#d1ebf7");
                    chlid.material.envMapIntensity = 3;
                  }
                });
                // 场景玻璃
              } else if (chlid.name.includes("boli")) {
                chlid.material.transparent = true;
                chlid.material.opacity = 0.9;
                chlid.material.color.set("#bee0f6");
                // 内部地面
              } else if (
                chlid.name.includes("neidi") ||
                chlid.name == "zldi" ||
                chlid.name == "neilu001"
              ) {
                chlid.material.transparent = true;
                chlid.material.opacity = 0.3;
                // 流光贴图
              } else if (chlid.name == "liug" || chlid.name == "liug2") {
                chlid.castShadow = false;
                if (chlid.name == "liug") this.options.liug = chlid;
                if (chlid.name == "liug2") this.options.liug1 = chlid;
                // 外部马路
              } else if (chlid.name == "wlu") {
                chlid.material.lightMap = new Bol3D.TextureLoader().load(
                  this.PRO_ENV + "3d/ffff(1).png"
                );
                chlid.material.lightMapIntensity = -1;
                chlid.material.roughness = 100;
                // 主楼
              } else if (chlid.name == "3CWK001h" || chlid.name == "zl") {
                chlid.material.metalness = 1;
                chlid.material.roughness = 0.5;
                chlid.material.color.set("#d1ebf7");
                chlid.material.envMapIntensity = 3;
                // 主场景周围建筑
              } else if (chlid.name == "ding073" || chlid.name == "Line021") {
                chlid.material.transparent = true;
                chlid.material.opacity = 0.8;
                chlid.castShadow = false;
                chlid.material.envMapIntensity = 2;
                chlid.renderOrder = 100;
                chlid.material.depthTest = true;
                chlid.material.depthWrite = true;
                this.container.addBloom(chlid);
                chlid.material.color.set("#d1ebf7");
              } else if (chlid.name.includes("luya")) {
                chlid.material.metalness = 1;
                chlid.material.roughness = 0.7;
                chlid.material.color.set("#d1ebf7");
              } else if (chlid.name == "ztdm") {
                chlid.material.metalness = 1;
                chlid.material.roughness = 1;
                chlid.material.color.set("#84c6ec");
                chlid.material.envMapIntensity = 3;
              } else if (chlid.name == "batd063") {
                chlid.material.color.set("#152546");
              } else if (chlid.name == "zlsgm") {
                chlid.material.color.set("#2856b6");
              } else if (
                chlid.name == "zlsmen" ||
                chlid.name == "zldmen" ||
                chlid.name == "zlpd"
              ) {
                chlid.material.color.set("#497eec");
                // 主楼流光
              } else if (chlid.name == "gx") {
                chlid.material.transparent = true;
                chlid.material.color.set("#004dfc");
                chlid.renderOrder = 100;
                chlid.material.envMapIntensity = 1.5;
                this.options.liug2 = chlid;
                chlid.castShadow = false;
                // chlid.receiveShadow = false;
                this.container.addBloom(chlid);
                this.setCityMaterial(chlid);

                // 内场景地面
              } else if (
                chlid.name == "DIM_N001" ||
                chlid.name == "DIM_N001_01" ||
                chlid.name == "DIM02_N01" ||
                chlid.name == "DIM02_N02" ||
                chlid.name == "DIM_3_01" ||
                chlid.name == "DIM_3_02"
              ) {
                chlid.castShadow = false;
                chlid.receiveShadow = false;
                chlid.material.roughness = 1;
                chlid.material.envMap = null;
                // chlid.material.color.set("#010409");
                chlid.material.color.set("#010e23");
                this.options.innerFloorFence.push(chlid);
                if (chlid.name == "DIM_3_01") {
                  this.options.innerFloor3 = chlid;
                  chlid.material.transparent = true;
                  chlid.renderOrder = 5;
                } else if (chlid.name == "DIM02_N01") {
                  this.options.innerFloor2 = chlid;
                } else if (chlid.name == "DIM_N001") {
                  this.options.innerFloor1 = chlid;
                }
                // 内场景围墙
              } else if (
                chlid.name == "WeiQiang1_01" ||
                chlid.name == "QiangTi" ||
                chlid.name == "QiangTi3_01"
              ) {
                chlid.material.color.set("#31455a");
                chlid.renderOrder = 100;
                this.container.addBloom(chlid);
                this.options.innerFloorFence.push(chlid);
                // 地面片
              } else if (
                chlid.name == "1_DMX01" ||
                chlid.name == "2_DMX01" ||
                chlid.name == "3_DMX01"
              ) {
                chlid.castShadow = false;
                chlid.receiveShadow = false;
                chlid.material.color.set("#18222c");
                chlid.position.y = chlid.position.y - 0.01;
                chlid.material.roughness = 1;
                this.container.addBloom(chlid);
                if (chlid.name == "3_DMX01") chlid.visible = false;
                // 围墙线
              } else if (
                chlid.name == "Line001" ||
                chlid.name == "Line002" ||
                chlid.name == "Line003"
              ) {
                // container.addBloom(chlid);
                //地面线
              } else if (
                chlid.name == "DIM_H001" ||
                chlid.name == "DIM_H" ||
                chlid.name == "HuangXian_3_01"
              ) {
                // chlid.visible=false
                chlid.material.color.set("#074e5d");
                chlid.material.metalness = 0;
                chlid.material.roughness = 1;
                chlid.material.transparent = true;
                chlid.material.opacity = 0.5;
              } else if (chlid.name == "3L_Box001") {
                chlid.renderOrder = 4;
              } else if (chlid.name == "zhudmk") {
                this.options.mainFloor = chlid;
              }
              this.options.jiqiTopList.forEach((data: any) => {
                if (data.name == chlid.name) {
                  chlid.userData.id = data.id;
                  this.options.jiqiTopArr.push(chlid);
                }
              });
              this.options.jiqiCardName.forEach((data: any) => {
                if (chlid.name == data.name) {
                  chlid.userData.id = data.id;
                  chlid.visible = false;
                  this.options.cardArr.push(chlid);
                }
              });
              this.options.floor3PopupBrowse.forEach((data: any) => {
                if (data.name == chlid.name) data.obj = chlid;
              });
              this.options.floor2RobitObject.forEach((data: any) => {
                if (data.name == chlid.name) data.obj = chlid;
              });
            } else if (chlid.type == "Object3D") {
              if (chlid.name == "SMT_I") this.options.Smt1 = chlid;
              if (chlid.name == "SMT_II") this.options.Smt2 = chlid;
              if (chlid.name == "SMT_III") this.options.Smt3 = chlid;
              if (chlid.name == "zhujianzhu") this.options.mainBuilding = chlid;
              chlid.traverse((chi: any) => {
                if (chi.isMesh) chi.userData.opacity = chi.material.opacity;
              });
            } else if (chlid.type == "Group") {
              if (chlid.name == "3-d-010") chlid.visible = false;
              // 3楼机器灯
              this.options.lampNameList.forEach((data: any) => {
                if (chlid.name == data.name) {
                  chlid.userData.d_id = data.d_id;
                  chlid.userData.equitName = data.equitName;
                  chlid.userData.lineID = data.lineID;
                  this.options.lampList.push(chlid);
                  if (data.type) {
                    chlid.userData.type = data.type;
                    this.options.lampChangeList.push(chlid);
                    chlid.traverse((chi: any) => {
                      if (
                        chi.isMesh &&
                        [1, 3, 4].includes(
                          chi.name.substring(chi.name.length - 1) * 1
                        )
                      ) {
                        chi.userData.lineID = data.lineID;
                        if (data.type) chi.userData.type = data.type;
                        chi.userData.color =
                          chi.name.substring(chi.name.length - 1) * 1;
                      }
                    });
                  }
                }
              });
              // 2楼机器人生产线设备
              this.options.robitNameList.forEach((data: any) => {
                if (chlid.name == data.name) {
                  chlid.traverse((chi: any) => {
                    if (chi.isMesh) {
                      chi.userData.parentName = data.parentName;
                      chi.userData.id = data.id;
                      chi.userData.parentPos = chlid.position.clone();
                      chi.userData.popupPos = data.position.clone();
                      this.options.floor2_outline.push(chi);
                    }
                  });
                  let pos = data.position;
                  pos.y += 2;
                  this.options.popPositionList.push({
                    name: data.parentName,
                    position: pos,
                    pos: pos.clone(),
                    id: data.id,
                    floorIndex: 2,
                  });
                }
              });
              // 3楼弹窗设备
              this.options.floor3_popup_data.forEach((data: any) => {
                if (chlid.name == data.name) {
                  let position = new Bol3D.Vector3();
                  let worldPosition = chlid.getWorldPosition(position);
                  if (data.type == "回流焊") worldPosition.y = 93;
                  if (data.type == "上板机" || data.type == "下板机")
                    worldPosition.y = 88.5;
                  chlid.traverse((chi: any) => {
                    if (chi.isMesh) {
                      chi.userData.type = data.type;
                      chi.userData.line = data.line;
                      chi.userData.get = data.get;
                      if (data.type == "THT")
                        worldPosition = new Bol3D.Vector3(-63.44, 94.07, 33.87);
                      chi.userData.parentPos = worldPosition;
                    }
                  });
                  if (data.type != "回流焊" && data.type != "THT") {
                    this.options.popPositionList.push({
                      name: data.type,
                      line: data.line,
                      position: worldPosition,
                      floorIndex: 3,
                    });
                  }
                }
              });
            }
          });
        },
        onLoad: () => {
          this.addMouseEvent();
          getDT_RobotProcessData({ FWorkShop: 1 }).then((res: any) => {
            if (res) this.options.robitData1 = res.data;
          });
          getDT_RobotProcessData({ FWorkShop: 2 }).then((res: any) => {
            if (res) this.options.robitData2 = res.data;
          });
          setInterval(() => {
            getDT_RobotProcessData({ FWorkShop: 1 }).then((res: any) => {
              if (res) this.options.robitData1 = res.data;
            });
            getDT_RobotProcessData({ FWorkShop: 2 }).then((res: any) => {
              if (res) this.options.robitData2 = res.data;
            });
          }, 10000);
          this.tipPopup();
          // 3楼灯
          this.lampStatusChange("all");
          this.liuGuang();
          let tempArr: any = [];
          this.container.clickObjects.forEach((chlid: any) => {
            if (chlid.name != "gx") tempArr.push(chlid);
          });
          this.container.sky.name = "SKY";
          this.options.clickObjetcArr = [
            tempArr,
            this.container.sky,
          ];
          this.container.clickObjects = [...this.options.clickObjetcArr];
          // 镜面1
          [
            this.options.MirrorMaterial1,
            this.options.frame1,
            this.options.groundMirrorMaterial1,
          ] = this.mirrorGroud([10000, 10000], 8, -Math.PI / 2, [26, -1, 5]);
          // 镜面2
          [
            this.options.MirrorMaterial2,
            this.options.frame2,
            this.options.groundMirrorMaterial2,
          ] = this.mirrorGroud([700, 432], 3.5, -Math.PI / 2, [-120, 78.5, 16]);
          this.options.MirrorMaterial2.visible = false;

          // 记录smt产线mesh的产线名
          [this.options.Smt1, this.options.Smt2, this.options.Smt3].forEach(
            (item) => {
              item.traverse((chlid: any) => {
                if (chlid.isMesh) chlid.userData.parentName = item.name;
              });
            }
          );
          // 白色员工命名
          this.options.whiteStaffList.forEach((chlid: any, index: number) => {
            chlid.name = this.options.whiteStaffName[index].name;
            chlid.userData.id = this.options.whiteStaffName[index].id;
            chlid.position.set(...this.options.whiteStaffName[index].position);
            chlid.rotation.y = this.options.whiteStaffName[index].angle;
            chlid.visible = false;
          });
          // 蓝色员工命名
          this.options.blueStaffList.forEach((chlid: any, index: number) => {
            chlid.name = this.options.blueStaffName[index].name;
            chlid.userData.id = this.options.blueStaffName[index].id;
            chlid.position.set(...this.options.blueStaffName[index].position);
            chlid.rotation.y = this.options.blueStaffName[index].angle;
            chlid.visible = false;
          });
          this.options.StaffList = [
            ...this.options.whiteStaffList,
            ...this.options.blueStaffList,
          ];
          this.options.mainBuilding.traverse((chlid: any) => {
            if (chlid.isMesh)
              chlid.userData.parentName = this.options.mainBuilding.name;
          });
          // 1楼除地面、围墙的其他mesh
          this.options.LouCheng1.traverse((item: any) => {
            if (item.isMesh) {
              this.options.innerFloorFence.forEach((chlid: any) => {
                if (item.name == chlid.name) {
                  item.userData.id = 1;
                  chlid.userData.parentName = this.options.mainBuilding.name;
                } else {
                  item.visible = false;
                  this.options.floorOtherMesh_1.push(item);
                }
              });
            }
          });
          // 2楼除地面、围墙的其他mesh
          this.options.LouCheng2.traverse((item: any) => {
            if (item.isMesh) {
              this.options.innerFloorFence.forEach((chlid: any) => {
                if (item.name == chlid.name) {
                  item.userData.id = 2;
                  chlid.userData.parentName = this.options.mainBuilding.name;
                } else {
                  item.visible = false;
                  this.options.floorOtherMesh_2.push(item);
                }
              });
            }
          });
          // 3楼除地面、围墙的其他mesh
          this.options.LouCheng3.traverse((item: any) => {
            if (item.isMesh) {
              this.options.innerFloorFence.forEach((chlid: any) => {
                if (item.name == chlid.name) {
                  item.userData.id = 3;
                  chlid.userData.parentName = this.options.mainBuilding.name;
                } else {
                  item.visible = false;
                  this.options.floorOtherMesh_3.push(item);
                }
              });
            }
          });
          this.options.mainFloor.userData.parentName =
            this.options.mainBuilding.name;
          this.addCanvas();
          this.addIconCard();
          this.sendMqTT();
          this.render();
          const animation = () => {
            requestAnimationFrame(animation)
            this.render()
          }
          animation()
          console.log("is done");
          callback && callback();
        },
      });
    }
  }
  addMouseEvent() {
    const events = new Bol3D.Events(this.container);
    this.clickIndex = 0;
    this.mouseCartoon = [];
    events.onhover = (e: any) => {
      let object = e.objects[0].object;
      if (object.userData.parentName == this.options.mainBuilding.name) {
        // 楼层加勾边
        if (this.clickIndex > 0 && this.options.floorIndex == 0) {
          let id = object.userData.id;
          let temp: Array<any> = [];
          this.options.innerFloorFence.forEach((chlid: any) => {
            if (chlid.userData.id == id) temp.push(chlid);
          });
          this.container.outlineObjects = [...temp];
        }
        if (this.clickIndex > 0 || this.options.floorIndex != 0) return;
        this.mouseCartoon.forEach((chlid: any) => chlid && chlid.stop());
        this.clickIndex++;
        this.options.mainBuilding.visible = false;
        this.options.liug2.visible = false;
        this.options.LouCheng1.visible = true;
        this.options.LouCheng2.visible = true;
        this.options.LouCheng3.visible = true;

        this.options.innerFloorFence.forEach(
          (chlid: any) => (chlid.visible = true)
        );
        this.mouseCartoon[0] = new Bol3D.TWEEN.Tween(
          this.options.LouCheng3.position
        ).to({ y: this.options.LouCheng3.userData.position.y + 80 }, 100);
        this.mouseCartoon[1] = new Bol3D.TWEEN.Tween(
          this.options.LouCheng2.position
        ).to({ y: this.options.LouCheng2.userData.position.y + 40 }, 100);
        this.mouseCartoon[0].chain(this.mouseCartoon[1]);
        this.mouseCartoon[0].start();
        this.mouseCartoon[1].onComplete(() => {
          this.container.clickObjects = [
            ...this.options.innerFloorFence,
            this.container.sky,
            this.options.mainFloor,
          ];
        });
      } else if (
        object.userData.parentName &&
        object.userData.parentName.includes("robit")
      ) {
        let li: Array<any> = [];
        this.options.floor2_outline.forEach((chlid: any) => {
          if (
            chlid.userData.parentName == object.userData.parentName &&
            chlid.userData.id == object.userData.id
          )
            li.push(chlid);
        });
        this.container.outlineObjects = [...li];
      } else {
        this.container.outlineObjects = [];
        if (this.clickIndex < 1 || this.options.floorIndex != 0) return;
        this.clickIndex = 0;
        this.mouseCartoon.forEach((chlid: any) => chlid && chlid.stop());
        this.mouseCartoon[2] = new Bol3D.TWEEN.Tween(
          this.options.LouCheng2.position
        ).to({ y: this.options.LouCheng2.userData.position.y }, 100);
        this.mouseCartoon[3] = new Bol3D.TWEEN.Tween(
          this.options.LouCheng3.position
        ).to({ y: this.options.LouCheng3.userData.position.y }, 100);
        this.mouseCartoon[2].chain(this.mouseCartoon[3]);
        this.mouseCartoon[2].start();
        this.mouseCartoon[3].onComplete(() => {
          this.options.mainBuilding.visible = true;
          this.options.liug2.visible = true;
          this.options.LouCheng1.visible = false;
          this.options.LouCheng2.visible = false;
          this.options.LouCheng3.visible = false;
          this.container.clickObjects = [...this.options.clickObjetcArr];
        });
      }
    };

    events.onclick = (e: any) => {
      // e;
      e.objects[0].point.y.toFixed(2);
      console.log(
        "中心点： " +
        e.objects[0].point.x.toFixed(2) +
        "," +
        e.objects[0].point.y.toFixed(2) +
        "," +
        e.objects[0].point.z.toFixed(2)
      );
      console.log(e.objects[0].object);
    };
    // 鼠标双击
    events.ondbclick = (e: any) => {
      let object = e.objects[0].object;
      let point = e.objects[0].point;
      // 3楼弹窗展示
      let listtemp = ["回流焊", "THT"];
      if (
        object.userData.get &&
        object.userData.type &&
        !listtemp.includes(object.userData.type)
      ) {
        this.options.popupObj.scale.set(0.1, 0.1, 0.1);
        this.equitPopup(true, object);
        // 2楼自动线弹窗展示
      } else if (
        object.userData.parentName &&
        object.userData.parentName.includes("robit")
      ) {
        this.options.popupObj.scale.set(0.07, 0.07, 0.07);
        this.textru.visible = false;
        let key = object.userData.parentName == "robit1" ? 1 : 2;
        this.robitPopup(true, key, object, point);
        if (this.floor2_Cartoon.length > 0) {
          this.floor2_Cartoon.forEach((chlid: any) => {
            if (chlid) chlid.stop();
          });
          this.isPause = false;
          this.floor2_Cartoon = [];
          this.currentCartoon = [];
          this.cartoonStatus = false;
        }
      } else {
        this.container.outlineObjects = [];
      }
      if (
        this.clickIndex > 0 &&
        object.userData.id &&
        this.options.floorIndex === 0
      ) {
        this.options.LouCheng2.position.y =
          this.options.LouCheng2.userData.position.y;
        this.options.LouCheng3.position.y =
          this.options.LouCheng3.userData.position.y;
        this.options.LouCheng1.visible = false;
        this.options.LouCheng2.visible = false;
        this.options.LouCheng3.visible = false;
        let routerList = ["/first", "/second", "/thirdly"];
        router.push(routerList[object.userData.id - 1]);
      }
    };
    // 输出坐标
    (window as any).outCooroutCoordinate = () => {
      if (this.container == undefined) return;
      let points = this.container.orbitControls.target;
      let camera = this.container.orbitCamera.position;
      return [
        [Math.round(points.x), Math.round(points.y), Math.round(points.z)],
        [Math.round(camera.x), Math.round(camera.y), Math.round(camera.z)],
      ];
    };
  }

  render() {
    //镜面 reflectRTT
    const delta = this.clock.getDelta();
    this.options.groundMirrorMaterial1 &&
      this.options.frame1
        .update(delta)
        .updateNode(this.options.groundMirrorMaterial1);
    this.options.groundMirrorMaterial2 &&
      this.options.frame2
        .update(delta)
        .updateNode(this.options.groundMirrorMaterial2);

    this.options.liug.material.map.offset.y += 0.01;
    this.options.liug1.material.map.offset.y += 0.01;
    this.options.liug2.material.map.offset.y += 0.005;
    if (this.options.popupObj && this.textru) {
      if (!this.options.popupObj.visible && this.textru.visible)
        this.textru.visible = false;
    }
    // 灯状态更改
    this.ajaxData.forEach((chlid: any, index: number) => {
      for (let i = 0; i < this.options.lampStatus.length; i++) {
        if (i == index) {
          let dataValue = Object.assign({}, chlid.data);
          let oldData = Object.assign({}, this.options.lampStatus[i].data);
          // 比较灯状态Change
          if (!this.objDiffer(dataValue, oldData) && chlid.type != "THT") {
            this.options.lampStatus[i].data = Object.assign({}, chlid.data);
            let lineID = chlid.lineID;
            let type = chlid.type;
            let temp = Object.assign({}, chlid.data);
            if (temp.red != oldData.red) {
              if (temp.red == 1) {
                this.lampStatusChange("one", lineID, type, 3);
              } else {
                this.lampStatusChange("one", lineID, type, 3, false, true);
              }
            }
            if (temp.green != oldData.green) {
              if (temp.green == 1) {
                this.lampStatusChange("one", lineID, type, 4);
              } else {
                this.lampStatusChange("one", lineID, type, 4, false, true);
              }
            }
            if (temp.yellow != oldData.yellow) {
              if (temp.yellow == 1) {
                this.lampStatusChange("one", lineID, type, 1);
              } else {
                this.lampStatusChange("one", lineID, type, 1, false, true);
              }
            }
          }
        }
      }
    });
    // 提示弹窗浮动
    if (this.tipPopupState == 0) {
      this.tipPopupState = 1;
      this.tipPopupMove();
    }
  }

  sceneMove(
    point: Array<number>,
    look: Array<number>,
    times: number,
    td?: Function
  ) {
    let position1 = new Bol3D.Vector3(...point);
    let position2 = new Bol3D.Vector3(...look);
    if (this.pointVector3 && this.lookVector3) {
      if (
        Math.abs(position1.distanceTo(this.pointVector3)) < 1 &&
        Math.abs(position2.distanceTo(this.lookVector3)) < 1
      )
        times = 0;
    }
    let temp = new Bol3D.TWEEN.Tween(this.container.orbitCamera)
      .to({ position: new Bol3D.Vector3(...look) }, times)
      .start();
    let temp1 = new Bol3D.TWEEN.Tween(this.container.orbitControls)
      .to({ target: new Bol3D.Vector3(...point) }, times)
      .start()
      .onComplete(function () {
        td && td();
      });
    this.pointVector3 = position1.clone();
    this.lookVector3 = position2.clone();
    return [temp, temp1];
  }
  // 场景切换补间动画
  sceneChange(arr: Array<any>) {
    if (!arr) return;
    let temp = [];
    let temp1 = [];
    for (let i = 0; i < arr.length; i++) {
      let position1 = new Bol3D.Vector3(...arr[i].point);
      let position2 = new Bol3D.Vector3(...arr[i].look);
      temp[i] = new Bol3D.TWEEN.Tween(this.container.orbitCamera).to(
        { position: position2 },
        arr[i].time
      );
      temp1[i] = new Bol3D.TWEEN.Tween(this.container.orbitControls).to(
        { target: position1 },
        arr[i].time
      );
    }
    return [temp, temp1];
  }

  // 生成镜面 reflectRtt
  mirrorGroud(
    groundSize: Array<number>,
    blur: number,
    angle: number,
    groundPosition: Array<number>
  ) {
    const decalNormal = new Bol3D.TextureLoader().load(
      this.PRO_ENV + "3d/ffff.png"
    );
    const decalDiffuse = new Bol3D.TextureLoader().load(
      this.PRO_ENV + "3d/ffff(1).png"
    );
    decalDiffuse.wrapS = decalDiffuse.wrapT = Bol3D.RepeatWrapping;

    const frame = new Bol3D.NodeFrame();
    const MirrorGeometry = new Bol3D.PlaneGeometry(
      groundSize[0],
      groundSize[1]
    );
    const planeGeo = new Bol3D.PlaneGeometry(groundSize[0], groundSize[1]);

    const MirrorMaterial = new Bol3D.ReflectorRTT(MirrorGeometry, {
      clipBias: 0.05,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    });
    const mask = new Bol3D.SwitchNode(new Bol3D.TextureNode(decalDiffuse), "w");
    const mirror = new Bol3D.ReflectorNode(MirrorMaterial);
    const normalMap = new Bol3D.TextureNode(decalNormal);
    const normalXY = new Bol3D.SwitchNode(normalMap, "xy");
    const normalXYFlip = new Bol3D.MathNode(normalXY, Bol3D.MathNode.INVERT);
    const offsetNormal = new Bol3D.OperatorNode(
      normalXYFlip,
      new Bol3D.FloatNode(0.5),
      Bol3D.OperatorNode.SUB
    );
    (mirror as any).offset = new Bol3D.OperatorNode(
      offsetNormal, // normal
      new Bol3D.FloatNode(6), // scale
      Bol3D.OperatorNode.MUL
    );
    const blurMirror = new Bol3D.BlurNode(mirror);
    blurMirror.size = new Bol3D.Vector2(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    blurMirror.uv = new Bol3D.ExpressionNode(
      "projCoord.xyz / projCoord.q",
      "vec3"
    );
    blurMirror.uv.keywords["projCoord"] = new Bol3D.OperatorNode(
      (mirror as any).offset,
      mirror.uv,
      Bol3D.OperatorNode.ADD
    );
    blurMirror.radius.x = blurMirror.radius.y = blur;
    const groundMirrorMaterial: any = new Bol3D.PhongNodeMaterial();
    groundMirrorMaterial.environment = blurMirror; // or add "mirror" variable to disable blur
    groundMirrorMaterial.environmentAlpha = mask;
    groundMirrorMaterial.normal = new Bol3D.NormalMapNode(normalMap);

    const mirrorMesh = new Bol3D.Mesh(planeGeo, groundMirrorMaterial);
    MirrorMaterial.add(mirrorMesh);
    this.container.attach(MirrorMaterial);
    this.container.clickObjects.push(MirrorMaterial);
    MirrorMaterial.rotateX(angle);
    (MirrorMaterial as any).position.set(
      groundPosition[0],
      groundPosition[1],
      groundPosition[2]
    );

    return [MirrorMaterial, frame, groundMirrorMaterial, MirrorMaterial];
  }

  // 建筑特效加载
  setCityMaterial(object: any) {
    // 确定oject的geometry的box size
    // 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
    // 边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 null。
    object.geometry.computeBoundingBox();
    object.geometry.computeBoundingSphere();
    // console.log(object.geometry)

    const { geometry } = object;
    const { max, min } = geometry.boundingBox;
    const size = new Bol3D.Vector3(max.x - min.x, max.y - min.y, max.z - min.z);

    this.forMaterial(object.material, (material: any) => {
      material.transparent = true;
      // material.color.set(0xfff000);
      material.onBeforeCompile = (shader: any) => {
        shader.uniforms.uSize = {
          value: size,
        };

        const fragment = /* glsl */ `
                varying vec3 vPosition;
                uniform vec3 uSize;
  
                void main() {
            `;
        const fragmentColor = /* glsl */ `
                vec3 distColor = outgoingLight;
                float aop = diffuseColor.a;
  
                float opac = 1.5 - (vPosition.y + uSize.y / 2.0 ) / uSize.y;
                if(aop == 0.0){
                    gl_FragColor = vec4(distColor, aop);
                } else {
                    gl_FragColor = vec4(distColor, opac);
                }
            `;
        shader.fragmentShader = shader.fragmentShader.replace(
          "void main() {",
          fragment
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
          fragmentColor
        );

        const vertex = /* glsl */ `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
            `;
        shader.vertexShader = shader.vertexShader.replace(
          "void main() {",
          vertex
        );
        ////
      };
    });
  }
  forMaterial(materials: any, callback?: Function) {
    if (!callback || !materials) return false;
    // console.log(materials)
    if (Array.isArray(materials)) {
      materials.forEach((mat) => {
        callback(mat);
      });
    } else {
      // console.log(materials)
      callback(materials);
    }
  }

  louceng(index: number) {
    if (this.changeList.length > 0) {
      this.changeList.forEach((child) => child && child.stop());
      this.changeList = [];
    }
    this.options.floorIndex = index;
    this.options.waibu1.visible = false;
    this.options.waibu2.visible = false;
    this.options.AGV.visible = false;
    this.options.GV1.visible = false;
    this.options.MirrorMaterial1.visible = false;
    this.options.MirrorMaterial2.visible = false;
    let arr = [
      this.options.LouCheng1,
      this.options.LouCheng2,
      this.options.LouCheng3,
    ];
    arr.forEach((chlid) => {
      chlid.position.y = chlid.userData.position.y - 50;
    });
    this.options.LineTimeList.forEach((child: any) => (child.visible = false));
    this.options.StaffList.forEach((chlid: any) => (chlid.visible = false));
    this.options.tipPOpupList.forEach((chlid: any) => (chlid.visible = false));
    if (index == 1) {
      this.options.innerFloor1.material.transparent = true;
      this.options.innerFloor1.material.opacity = 0.6;
    } else if (index == 2) {
      this.options.innerFloor2.material.transparent = true;
      this.options.innerFloor2.material.opacity = 0.6;
    }
    let temp = arr[index - 1];
    if (this.objLineArr.length > 0) {
      this.smtBack(); // smt 状态恢复
    }
    this.currentCartoon = [];
    this.cartoonStatus = false;
    if (this.floor2_Cartoon.length > 0) {
      this.floor2_Cartoon.forEach((chlid: any) => {
        if (chlid) chlid.stop();
      });
      this.floor2_Cartoon = [];
      this.isPause = false;
    }
    let clickObject: Array<any> = [];
    temp.traverse((item: any) => {
      if (item.isMesh) clickObject.push(item);
      if (this.options.floorIndex == 3)
        clickObject.push(...this.options.floor3_Icon_Click);
      if (this.options.floorIndex == 2)
        clickObject.push(...this.options.floor2_Icon_Click);
    });
    this.container.clickObjects = [...clickObject];
    this.avgMove(false);
    this.agvRandomMove(false);
    this.options.AGV.position.set(...this.options.agvRouteList[index - 1][6]);
    this.options.AGV.rotation.y = this.options.agvAngleList[index - 1][6];
    this.options.AGV1.position.set(
      ...this.options.agvRouteList1[index - 1][0].point
    );
    this.options.AGV1.rotation.y =
      this.options.agvRouteList1[index - 1][0].angle;
    let list = [
      ...this.options.floorOtherMesh_1,
      ...this.options.floorOtherMesh_2,
      ...this.options.floorOtherMesh_3,
    ];
    this.container.outlineObjects = [];
    list.forEach((chlid) => {
      if (chlid.name != "3_DMX01" && !this.options.cardArr.includes(chlid))
        chlid.visible = true;
    });
    this.container.mixerActions.forEach((child: any) => {
      child.paused = true;
      child.time = 0;
    });
    // 弹窗隐藏
    this.options.popupObj.visible = false;
    // 精灵材质隐藏
    this.textru.visible = false;
    let change1 = this.sceneMove(
      this.options.sceneAngle[index - 1][0],
      this.options.sceneAngle[index - 1][1],
      0,
      () => {
        this.container.sunLight.intensity = 0.5;
        this.mouseLockToggle(true);
        if (index == 1) {
          this.options.LouCheng1.visible = true;
          this.options.LouCheng2.visible = false;
          this.options.LouCheng3.visible = false;
          this.options.MirrorMaterial2.position.set(-120, 20.5, 16);
          this.options.MirrorMaterial2.visible = true;
        }
        if (index == 2) {
          this.options.LouCheng1.visible = false;
          this.options.LouCheng2.visible = true;
          this.options.LouCheng3.visible = false;
          this.options.MirrorMaterial2.position.set(-120, 49.5, 16);
          this.options.MirrorMaterial2.visible = true;
          this.container.mixerActions.forEach((child: any) => {
            if (child._clip.name == "2l-dh") {
              child.timeScale = 0.5;
              child.time = 0;
              child.paused = false;
            }
          });
        }
        if (index == 3) {
          this.options.LouCheng1.visible = false;
          this.options.LouCheng2.visible = false;
          this.options.LouCheng3.visible = true;
          this.options.innerFloor3.material.opacity = 0.6;
          this.options.MirrorMaterial2.position.set(-120, 78.5, 16);
          this.options.MirrorMaterial2.visible = true;
        }
        let change2 = new Bol3D.TWEEN.Tween(temp.position)
          .to({ y: temp.userData.position.y }, 800)
          .start()
          .onComplete(() => {
            this.options.tipPOpupList.forEach((chlid: any) => {
              if (chlid.userData.floorIndex == index) {
                chlid.visible = true;
              } else {
                chlid.visible = false;
              }
            });
            this.options.LineTimeList.forEach((child: any) => {
              let state =
                child.userData.id == this.options.floorIndex ? true : false;
              child.visible = state;
            });
            this.options.AGV.visible = true;
            this.options.AGV1.visible = true;
            // 员工visible
            this.options.StaffList.forEach((chlid: any) => {
              if (chlid.name.split("_")[1].includes(index)) {
                chlid.visible = true;
              } else {
                chlid.visible = false;
              }
            });
            if (index == 2 || index == 1)
              this.options.MirrorMaterial2.visible = false;
            this.options.innerFloor1.material.opacity = 1;
            this.options.innerFloor1.material.transparent = false;
            this.options.innerFloor2.material.opacity = 1;
            this.options.innerFloor2.material.transparent = false;
            this.avgMove(true);
            this.agvRandomMove(true, "ahead");
            this.changeList = [];
          });
        this.changeList.push(change2);
      }
    );
    this.changeList.push(...change1);
  }

  // 返回主视角
  bcakHome() {
    this.options.floorIndex = 0;
    if (this.changeList.length > 0) {
      this.changeList.forEach((child) => child && child.stop());
      this.changeList = [];
    }
    this.container.clickObjects = [...this.options.clickObjetcArr];
    this.options.LouCheng1.visible = false;
    this.options.LouCheng1.position.y = this.options.LouCheng1.userData.position.y;
    this.options.LouCheng2.visible = false;
    this.options.LouCheng2.position.y = this.options.LouCheng2.userData.position.y;
    this.options.LouCheng3.visible = false;
    this.options.LouCheng3.position.y = this.options.LouCheng3.userData.position.y;
    this.options.innerFloor1.material.opacity = 1;
    this.options.innerFloor1.material.transparent = false;
    this.options.innerFloor2.material.opacity = 1;
    this.options.innerFloor2.material.transparent = false;
    this.options.innerFloor3.material.opacity = 1;
    this.options.AGV.visible = false;
    this.options.AGV1.visible = false;
    this.options.MirrorMaterial2.visible = false;
    // 弹窗隐藏
    this.options.popupObj.visible = false;
    // 精灵材质隐藏
    this.textru.visible = false;
    this.smtBack(); // smt 状态恢复
    this.currentCartoon = [];
    this.cartoonStatus = false;
    if (this.floor2_Cartoon.length > 0) {
      this.floor2_Cartoon.forEach((chlid: any) => {
        if (chlid) chlid.stop();
      });
      this.floor2_Cartoon = [];
      this.isPause = false;
    }
    this.avgMove(false);
    this.agvRandomMove(false);
    this.options.StaffList.forEach((chlid: any) => {
      chlid.visible = false;
    });
    let list = [...this.options.floorOtherMesh_1, ...this.options.floorOtherMesh_2, ...this.options.floorOtherMesh_3];
    list.forEach((chlid) => (chlid.visible = false));
    this.options.mainBuilding.visible = true;
    this.options.liug2.visible = true;
    this.container.mixerActions.forEach((child: any) => {
      child.paused = true;
      child.time = 0;
    });
    this.container.outlineObjects = [];
    this.mouseLockToggle(true);
    this.options.tipPOpupList.forEach((child: any) => (child.visible = false));
    this.sceneMove([571, 20, 94], [1761, 954, -1987], 0, () => {
      this.options.LineTimeList.forEach((chlid: any) => (chlid.visible = false));
      this.container.sunLight.intensity = 2.5;
      this.options.waibu1.visible = true;
      this.options.waibu2.visible = true;
      this.options.MirrorMaterial1.visible = true;
    });
  };
  Smt_Function(index: number, fun?: Function) {
    if (index < 0 || index > 3) return;
    if (this.lineIndex == index) {
      this.smt_Pause();
      return;
    }
    this.lineIndex = index;
    let sceneAngleList: any;
    let animation: any;
    this.container.mixerActions.forEach((child: any) => {
      if (child._clip.name == "3l-dh") animation = child;
    });
    animation.time = 0;
    animation.paused = false;
    // 补间动画停止
    if (this.smtCartoonList.length > 0) {
      this.smtCartoonList.forEach((chlid) => {
        chlid && chlid.stop();
      });
    }
    // 上一次mesh透明度恢复
    if (this.meshList.length > 0) {
      this.meshList.forEach((chlid) => {
        chlid.material.opacity = chlid.userData.opacity;
        if (chlid.name.includes("QuanZhiDongK_X")) chlid.visible = true;
        if (chlid.name.includes("TuBiao")) chlid.visible = false;
      });
    }
    // 暂停功能恢复
    if (this.cartoonStatus) {
      this.currentCartoon = [];
      this.cartoonStatus = false;
    }
    if (index == 1) {
      sceneAngleList = [
        { point: [-57, 20, -106], look: [-301, 280, 130], time: 2000 },
        { point: [-101, 20, -200], look: [36, 106, -82], time: 5000 },
        { point: [-101, 20, -200], look: [36, 106, -82], time: 4000 },
        { point: [-108, 20, -166], look: [-11, 109, -86], time: 4000 },
        { point: [-108, 20, -166], look: [-11, 109, -86], time: 2000 },
        { point: [-183, 20, -209], look: [-126, 147, -53], time: 3000 },
        { point: [-183, 20, -209], look: [-126, 147, -53], time: 4000 },
        { point: [-65, 20, -177], look: [-69, 200, -12], time: 3000 },
        { point: [-101, 20, -200], look: [36, 106, -82], time: 3000 },
        { point: [-101, 20, -200], look: [36, 106, -82], time: 4000 },
        { point: [-183, 20, -209], look: [-126, 147, -53], time: 5000 },
        { point: [-183, 20, -209], look: [-126, 147, -53], time: 3000 },
        { point: [-65, 20, -177], look: [-69, 200, -12], time: 2000 },
      ];
    } else if (index == 2) {
      sceneAngleList = [
        { point: [-57, 20, -106], look: [-301, 280, 130], time: 2000 },
        { point: [-63, 20, -144], look: [25, 120, -10], time: 5000 },
        { point: [-63, 20, -144], look: [25, 120, -10], time: 5000 },
        { point: [-74, 20, -136], look: [-8, 110, -18], time: 4000 },
        { point: [-74, 20, -136], look: [-8, 110, -18], time: 2000 },
        { point: [-189, 20, -135], look: [-123, 110, -16], time: 3000 },
        { point: [-189, 20, -135], look: [-123, 110, -16], time: 4000 },
        { point: [-77, 20, -181], look: [-76, 171, 63], time: 3000 },
        { point: [-63, 20, -144], look: [25, 120, -10], time: 3000 },
        { point: [-63, 20, -144], look: [25, 120, -10], time: 3000 },
        { point: [-189, 20, -135], look: [-123, 110, -16], time: 5000 },
        { point: [-189, 20, -135], look: [-123, 110, -16], time: 3000 },
        { point: [-77, 20, -181], look: [-76, 171, 63], time: 2000 },
      ];
    } else if (index == 3) {
      sceneAngleList = [
        { point: [-57, 20, -106], look: [-301, 280, 130], time: 2000 },
        { point: [-69, 20, -124], look: [15, 124, 53], time: 5000 },
        { point: [-69, 20, -124], look: [15, 124, 53], time: 5000 },
        { point: [-96, 20, -122], look: [-24, 109, 30], time: 4000 },
        { point: [-96, 20, -122], look: [-24, 109, 30], time: 2000 },
        { point: [-189, 20, -117], look: [-117, 129, 48], time: 3000 },
        { point: [-189, 20, -117], look: [-117, 129, 48], time: 4000 },
        { point: [-63, 20, -98], look: [-65, 168, 82], time: 3000 },
        { point: [-69, 20, -124], look: [15, 124, 53], time: 3000 },
        { point: [-69, 20, -124], look: [15, 124, 53], time: 3000 },
        { point: [-189, 20, -117], look: [-117, 129, 48], time: 5000 },
        { point: [-189, 20, -117], look: [-117, 129, 48], time: 3000 },
        { point: [-63, 20, -98], look: [-65, 168, 82], time: 2000 },
      ];
    }
    let sceneCartoon: any = this.sceneChange(sceneAngleList);
    this.smtCartoonList = [...sceneCartoon[0], ...sceneCartoon[1]];
    let lineList = [this.options.Smt1, this.options.Smt2, this.options.Smt3];
    let line = lineList[index - 1]; // 产线对应obj
    if (this.objLineArr.length < 1) {
      for (let smt of lineList) {
        smt.traverse((item: any) => {
          if (item.isMesh) {
            const edges = new Bol3D.EdgesGeometry(item.geometry);
            const linelineSegment = new Bol3D.LineSegments(
              edges,
              new Bol3D.LineBasicMaterial({ color: "#0dd8fd" })
            );
            item.add(linelineSegment);
            linelineSegment.name = smt.name;
            (linelineSegment as any).userData.type = "line";
            this.objLineArr.push(linelineSegment);
          }
        });
      }
    } else if (this.options.objLineArr.length === 265) {
      this.objLineArr.forEach((chlid: any) => {
        chlid.visible = true;
      });
    }
    // 视角切换
    for (let i = 0; i < sceneCartoon[0].length - 1; i++) {
      sceneCartoon[0][i].chain(sceneCartoon[0][i + 1]);
      sceneCartoon[1][i].chain(sceneCartoon[1][i + 1]);
    }
    this.mouseLockToggle(false);
    sceneCartoon[0][0].start();
    sceneCartoon[1][0].start();
    let offsetList = [
      [-10, 2, -20],
      [0, 2, 0],
      [-10, 2, -20],
      [0, 2, 0],
      [-10, 2, -20],
      [0, 2, 0],
    ];

    sceneCartoon[0][1].onComplete(() => {
      this.objLineArr.forEach((chlid: any) => {
        chlid.visible = false;
      });
      let objIndex = (index - 1) * 2;
      this.equitPopup(false, this.options.floor3PopupBrowse[objIndex].obj, offsetList[objIndex]);
    });
    sceneCartoon[0][3].onComplete(() => {
      this.options.popupObj.visible = false;
      this.options.jiqiTopArr.forEach((chlid: any) => {
        if (chlid.userData.id == index) chlid.visible = false;
      });
      this.options.cardArr.forEach((chlid: any) => {
        if (chlid.userData.id == index) chlid.visible = true;
      });
    });
    sceneCartoon[0][4].onComplete(() => {
      this.options.jiqiTopArr.forEach((chlid: any) => {
        if (chlid.userData.id == index) chlid.visible = true;
      });
      this.options.cardArr.forEach((chlid: any) => {
        if (chlid.userData.id == index) chlid.visible = false;
      });
    });
    sceneCartoon[0][5].onComplete(() => {
      let objIndex = (index - 1) * 2 + 1;
      this.equitPopup(false, this.options.floor3PopupBrowse[objIndex].obj, offsetList[objIndex]);
      // 产线对应灯隐藏
      this.options.lampList.forEach((chlid: any) => {
        if (chlid.userData.lineID === index) chlid.visible = false;
      });
      this.objLineArr.forEach((chlid: any) => {
        chlid.visible = true;
      });
      line.traverse((chlid: any) => {
        if (chlid.isMesh && chlid.userData.type != "line") {
          chlid.material.transparent = true;
          let transparentChange = new Bol3D.TWEEN.Tween(chlid.material)
            .to({ opacity: 0.05 }, 3000)
            .start();
          this.smtCartoonList.push(transparentChange);
          this.meshList.push(chlid);
        }
      });
    });
    sceneCartoon[1][7].onStart(() => {
      this.options.popupObj.visible = false;
    });
    sceneCartoon[1][8].onComplete(() => {
      let objIndex = (index - 1) * 2;
      this.equitPopup(false, this.options.floor3PopupBrowse[objIndex].obj, offsetList[objIndex]);
    });
    sceneCartoon[1][10].onComplete(() => {
      let objIndex = (index - 1) * 2 + 1;
      this.equitPopup(false, this.options.floor3PopupBrowse[objIndex].obj, offsetList[objIndex]);
    });
    sceneCartoon[1][11].onComplete(() => {
      this.options.popupObj.visible = false;
    });

    sceneCartoon[1][12].onComplete(() => {
      // 产线对应灯显示
      this.options.lampList.forEach((chlid: any) => {
        if (chlid.userData.lineID === index) chlid.visible = true;
      });
      line.traverse((chlid: any) => {
        if (chlid.isMesh && chlid.userData.type != "line") {
          let transparentChange = new Bol3D.TWEEN.Tween(chlid.material)
            .to({ opacity: chlid.userData.opacity }, 3000)
            .start();
          this.smtCartoonList.push(transparentChange);
        }
      });
      this.objLineArr.forEach((chlid: any) => {
        chlid.visible = false;
      });
      animation.paused = true;
      animation.time = 0;
      this.smtCartoonList = [];
      this.meshList = [];
      this.lineIndex = 0;
      this.mouseLockToggle(true);
      fun && fun();
    });
  };
  // smt 状态恢复
  smtBack(fun?: Function) {
    // 补间动画停止
    if (this.smtCartoonList.length > 0) {
      this.smtCartoonList.forEach((chlid) => {
        chlid && chlid.stop();
      });
      this.smtCartoonList = [];
    }
    // 上一次mesh透明度恢复
    if (this.meshList.length > 0) {
      this.meshList.forEach((chlid) => {
        chlid.material.opacity = chlid.userData.opacity;
        if (chlid.name.includes("QuanZhiDongK_X")) chlid.visible = true;
        if (chlid.name.includes("TuBiao")) chlid.visible = false;
      });
      this.meshList = [];
    }
    // 边框线隐藏
    if (this.objLineArr.length > 0) {
      this.objLineArr.forEach((chlid: any) => {
        chlid.visible = false;
      });
    }
    // 动画停止
    this.container.mixerActions[1].paused = true;
    this.container.mixerActions[1].time = 0;
    // 暂停功能恢复
    if (this.cartoonStatus) {
      this.currentCartoon = [];
      this.cartoonStatus = false;
      this.lineIndex = 0;
    }
    //灯显示
    this.options.lampList.forEach((chlid: any) => {
      chlid.visible = true;
    });
    fun && fun();
  }

  smt_Pause() {
    let list = this.options.floorIndex == 3 ? this.smtCartoonList : this.floor2_Cartoon;
    if (list.length < 1) return;
    if (this.cartoonStatus) {
      if (this.currentCartoon.length > 0) {
        this.currentCartoon.forEach((chlid) => {
          chlid.resume();
        });
        this.currentCartoon = [];
        this.cartoonStatus = false;
        if (this.options.floorIndex == 3) this.container.mixerActions[1].paused = false;
        this.mouseLockToggle(false);
      }
      return;
    }
    list.forEach((chlid: any) => {
      if (chlid.isPlaying()) {
        chlid.pause();
        this.currentCartoon.push(chlid);
        this.cartoonStatus = true;
        this.mouseLockToggle(true);
      }
    });
    if (this.options.floorIndex == 3) this.container.mixerActions[1].paused = true;
  }
  avgMove(agvState: boolean) {
    if (!agvState) {
      if (this.agvCartoon.length > 1) {
        this.agvCartoon.forEach((chlid) => {
          chlid && chlid.stop();
        });
        if (this.options.floorIndex != 0) {
          this.options.AGV.position.set(...this.options.agvRouteList[this.options.floorIndex - 1][6]);
          this.options.AGV.rotation.y = this.options.agvAngleList[this.options.floorIndex - 1][6];
        } else {
          this.options.AGV.position.set(...this.options.agvRouteList[2][6]);
          this.options.AGV.rotation.y = this.options.agvAngleList[2][6];
        }
      }
      return;
    }
    if (this.options.floorIndex === 0) return;
    let agvAction: any = this.agvChange(
      this.options.agvRouteList[this.options.floorIndex - 1],
      this.options.agvAngleList[this.options.floorIndex - 1]
    );
    for (let i = 0; i < this.options.agvRouteList[this.options.floorIndex - 1].length; i++) {
      agvAction[0][i].chain(agvAction[1][i]);
      if (i < this.options.agvRouteList[this.options.floorIndex - 1].length - 1)
        agvAction[1][i].chain(agvAction[0][i + 1]);
    }
    this.agvCartoon = [...agvAction[0], ...agvAction[1]];
    agvAction[0][0].start();
    agvAction[1][this.options.agvRouteList[this.options.floorIndex - 1].length - 1].onComplete(
      () => {
        this.avgMove(true);
      }
    )
  }
  agvRandomMove(state: boolean, forword?: string) {
    if (state) {
      let angleTemp: number;
      if (forword == "ahead") {
        if (this.options.floorIndex === 1) angleTemp = Math.PI;
        if (this.options.floorIndex === 2) angleTemp = Math.PI / 2;
        if (this.options.floorIndex === 3) angleTemp = Math.PI / 2;
      } else if (forword == "back") {
        if (this.options.floorIndex === 1) angleTemp = 0;
        if (this.options.floorIndex === 2) angleTemp = -Math.PI / 2;
        if (this.options.floorIndex === 3) angleTemp = -Math.PI / 2;
      }
      this.options.agvRouteList1[this.options.floorIndex - 1].forEach((chlid: any, index: number) => {
        if (index > 0 && index < 4) chlid.angle = angleTemp;
      });
      let cartoon: any = this.agvChange2(this.options.agvRouteList1[this.options.floorIndex - 1], forword as any);
      this.agvCartoonList1 = [...cartoon.flat()];
      for (let i = 0; i < this.options.agvRouteList1[this.options.floorIndex - 1].length - 1; i++) {
        cartoon[0][i].chain(cartoon[1][i]);
        if (cartoon[0][i + 1]) cartoon[1][i].chain(cartoon[0][i + 1]);
      }
      cartoon[0][0].start();
      // 随机巡检
      [0, 1, 2].forEach((index) => {
        cartoon[1][index].onStart(() => {
          let randomNum = Math.ceil(Math.random() * 5);
          if (randomNum === 5) {
            cartoon[1][index].pause();
            let obj;
            let pos;
            if (forword == "ahead") {
              obj = this.options.agvRouteList1_random[this.options.floorIndex - 1][index];
              pos = this.options.agvRouteList1[this.options.floorIndex - 1][index + 1].point;
            }
            if (forword == "back") {
              if (index == 0) {
                obj = this.options.agvRouteList1_random[this.options.floorIndex - 1][2];
                pos = this.options.agvRouteList1[this.options.floorIndex - 1][3].point;
              } else if (index == 1) {
                obj = this.options.agvRouteList1_random[this.options.floorIndex - 1][index];
                pos = this.options.agvRouteList1[this.options.floorIndex - 1][2].point;
              } else if (index == 2) {
                obj = this.options.agvRouteList1_random[this.options.floorIndex - 1][0];
                pos = this.options.agvRouteList1[this.options.floorIndex - 1][1].point;
              }
            }
            let randomCartoon: any = this.agvRandomChange(obj, pos);
            this.agvCartoonList1.push(...randomCartoon);
            for (let i = 0; i < randomCartoon.length - 1; i++) {
              randomCartoon[i].chain(randomCartoon[i + 1]);
            }
            randomCartoon[0].start();
            randomCartoon[randomCartoon.length - 1].onComplete(function () {
              cartoon[1][index].resume();
            });
          }
        });
      });
      cartoon[1][cartoon[1].length - 1].onComplete(() => {
        if (forword == "ahead") {
          forword = "back";
        } else {
          forword = "ahead";
        }
        this.agvCartoonList1 = [];
        this.agvRandomMove(true, forword);
      });
      // false 退出动画
    } else {
      if (this.agvCartoonList1.length < 1) return;
      this.agvCartoonList1.forEach((chlid) => {
        chlid && chlid.stop();
      });
      this.agvCartoonList1 = [];
      if (this.options.floorIndex != 0) {
        this.options.AGV1.position.set(...this.options.agvRouteList1[this.options.floorIndex - 1][0].point);
        this.options.AGV1.rotation.y = this.options.agvRouteList1[this.options.floorIndex - 1][0].angle;
      } else {
        this.options.AGV1.position.set(...this.options.agvRouteList1[2][0].point);
        this.options.AGV1.rotation.y = Math.PI / 2;
      }
    }
  }
  agvChange(routeList: Array<any>, angleList: Array<any>) {
    if (!routeList || !angleList) return;
    let temp = [];
    let temp1 = [];
    for (let i = 0; i < routeList.length; i++) {
      let pos = i == 0 ? routeList[routeList.length - 1] : routeList[i - 1];
      let position1 = new Bol3D.Vector3(...routeList[i]);
      let position2 = new Bol3D.Vector3(...pos);
      let time = Math.abs(position2.distanceTo(position1));
      temp[i] = new Bol3D.TWEEN.Tween(this.options.AGV).to(
        {
          position: new Bol3D.Vector3(...routeList[i]),
        },
        time * 30
      );
      temp1[i] = new Bol3D.TWEEN.Tween(this.options.AGV.rotation).to({ y: angleList[i] }, 500);
    }
    return [temp, temp1];
  }
  agvChange2(list: Array<any>, forword: string) {
    if (!list || !forword) return;
    let temp: Array<any> = [];
    let temp1: Array<any> = [];
    if (forword == "ahead") {
      for (let i = 1; i < list.length; i++) {
        let pos1 = new Bol3D.Vector3(...list[i - 1].point);
        let pos2 = new Bol3D.Vector3(...list[i].point);
        let time = Math.abs(pos1.distanceTo(pos2));
        temp[i - 1] = new Bol3D.TWEEN.Tween(this.options.AGV1).to(
          { position: pos2 },
          time * 30
        );
        temp1[i - 1] = new Bol3D.TWEEN.Tween(this.options.AGV1.rotation).to(
          { y: list[i].angle },
          200
        );
      }
    } else if (forword == "back") {
      for (let i = list.length - 2; i >= 0; i--) {
        let pos1 = new Bol3D.Vector3(...list[i + 1].point);
        let pos2 = new Bol3D.Vector3(...list[i].point);
        let time = Math.abs(pos1.distanceTo(pos2));
        let num = 0;
        if (i == 3) {
          num = 0;
        } else if (i == 2) {
          num = 1;
        } else if (i == 1) {
          num = 2;
        } else if (i == 0) {
          num = 3;
        }
        temp[num] = new Bol3D.TWEEN.Tween(this.options.AGV1).to({ position: pos2 }, time * 30);
        temp1[num] = new Bol3D.TWEEN.Tween(this.options.AGV1.rotation).to(
          { y: list[i].angle },
          200
        );
      }
    }
    return [temp, temp1];
  }
  agvRandomChange(obj: any, pos: Array<number>) {
    if (!obj || !pos) return;
    let temp = [];
    let pos1 = new Bol3D.Vector3(...pos);
    let pos2 = new Bol3D.Vector3(...obj.point);
    let time = Math.abs(pos1.distanceTo(pos2));
    let angle1, angle2;
    if (this.options.floorIndex === 1) {
      angle1 = Math.PI / 2;
      angle2 = -Math.PI / 2;
    } else if (this.options.floorIndex === 2) {
      angle1 = Math.PI;
      angle2 = 0;
    } else if (this.options.floorIndex === 3) {
      angle1 = 0;
      angle2 = Math.PI;
    }
    temp[0] = new Bol3D.TWEEN.Tween(this.options.AGV1.rotation).to({ y: angle1 }, 200);
    temp[1] = new Bol3D.TWEEN.Tween(this.options.AGV1).to({ position: pos2 }, time * 30);
    temp[2] = new Bol3D.TWEEN.Tween(this.options.AGV1.rotation).to({ y: angle2 }, 200);
    temp[3] = new Bol3D.TWEEN.Tween(this.options.AGV1).to({ position: pos1 }, time * 30);
    return temp;
  }

  addCanvas() {
    let canvas = document.createElement("canvas");
    canvas.width = 241;
    canvas.height = 187;
    let c: any = canvas.getContext("2d");
    // 矩形区域填充背景
    c.fillStyle = "rgba(255, 255, 255, 0)";
    c.fillRect(0, 0, 241, 187);
    c.beginPath();
    // 文字

    let img = new Image();
    img.src = this.PRO_ENV + "3d/textures/p1.png";
    img.onload = () => {
      c.drawImage(this, 0, 0, 241, 187);
      c.fillStyle = "#0fefe2"; //文本填充颜色
      c.font = "bold 15px 微软雅⿊"; //字体样式设置
      c.textBaseline = "top"; //文本与fillText定义的纵坐标            top hanging middle  ideographic bottom
      c.textAlign = "left"; //文本居中(以fillText定义的横坐标)        start  end  center  left   right
      c.fillText("回流焊", 98, 35);

      let texture = new Bol3D.CanvasTexture(canvas);
      texture.needsUpdate = true;
      let material = new Bol3D.SpriteMaterial({ map: texture });
      this.textru = new Bol3D.Sprite(material);

      this.textru.scale.set(20, 15, 1);
      this.textru.renderOrder = 500;
      this.container.attach(this.textru);
      this.textru.center.y = 0;
      this.textru.position.set(-108, 90, -9);
      // container.addBloom(this.textru);
      this.textru.visible = false;
    };
  }
  // 修改title弹窗map
  changeSpriteMap(type: boolean, title: string, offset: Array<number>, newPosition: Array<number>) {
    this.textru.visible = false;
    let path: string;
    if (type) {
      path = "3d/textures/p1.png";
    } else {
      path = "3d/textures/p2.png";
    }
    // 定义cavas
    let canvas = document.createElement("canvas");
    canvas.width = 241;
    canvas.height = 187;
    let c: any = canvas.getContext("2d");
    // 矩形区域填充背景
    c.fillStyle = "rgba(255, 255, 255, 0)";
    c.fillRect(0, 0, 241, 187);
    c.beginPath();
    let img = new Image();
    img.src = this.PRO_ENV + path;
    img.onload = () => {
      c.drawImage(this, 0, 0, 241, 187);
      let len = title.length;
      let offset_x = (241 - len * 15) / 2;
      if (type) {
        c.fillStyle = "#0fefe2"; //文本填充颜色
        c.font = "bold 15px 微软雅⿊"; //字体样式设置
        c.textBaseline = "top"; //文本与fillText定义的纵坐标            top hanging middle  ideographic bottom
        c.textAlign = "left"; //文本居中(以fillText定义的横坐标)        start  end  center  left   right
        c.fillText(`${title}`, offset_x, offset[1]);
      } else {
        c.drawImage(this, 0, 0, 241, 187);
        c.fillStyle = "#E7000A"; //文本填充颜色
        c.font = "bold 15px 微软雅⿊"; //字体样式设置
        c.textBaseline = "top"; //文本与fillText定义的纵坐标            top hanging middle  ideographic bottom
        c.textAlign = "left"; //文本居中(以fillText定义的横坐标)        start  end  center  left   right
        c.fillText(`${title}`, offset_x, offset[1]);
      }
      let texture = new Bol3D.CanvasTexture(canvas);
      texture.needsUpdate = true;
      this.textru.material.map = texture;
      this.textru.position.set(...newPosition);
      this.textru.visible = true;
    };
  }

  // 设备加弹窗
  addIconCard() {
    let iconInformation = new Bol3D.POI.Popup3D({
      value: `<div class='popupInformation' id></div>`,
      position: [100, 300, 0],
      className: "externalBox",
      closeVisible: "visible",
      scale: [0.2, 0.2, 0.2],
    });
    iconInformation.visible = false;
    this.container.attach(iconInformation);
    this.container.addBloom(iconInformation);
    this.options.popupObj = iconInformation;
  };
  // 改变弹窗样式、内容
  popupChange(type: string, name: string, data: any, fun?: Function) {
    if (!type) return;
    if (!data || data.length < 1) type = "none";
    this.options.popupObj.visible = false;
    let dom: any = document.querySelector(".popupInformation");
    dom.style.backgroundColor = "";
    if (type == "normal") {
      dom.style.backgroundImage = `url(${this.PRO_ENV}3d/textures/弹窗绿.png)`;
      let titleName = name;
      // let schedule = 5.68; // 生产进度
      // let equitID = "0591";
      // let equitStatus = "运行";
      // let equitTemperature = 40;
      // let equitNG = 12;
      // let equitNG_rate = 3.16;
      let count = data.count;
      let red = data.red ? "亮" : "不亮";
      let green = data.green ? "亮" : "不亮";
      let yellow = data.yellow ? "亮" : "不亮";
      // dom.innerHTML = `<div class='titleName'>${titleName}</div>
      // <div class='iconAndContent'><div class='contentTitle'>生产进度</div><div class='schedule'>${schedule}%</div>
      // <div class='bar'><div class='barChlid' style='width:${
      //   (schedule * 188) / 100
      // }px'></div></div></div><div class='contentBox'>
      // <div class='equitID'>设备编号：${equitID}</div><div class='equitStatus'>设备状态：${equitStatus}</div><div class='equitTemperature'>设备温度：${equitTemperature}℃</div>
      // <div class='equitNG'>不良品：${equitNG}</div><div class='equitNG_rate'>不良品：${equitNG_rate}%</div></div>`;
      dom.innerHTML = `<div class='titleName'>${titleName}</div>
    <div class='contentBox'>
    <div class='equitID'>产量：${count}</div>
    <div class='red'>红灯：${red}</div>
    <div class='green'>黄灯：${yellow}</div>
    <div class='yellow'>绿灯：${green}</div></div>
    `;
    } else if (type == "warn") {
      dom.style.backgroundImage = `url(${this.PRO_ENV}3d/textures/弹窗红.png)`;
      let titleName = name;
      let equitID = "0168";
      let equitStatus = "故障";
      let reason = "温度过高";
      dom.innerHTML = `<div class='titleName' style='color:#E7000A'>${titleName}</div>
    <div class='warnBox'><div class='warn'></div></div>
    <div class='contentBox' style='top:168px;height:57px'><div class='equitID'>设备编号：${equitID}</div><div class='equitStatus'>设备状态：${equitStatus}</div>
    <div class='reason'>故障原因：${reason}</div> </div>`;
    } else if (type == "robit") {
      dom.style.backgroundImage = `url(${this.PRO_ENV}3d/textures/弹窗绿.png)`;
      let titleName = name;
      let batchIdex = data["fbatchNo"];
      let equitID = data["fserialNo"];
      let Station = data["fworkSection"];

      dom.innerHTML = `<div class='titleName' >${titleName}</div>
    <div class='contentBox' style='top:110px;height:57px;font-size:15px'><div class='batchIdex'>当前批次号：${batchIdex}</div><div class='equitID'>产品ID：${equitID}</div>
    <div class='Station'>工位：${Station}</div> </div>
    `;
    } else if (type == "none") {
      dom.style.backgroundImage = `url(${this.PRO_ENV}3d/textures/弹窗绿.png)`;
      let titleName = name;
      dom.innerHTML = `
    <div class='titleName' >${titleName}</div>
    <div class='contentBox' style='top:110px;height:57px;font-size:25px'>暂无数据！
     </div>
    `;
    }
    fun && fun();
    this.options.popupObj.visible = true;
  }

  // 灯状态更新
  lampStatusChange(
    type: string,
    lineId?: number,
    equitType?: string,
    colorNum?: number,
    flashing?: boolean,
    close?: boolean
  ) {
    if (!type) return;
    if (type == "all") {
      this.options.lampList.forEach((chlid: any) => {
        chlid.children.forEach((chi: any) => {
          if (chi.name.substring(chi.name.length - 1) == 4) {
            // 1:黄灯 3：红灯 4：绿灯
            chi.material.lightMap = new Bol3D.TextureLoader().load(
              this.PRO_ENV + "3d/ffff(1).png"
            );
            chi.material.envMap = null;
            chi.material.lightMapIntensity = 15;
            this.container.addBloom(chi);
          } else {
            this.container.removeBloom(chi);
            chi.material.lightMapIntensity = -3;
          }
        });
      });
    } else if (type == "one") {
      if (!lineId || !equitType || !colorNum) return;

      this.options.lampList.forEach((chlid: any) => {
        if (
          chlid.userData.type &&
          chlid.userData.type == equitType &&
          chlid.userData.lineID == lineId
        ) {
          chlid.children.forEach((chi: any) => {
            if (chi.name.substring(chi.name.length - 1) == colorNum) {
              this.lightFlashing(chi, false);
              chi.material.lightMap = new Bol3D.TextureLoader().load(
                this.PRO_ENV + "3d/ffff(1).png"
              );

              if (!close) {
                // 灯正常亮
                if (!flashing) {
                  chi.material.lightMapIntensity = 15;
                  this.container.addBloom(chi);
                  // 灯闪烁
                } else {
                  this.lightFlashing(chi, true);
                }
                // 灯关闭
              } else {
                chi.material.lightMap = null;
                chi.material.lightMapIntensity = -3;
                this.container.removeBloom(chi);
              }
            }
          });
        }
      });
    }
  }

  lightFlashing(obj: any, type: boolean) {
    // type: true时闪烁，false关闭闪烁
    if (!obj) return;
    if (type) {
      let lighting = new Bol3D.TWEEN.Tween(obj.material).to(
        { lightMapIntensity: 15 },
        500
      );

      let closeing = new Bol3D.TWEEN.Tween(obj.material).to(
        { lightMapIntensity: -3 },
        500
      );
      let temp = [];
      if (obj.material.lightMapIntensity > 14.5) {
        closeing.chain(lighting);
        closeing.start();
        temp = [closeing, lighting];
      } else {
        lighting.chain(closeing);
        lighting.start();
        temp = [closeing, lighting];
      }
      this.lightFlashingList.push({
        name: obj.userData.type + obj.userData.lineID + `-${obj.userData.color}`,
        cartoon: [lighting, closeing],
      });
      temp[1].onComplete(() => {
        this.lightFlashing(obj, true);
      });
    } else {
      let status = false;
      this.lightFlashingList.forEach((chlid, index) => {
        if (
          chlid.name ==
          obj.userData.type + obj.userData.lineID + `-${obj.userData.color}`
        ) {
          chlid.cartoon[0] && chlid.cartoon[0].stop();
          chlid.cartoon[1] && chlid.cartoon[1].stop();
          this.lightFlashingList.splice(index, 1);
          status = true;
        }
      });
      if (status) {
        obj.material.lightMap = null;
        obj.material.lightMapIntensity = -3;
        this.container.removeBloom(obj);
      }
    }
  }

  // 发送mqtt请求
  sendMqTT() {
    let idList = [
      {
        deviceId: "cf9abc894c434ef28b6e657e38efa33d",
        deviceSecret: "T05TZcYApErwnn1I",
      },
      {
        deviceId: "af83c8c0603a4d418330eda498ececf0",
        deviceSecret: "axu8NwzbKHWDpxhw",
      },
      {
        deviceId: "96845588d8d44e0bb2a1cd5200dea250",
        deviceSecret: "XxTG79b34jS44jhN",
      },
      {
        deviceId: "a8a35cd8e33a4ddc88b78d22dd675ee1",
        deviceSecret: "AKrDmJQ02LLpMqfd",
      },
      {
        deviceId: "d87ae360512449d5a98f7a80e1273f1a",
        deviceSecret: "HS2M1OFdGdG3Dyrs",
      },
      {
        deviceId: "44d41be00f5d496ca36a6c52e41f11d6",
        deviceSecret: "sSqGkI28rMTACrEY",
      },
      {
        deviceId: "0791a7c08c9846abbcf633d1215551e0",
        deviceSecret: "LdwWCpmSZITFwTAJ",
      },
      {
        deviceId: "062bacc0e73b4157896192f582c806e4",
        deviceSecret: "wA5FnTF66kOGacZr",
      },
      {
        deviceId: "435b48e10e6245b491c84398fe37d3f8",
        deviceSecret: "Z8gfQU4zZgmGjxvf",
      },
      {
        deviceId: "ee942b49724c4fa3a0784d0135121243",
        deviceSecret: "JRmxfOfTgcHDEZyp",
      },
      {
        deviceId: "e78ea1b1f9d946dc82236884405a659b",
        deviceSecret: "ssoS3oIjPuIweWkt",
      },
      {
        deviceId: "f75456124a1c4cedb59fcf656a6c98a8",
        deviceSecret: "tDNS1ZMl7h6Dy9Dj",
      },
    ];

    idList.forEach((chlid, index) => {
      const client = (window as any).mqtt.connect("ws://10.18.0.248:3883/mqtt", {
        clientId: `pp:${chlid.deviceId}`,
        username: chlid.deviceId,
        password: `${chlid.deviceId}:${chlid.deviceSecret}`,
      });
      client.on("connect", function () {
        client.subscribe(`data/${chlid.deviceId}/stream`, function (err: any) {
          if (!err) {
            client.publish("presence", "Hello mqtt");
          }
        });
      });
      client.on("message", (topic: any, message: any) => {
        this.updateData(JSON.parse(message.toString()), index);
      });
    });
  }
  updateData(newData: any, i: number) {
    this.ajaxData.forEach((chlid, index) => {
      if (index == i) {
        let temp: any = {};
        Object.assign(temp, newData);
        let keys = Object.keys(temp);
        let tempData: any = {};
        for (let i = 0; i < keys.length; i++) {
          tempData[keys[i]] = parseInt(temp[keys[i]]);
        }
        chlid.data = tempData;
      }
    });
  }
  // 灯状态differ
  objDiffer(obj1: any, obj2: any) {
    if (!obj1 || !obj2) return;
    let newObj = Object.assign({}, obj1);
    let newObjKeys = Object.keys(newObj);
    let oldObj = Object.assign({}, obj2);
    let oldObjKeys = Object.keys(oldObj);
    if (newObjKeys.length != oldObjKeys.length) {
      return false;
    } else {
      if (newObjKeys.length > 0) {
        if (
          newObj.red != oldObj.red ||
          newObj.green != oldObj.green ||
          newObj.yellow != oldObj.yellow
        ) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    }
  }
  // 关闭开启鼠标功能
  mouseLockToggle(bool: boolean) {
    this.container.orbitControls.enablePan = bool;
    this.container.orbitControls.enableRotate = bool;
    this.container.orbitControls.enableZoom = bool;
  }
  tipPopup() {
    this.options.popPositionList.forEach((chlid: any) => {
      let scale = 3;
      if (chlid.floorIndex == 2) scale = 1.5;
      let position = [chlid.position.x, chlid.position.y + 2, chlid.position.z];
      let pop: any = new Bol3D.POI.Icon({
        position: [...position],
        scale: [scale, scale],
        sizeAttenuation: true,
        publicPath: this.PRO_ENV,
        url: "3d/textures/箭头.png",
      });
      pop.center.y = 0;
      pop.visible = false;
      pop.userData.type = chlid.name;
      pop.userData.position = chlid.position;
      pop.userData.floorIndex = chlid.floorIndex;
      if (chlid.floorIndex == 3) {
        pop.userData.line = chlid.line;
        pop.userData.get = true;
        pop.userData.parentPos = chlid.position;
        this.options.floor3_Icon_Click.push(pop);
      } else if (chlid.floorIndex == 2) {
        pop.userData.parentName = chlid.name;
        pop.userData.id = chlid.id;
        pop.userData.pos = chlid.pos;
        this.options.floor2_Icon_Click.push(pop);
      }
      this.container.attach(pop);
      this.container.addBloom(pop);
      this.options.tipPOpupList.push(pop);
    });
  }

  tipPopupMove() {
    this.options.tipPOpupList.forEach((chlid: any) => {
      new Bol3D.TWEEN.Tween(chlid.position)
        .to({ y: chlid.userData.position.y + 2 }, 1000)
        .start()
        .onComplete(() => {
          new Bol3D.TWEEN.Tween(chlid.position)
            .to({ y: chlid.userData.position.y }, 1000)
            .start()
            .onComplete(() => {
              this.tipPopupState = 0;
            });
        });
    });
  }

  // 流光生成函数
  lineContorl(obj: any, lineWidth: number, speedNum: number, color: any, attenuation: boolean) {
    // obj:流光对象 lineWidth：线宽 speedNum：速度 color：颜色 attenuation:流动衰减 true/false
    obj = new Bol3D.KLine2({
      lineWidth: lineWidth,
      speed: speedNum,
      color: color,
      attenuation: attenuation,
    });
    return obj;
  }

  // 流光生成
  liuGuang() {
    const lineArr: Array<any> = ["line", "line1", "line2"];
    const linePosition = [
      [
        228.2, 50, -199.12, -468.01, 50, -199.0, -468.03, 50, 231.17, -331.5, 50,
        231.24, -331.48, 50, 280.04, 81.8, 50, 279.96, 81.82, 50, 231.13, 228.17,
        50, 231.01, 228.2, 50, -199.12,
      ],
      [
        228.2, 78, -199.12, -468.01, 78, -199.0, -468.03, 78, 231.17, -331.5, 78,
        231.24, -331.48, 78, 280.04, 81.8, 78, 279.96, 81.82, 78, 231.13, 228.17,
        78, 231.01, 228.2, 78, -199.12,
      ],
      [
        228.2, 108, -199.12, -468.01, 108, -199.0, -468.03, 108, 231.17, -331.5,
        108, 231.24, -331.48, 108, 280.04, 81.8, 108, 279.96, 81.82, 108, 231.13,
        228.17, 108, 231.01, 228.2, 108, -199.12,
      ],
    ];
    lineArr.forEach((child, index) => {
      child = this.lineContorl(child, 4, 1, "#5697ef", true);
      child.setPositions(linePosition[index]);
      child.visible = false;
      this.container.attach(child);
      this.container.addBloom(child);
      child.userData.id = index + 1;
      this.options.LineTimeList.push(child);
    });
  }
  // 机器人产线弹窗
  robitPopup(isFocus: boolean, key: number, obj: any, point: Bol3D.Vector3, offset?: any) {
    getDT_RobotProcessData({ FWorkShop: key }).then((res) => {
      let type = "robit";
      let name = "机器人生产线" + key;
      let data = "";
      if (res) {
        type = "robit";
        res.data.forEach((chlid: any) => {
          if (chlid.fworkSection == obj.userData.id) data = chlid;
        });
      }
      // 假数据
      if (!data) {
        this.options.robitTempData.forEach((chlid: any) => {
          if (chlid.line == key && obj.userData.id == chlid.fworkSection)
            data = chlid;
        });
      }

      this.popupChange(type, name, data, () => {
        if (obj.type != "Icon") {
          this.options.popupObj.position.set(point.x, point.y + 15, point.z);
        } else {
          let pos = obj.userData.pos;
          this.options.popupObj.position.set(pos.x, pos.y + 15, pos.z);
        }
        if (isFocus) {
          this.sceneMove(
            [this.options.popupObj.position.x, this.options.popupObj.position.y, this.options.popupObj.position.z],
            [
              this.options.popupObj.position.x + 1,
              this.options.popupObj.position.y + 50,
              this.options.popupObj.position.z - 100,
            ],
            500
          );
        }
      });
    });
  };
  // 3楼设备弹窗
  equitPopup(isFocus: boolean, obj: any, offset?: any) {
    let name = obj.userData.type;
    let position = obj.userData.parentPos;
    let production;
    this.ajaxData.forEach((child) => {
      if (
        child.type == name &&
        child.lineID == obj.userData.line
        // child.data.count != undefined &&
        // child.data.red != undefined &&
        // child.data.green != undefined &&
        // child.data.yellow != undefined
      ) {
        let tempObj = { count: 0, red: 0, green: 0, yellow: 0 };
        production = Object.assign(tempObj, child.data);
      }
    });
    let type = "none";
    if (production) type = "normal";
    if (isFocus) {
      this.changeSpriteMap(true, name, [50, 35], [position.x, position.y, position.z]);
    }
    this.popupChange(type, name, production, () => {
      if (isFocus) {
        this.options.popupObj.position.set(position.x, position.y + 20, position.z + 20);
        this.sceneMove(
          [this.options.popupObj.position.x, this.options.popupObj.position.y, this.options.popupObj.position.z],
          [
            this.options.popupObj.position.x + 3,
            this.options.popupObj.position.y + 78,
            this.options.popupObj.position.z - 138,
          ],
          500
        );
      } else {
        this.options.popupObj.scale.set(0.05, 0.05);
        this.options.popupObj.position.set(
          position.x + offset[0],
          position.y + offset[1],
          position.z + offset[2]
        );
      }
    });
  };
  // 2楼弹窗
  floorPopupRequest(obj: any) {
    let key = obj.userData.parentName == "robit1" ? 1 : 2;
    let type = "robit";
    let name = "机器人生产线" + key;
    let data = "";
    let resData = key == 1 ? this.options.robitData1 : this.options.robitData2;
    if (resData) {
      resData.forEach((chlid: any) => {
        if (chlid.fworkSection == obj.userData.id) data = chlid;
      });
    }
    // 假数据
    if (!data) {
      this.options.robitTempData.forEach((chlid: any) => {
        if (chlid.line == key && obj.userData.id == chlid.fworkSection)
          data = chlid;
      });
    }
    this.popupChange(type, name, data, () => {
      let pos = obj.userData.popupPos;
      this.options.popupObj.scale.set(0.03, 0.03);
      this.options.popupObj.position.set(pos.x, pos.y + 5, pos.z);
    });
    let li: any = [];
    this.options.floor2_outline.forEach((chlid: any) => {
      if (
        chlid.userData.parentName == obj.userData.parentName &&
        chlid.userData.id == obj.userData.id
      )
        li.push(chlid);
    });
    this.container.outlineObjects = [...li];
  };

  robitCruise(callback?: Function) {
    if (this.isPause) {
      this.smt_Pause();
      return;
    }
    this.isPause = true;
    if (this.floor2_Cartoon.length > 0) {
      this.floor2_Cartoon.forEach((chlid: any) => {
        if (chlid) chlid.stop();
      });
    }
    let robitSceneList = [
      { point: [-267, 47, 103], look: [-271, 105, -12], time: 2000 },
      { point: [-297, 47, 85], look: [-321, 77, 32], time: 2000 },
      { point: [-276, 47, 85], look: [-301, 77, 35], time: 2000 },
      { point: [-276, 47, 85], look: [-301, 77, 35], time: 2000 },
      { point: [-271, 47, 85], look: [-295, 77, 35], time: 2000 },
      { point: [-271, 47, 85], look: [-295, 77, 35], time: 2000 },
      { point: [-254, 47, 85], look: [-278, 77, 35], time: 2000 },
      { point: [-254, 47, 85], look: [-278, 77, 35], time: 2000 },
      { point: [-248, 47, 85], look: [-266, 77, 35], time: 2000 },
      { point: [-248, 47, 85], look: [-266, 77, 35], time: 2000 },
      { point: [-244, 47, 85], look: [-264, 77, 35], time: 2000 },
      { point: [-244, 47, 85], look: [-264, 77, 35], time: 2000 },
      { point: [-242, 47, 85], look: [-262, 77, 35], time: 2000 },
      { point: [-242, 47, 85], look: [-262, 77, 35], time: 2000 },
      { point: [-235, 47, 85], look: [-260, 77, 35], time: 2000 },
      { point: [-235, 47, 85], look: [-260, 77, 35], time: 2000 },
      { point: [-231, 47, 85], look: [-256, 77, 34], time: 2000 },
      { point: [-231, 47, 85], look: [-256, 77, 34], time: 2000 },
      { point: [-227, 47, 85], look: [-252, 77, 34], time: 2000 },
      { point: [-227, 47, 85], look: [-252, 77, 34], time: 2000 },
      { point: [-223, 47, 85], look: [-248, 77, 34], time: 2000 },
      { point: [-223, 47, 85], look: [-248, 77, 34], time: 2000 },
      { point: [-211, 47, 88], look: [-236, 77, 34], time: 2000 }, //
      { point: [-230, 47, 87], look: [-198, 101, 83], time: 2000 }, //
      { point: [-234, 47, 73], look: [-237, 103, 101], time: 2000 },
      { point: [-234, 47, 73], look: [-237, 103, 101], time: 2000 },
      { point: [-238, 47, 73], look: [-241, 103, 100], time: 2000 },
      { point: [-238, 47, 73], look: [-241, 103, 100], time: 2000 },
      { point: [-240, 47, 72], look: [-243, 103, 100], time: 2000 },
      { point: [-240, 47, 72], look: [-243, 103, 100], time: 2000 },
      { point: [-243, 47, 72], look: [-246, 103, 100], time: 2000 },
      { point: [-243, 47, 72], look: [-246, 103, 100], time: 2000 },
      { point: [-257, 47, 71], look: [-260, 103, 99], time: 2000 },
      { point: [-257, 47, 71], look: [-260, 103, 99], time: 2000 },
      { point: [-262, 47, 71], look: [-265, 103, 99], time: 2000 },
      { point: [-262, 47, 71], look: [-265, 103, 99], time: 2000 },
      { point: [-265, 47, 71], look: [-268, 103, 99], time: 2000 },
      { point: [-265, 47, 71], look: [-268, 103, 99], time: 2000 },
      { point: [-269, 47, 71], look: [-272, 103, 99], time: 2000 },
      { point: [-269, 47, 71], look: [-272, 103, 99], time: 2000 },
      { point: [-286, 47, 69], look: [-289, 103, 97], time: 2000 },
      { point: [-286, 47, 69], look: [-289, 103, 97], time: 2000 },
      { point: [-289, 47, 70], look: [-292, 103, 98], time: 2000 },
      { point: [-289, 47, 70], look: [-292, 103, 98], time: 2000 },
      { point: [-302, 47, 70], look: [-305, 103, 98], time: 2000 }, //
      { point: [-302, 47, 70], look: [-332, 102, 67], time: 2000 }, //
      { point: [-302, 47, 71], look: [-317, 93, 31], time: 2000 }, //
      { point: [-111, 47, 101], look: [-126, 424, -537], time: 2000 }, //
    ];

    let sceneList: any = this.sceneChange(robitSceneList);
    this.floor2_Cartoon = [...sceneList.flat()];
    for (let i = 0; i < sceneList[0].length - 1; i++) {
      sceneList[0][i].chain(sceneList[0][i + 1]);
      sceneList[1][i].chain(sceneList[1][i + 1]);
    }
    this.mouseLockToggle(false);
    sceneList[0][0].start();
    sceneList[1][0].start();
    let popupSceneList = [
      2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42,
    ];
    this.options.floor2RobitObject.forEach((chlid: any, index: number) => {
      sceneList[1][popupSceneList[index]].onComplete(() => {
        this.floorPopupRequest(chlid.obj);
      });
      sceneList[1][popupSceneList[index] + 1].onComplete(() => {
        this.options.popupObj.visible = false;
      });
    });
    sceneList[1][sceneList[1].length - 1].onComplete(() => {
      this.isPause = false;
      this.floor2_Cartoon = [];
      this.mouseLockToggle(true);
      this.container.outlineObjects = [];
      callback && callback();
    });
  };

}
