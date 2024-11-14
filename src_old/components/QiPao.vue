<template>
  <div ref="QiPao" style="width: 1000px; height: 800px"></div>
</template>

<script>
import * as echarts from "echarts";
import * as d3 from 'd3';
export default {
  data() {
    return {
        option: {},
        colorList: ['#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
    };
  },
  mounted() {
    let that = this
    let seriesData = [
      {
        depth: 0,
        id: 'option',
        index: 0,
        value: 0
      },
      {
        depth: 1,
        id: 'option.大连商品交易所',
        index: 1,
        value: 1
      },
      {
        depth: 1,
        id: 'option.上海期货交易所',
        index: 2,
        value: 1
      },
      {
        depth: 1,
        id: 'option.郑州商品交易所',
        index: 3,
        value: 2
      },
      {
        depth: 0,
        id: 'option.广州期货交易所',
        index: 4,
        value: 1
      },
      {
        depth: 1,
        id: 'option.上海国际能源交易中心',
        index: 5,
        value: 1
      },
    ];
    let displayRoot = stratify1();

    function stratify1() {
      return d3
        .stratify()
        .parentId(function (d) {

          return d.id.substring(0, d.id.lastIndexOf('.'));
        })(seriesData)
        .sum(function (d) {

          return d.value || 0;
        })
        .sort(function (a, b) {
          return b.value - a.value;
        });
    }

    function overallLayout(params, api) {
      let context = params.context;
      d3
        .pack()
        .size([api.getWidth() - 2, api.getHeight() - 2])
        .padding(0)(displayRoot);
      context.nodes = {};

      displayRoot.descendants().forEach(function (node) {

        context.nodes[node.id] = node;
      });
    }

    function renderItem(params, api) {
      let context = params.context;
      let idx = params.dataIndex;
      
      // Only do that layout once in each time `setOption` called.
      // 每次调用“setOption”时，只能进行一次布局。
      if (!context.layout) {
        context.layout = true;

        overallLayout(params, api);
      }
      let nodePath = api.value('id');
      let nodeName = nodePath
        .slice(nodePath.lastIndexOf('.') + 1)
        .split(/(?=[A-Z][^A-Z])/g)
        .join('')
      let node = context.nodes[nodePath];
      if (node.id === 'option') {
        node.r = 0
      }
      if (!node) {
        // Reder nothing.
        return;
      }

      let z2 = api.value('depth') * 2;
      return {
        type: 'circle',
        shape: {
          cx: node.x,
          cy: node.y,
          r: node.r
        },
        // transition: ['shape'],
        z2: z2,
        textContent: {
          type: 'text',
          style: {
            // transition: isLeaf ? 'fontSize' : null,
            text: nodeName,
            fill: '#fff',
            fontFamily: 'Arial',
            width: node.r,
            overflow: 'truncate',
            fontSize: 13
          },
          emphasis: {
            style: {
              overflow: null,
              fontSize: Math.max(node.r / 3, 12)
            }
          }
        },
        textConfig: {
          position: 'inside'
        },
        style: {
          fill: that.colorList[idx % that.colorList.length]
        },
        emphasis: {
          style: {
            fontFamily: 'Arial',
            fontSize: 6,
            shadowBlur: 20,
            shadowOffsetX: 3,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        }
      };
    }

    this.option = {
      dataset: {
        source: seriesData
      },
      tooltip: {},
      hoverLayerThreshold: Infinity,
      series: [{
        type: 'custom',
        colorBy: 'data',
        renderItem: renderItem,
        progressive: 0,
        coordinateSystem: 'none',
        encode: {
          tooltip: 'value',
          itemName: 'id'
        },
      }]
    }
    this.initEcharts()
  },
  methods: {
      initEcharts() {
        let myChart = echarts.init(this.$refs.QiPao)
        myChart.setOption(this.option)
      }
  },
};
</script>

<style>
</style>