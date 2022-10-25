import { instance } from "./http";
// 测量头入库列表
export function getDT_SNStockList() {
  return instance({
    url: "sl/getDT_SNStock2",
  });
}
// 测量头当天入库数量
export function getDT_SNStock() {
  return instance({
    url: "sl/getDT_SNStock",
  });
}
// 测量头当天入库数量
export function getDT_PDSStock() {
  return instance({
    url: "sl/DT_PDSStock",
  });
}
// PDS当天计划实时数据
export function getDT_PDSPlan() {
  return instance({
    url: "sl/DT_PDSPlan",
  });
}
// PDS当天过程数据
export function getDT_PDSProcessData() {
  return instance({
    url: "sl/DT_PDSProcessData",
  });
}
// 机器人生产线
// export function getDT_RobotProcessData(params) {
//     return request1.post("sl/DT_RobotProcessData",{ FWorkShop:params.FWorkShop});
// }
export function getDT_RobotProcessData(params: any) {
  return instance({
    url: "sl/DT_RobotProcessData?" + "FWorkShop=" + params.FWorkShop,
  });
}
