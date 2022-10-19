import { hexToRgba } from "@/2d/unitls/util";
export const echart = {
  PDSProceesRadar(data0: Array<any>) {
    let data = [
      {
        name: "产品1",
        value: 60,
      },
      {
        name: "产品2",
        value: 90,
      },
      {
        name: "产品3",
        value: 82,
      },
      {
        name: "产品4",
        value: 69,
      },
      {
        name: "产品5",
        value: 22,
      },
    ];
    if (data0) data = data0;
    const ahData = data.map((item) => item.name);
    data.push(data[0]);

    return {
      color: ["#FFC80A", "#20DCFF"],
      tooltip: {
        show: true,
        trigger: "axis",
        textStyle: {
          fontSize: 12,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "70%",
      },
      angleAxis: {
        type: "category",
        data: ahData,
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        axisLabel: {
          fontSize: 12,
          color: "#ffffff",
          align: "center",
          formatter: function (value: any) {
            return value;
          },
        },
      },
      radiusAxis: [
        {
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(255,255,255,.2)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 10,
            color: "#ffffff",
            align: "right",
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          type: "line",
          data: data,
          symbol: "none",
          coordinateSystem: "polar",
          name: "实际生产",
          lineStyle: {
            color: "#FFC80A",
            width: 1,
          },
          areaStyle: {
            color: "rgba(255, 200, 10, .5)",
          },
        },
      ],
    };
  },
  seriesBar3() {
    let data1 = [];
    let data2 = [];
    for (let i = 0; i < 7; i++) {
      const time = (
        new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000) as any
      ).format("MM-dd");
      data1.push({
        name: time,
        value: (Math.random() * 500).toFixed(0),
      });
      data2.push({
        name: time,
        value: (Math.random() * 100).toFixed(0),
      });
    }
    data1 = data1.reverse();
    data2 = data2.reverse();
    return {
      grid: {
        top: "20%",
        left: "5%",
        right: "3%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        show: true,
        right: "3%",
        top: "2%",
        itemWidth: 10,
        itemHeight: 10,
        icon: "rect",
        textStyle: {
          color: "#ffffff",
          fontSize: 12,
        },
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: "#ffffff",
          },
          name: "单位：台（件）",
          nameTextStyle: {
            color: "#ffffff",
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: "#A0F7FF",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#A0F7FF",
            },
          },
        },
      ],
      xAxis: [
        {
          type: "category",
          data: data1.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: "#A0F7FF",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "bar",
          data: data1,
          name: "合格",
          barWidth: "20%",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#5CF0B0",
                },
                {
                  offset: 1,
                  color: "#5CD6F0",
                },
              ],
            },
            borderRadius: 10,
          },
        },
        {
          type: "bar",
          data: data2,
          name: "不合格",
          barWidth: "20%",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#939393",
                },
                {
                  offset: 1,
                  color: "#FFFFFF",
                },
              ],
            },
            borderRadius: 10,
          },
        },
      ],
    };
  },
  seriespie2() {
    let data = [
      {
        value: 140,
        name: "未加工",
      },
      {
        value: 490,
        name: "加工中",
      },
      {
        value: 370,
        name: "已完成",
      },
    ];
    return {
      color: ["#73DCFE", "#73ACFF", "#2CE6EE"],
      title: {
        top: "35%",
        left: "center",
        subtext: data.reduce((total, item) => total + item.value, 0),
        subtextStyle: {
          color: "#FFF045",
          fontSize: 14,
        },
        text: "总量",
        textStyle: {
          color: "#FFFFFF",
          fontSize: 10,
        },
      },
      legend: {
        bottom: "3%",
        textStyle: {
          color: "#ffffff",
          formatter: "{value}",
        },
        itemWidth: 22,
        itemHeight: 9,
      },
      series: [
        {
          type: "pie",
          center: ["50%", "45%"],
          radius: ["40%", "70%"],
          label: {
            show: true,
            formatter: "{b}:{c}",
            color: "#fff",
            fontSize: 12,
          },
          data,
        },
      ],
    };
  },
  seriesBar() {
    const colors = [
      "#FFA00A",
      "#FEEB5D",
      "#29F6FE",
      "#29F6FE",
      "#29F6FE",
      "#19FF34",
      "#FE1934",
    ];
    const data = [
      {
        value: 97,
        name: "老化",
      },
      {
        value: 518,
        name: "养护",
      },
      {
        value: 212,
        name: "操作失误",
      },
      {
        value: 486,
        name: "固件更换",
      },
      {
        value: 427,
        name: "程序调节",
      },
      {
        value: 284,
        name: "硬件调节",
      },
      {
        value: 935,
        name: "其他",
      },
    ];
    let max = data.map((item) => item.value).sort((a, b) => b - a)[0];
    max = Math.ceil(max / 1000) * 1000;
    let data1: Array<any> = [];
    let data2: Array<any> = [];
    data.forEach((item, index) => {
      data1.push({
        ...item,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0,0,0,0)",
              },
              {
                offset: 0.8,
                color: colors[index],
              },
              {
                offset: 1,
                color: "#fff",
              },
            ],
          },
        },
      });
      data2.push({
        value: max,
        itemStyle: {
          color: hexToRgba(colors[index], 0.1),
          borderWidth: 1,
          borderColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: colors[index],
              },
              {
                offset: 1,
                color: hexToRgba(colors[index], 0.5),
              },
            ],
          },
        },
      });
    });
    return {
      grid: {
        left: "3%",
        top: "10%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
          axisLine: {
            show: false,
          },
          max,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            color: "#fff",
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          data: data.map((item) => item.name),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
          },
          inverse: true,
        },
      ],
      series: [
        {
          type: "bar",
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
          },
          barMinHeight: 40,
          label: {
            show: true,
            position: "insideLeft",
            lineHeight: 20,
            fontSize: 12,
            color: "#fff",
          },
          data: data1,
        },
        {
          type: "bar",
          barWidth: 20,
          barGap: "-150%",
          data: data2,
        },
      ],
    };
  },
  seriesline2() {
    const data = [
      {
        name: "产品1",
        value: 60,
      },
      {
        name: "产品2",
        value: 90,
      },
      {
        name: "产品3",
        value: 82,
      },
      {
        name: "产品4",
        value: 69,
      },
      {
        name: "产品5",
        value: 22,
      },
    ];
    const data1 = [
      {
        name: "产品1",
        value: 66,
      },
      {
        name: "产品2",
        value: 80,
      },
      {
        name: "产品3",
        value: 85,
      },
      {
        name: "产品4",
        value: 50,
      },
      {
        name: "产品5",
        value: 42,
      },
    ];
    const ahData = data.map((item) => item.name);
    data.push(data[0]);
    data1.push(data1[0]);
    return {
      color: ["#FFC80A", "#20DCFF"],
      tooltip: {
        show: true,
        trigger: "axis",
        textStyle: {
          fontSize: 12,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "80%",
      },
      angleAxis: {
        type: "category",
        data: ahData,
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        axisLabel: {
          fontSize: 12,
          color: "#ffffff",
          align: "center",
          formatter: function (value: any) {
            return value;
          },
        },
      },
      radiusAxis: [
        {
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(255,255,255,.2)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 10,
            color: "#ffffff",
            align: "right",
            formatter: "{value}%",
          },
        },
      ],
      series: [
        {
          type: "line",
          data: data,
          symbol: "none",
          coordinateSystem: "polar",
          name: "实际生产",
          lineStyle: {
            color: "#FFC80A",
            width: 1,
          },
          areaStyle: {
            color: "rgba(255, 200, 10, .5)",
          },
        },
        {
          type: "line",
          data: data1,
          symbol: "none",
          coordinateSystem: "polar",
          name: "目标生产",
          lineStyle: {
            color: "rgba(32, 220, 255, 1)",
            width: 1,
          },
          areaStyle: {
            color: "rgba(32, 220, 255, .5)",
          },
        },
      ],
    };
  },
};
