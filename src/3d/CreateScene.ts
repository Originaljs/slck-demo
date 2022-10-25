import * as Bol3D from "./main";
import { common_attribute } from "./common";
import router from "@/2d/router/index";
import { getDT_RobotProcessData } from "../request/second";
import "@/2d/css/3d_index.css";

export default class CreateScene {
  container!: any;
  PRO_ENV: string;
  options: any;
  clickIndex!: number;
  mouseCartoon!: Array<any>;
  clock: any;
  pointVector3!: any;
  lookVector3!: any;
  changeList: Array<any> = [];
  constructor(url: string) {
    this.PRO_ENV = url;
    this.options = common_attribute;
    this.clock = new Bol3D.Clock();

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
                this.options.container.addBloom(chlid);
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
          tipPopup();
          // 3楼灯
          lampStatusChange("all");
          liuGuang();
          let tempArr = [];
          this.container.clickObjects.forEach((chlid: any) => {
            if (chlid.name != "gx") tempArr.push(chlid);
          });
          this.container.sky.name = "SKY";
          this.options.clickObjetcArr = [
            ...this.options.tempArr,
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
          addCanvas();
          addIconCard();
          sendMqTT();
          this.render();
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
        equitPopup(true, object);
        // 2楼自动线弹窗展示
      } else if (
        object.userData.parentName &&
        object.userData.parentName.includes("robit")
      ) {
        this.options.popupObj.scale.set(0.07, 0.07, 0.07);
        this.options.textru.visible = false;
        let key = object.userData.parentName == "robit1" ? 1 : 2;
        robitPopup(true, key, object, point);
        if (this.options.floor2_Cartoon.length > 0) {
          this.options.floor2_Cartoon.forEach((chlid: any) => {
            if (chlid) chlid.stop();
          });
          this.options.isPause = false;
          this.options.floor2_Cartoon = [];
          this.options.currentCartoon = [];
          this.options.cartoonStatus = false;
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
  }

  render() {
    requestAnimationFrame(this.render);
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
    if (this.options.popupObj && this.options.textru) {
      if (!this.options.popupObj.visible && this.options.textru.visible)
        this.options.textru.visible = false;
    }
    // 灯状态更改
    this.options.ajaxData.forEach((chlid: any, index: number) => {
      for (let i = 0; i < this.options.lampStatus.length; i++) {
        if (i == index) {
          let dataValue = Object.assign({}, chlid.data);
          let oldData = Object.assign({}, this.options.lampStatus[i].data);
          // 比较灯状态Change
          if (!objDiffer(dataValue, oldData) && chlid.type != "THT") {
            this.options.lampStatus[i].data = Object.assign({}, chlid.data);
            let lineID = chlid.lineID;
            let type = chlid.type;
            let temp = Object.assign({}, chlid.data);
            if (temp.red != oldData.red) {
              if (temp.red == 1) {
                lampStatusChange("one", lineID, type, 3);
              } else {
                lampStatusChange("one", lineID, type, 3, false, true);
              }
            }
            if (temp.green != oldData.green) {
              if (temp.green == 1) {
                lampStatusChange("one", lineID, type, 4);
              } else {
                lampStatusChange("one", lineID, type, 4, false, true);
              }
            }
            if (temp.yellow != oldData.yellow) {
              if (temp.yellow == 1) {
                lampStatusChange("one", lineID, type, 1);
              } else {
                lampStatusChange("one", lineID, type, 1, false, true);
              }
            }
          }
        }
      }
    });
    // 提示弹窗浮动
    if (this.options.tipPopupState == 0) {
      this.options.tipPopupState = 1;
      tipPopupMove();
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
    if (this.options.objLineArr.length > 0) {
      smtBack(); // smt 状态恢复
    }
    this.options.currentCartoon = [];
    this.options.cartoonStatus = false;
    if (this.options.floor2_Cartoon.length > 0) {
      this.options.floor2_Cartoon.forEach((chlid: any) => {
        if (chlid) chlid.stop();
      });
      this.options.floor2_Cartoon = [];
      this.options.isPause = false;
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
    avgMove(false);
    agvRandomMove(false);
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
    this.options.textru.visible = false;
    let change1 = this.sceneMove(
      this.options.sceneAngle[index - 1][0],
      this.options.sceneAngle[index - 1][1],
      0,
      () => {
        this.container.sunLight.intensity = 0.5;
        mouseLockToggle(true);
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
            avgMove(true);
            agvRandomMove(true, "ahead");
            this.changeList = [];
          });
        this.changeList.push(change2);
      }
    );
    this.changeList.push(...change1);
  }
}
