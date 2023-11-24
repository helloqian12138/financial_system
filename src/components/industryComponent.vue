<template>
  <el-select   v-model="industry" placeholder="选择行业" size="mini">
    <el-option v-for="item in options_industry" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "industryComponent",
  data(){
    return{
      industry:'',
      options_industry: [{
        value: "新闻和出版业",
        label: "新闻和出版业"}, {
        value: "保险业",
        label: "保险业"}, {
        value: "铁路运输业",
        label: "铁路运输业"}, {
        value: "电力、热力生产和供应业",
        label: "电力、热力生产和供应业"}, {
        value: "专业技术服务业",
        label: "专业技术服务业"}, {
        value: "汽车制造业",
        label: "汽车制造业"}, {
        value: "零售业",
        label: "零售业"}, {
        value: "医药制造业",
        label: "医药制造业"}, {
        value: "电气机械和器材制造业",
        label: "电气机械和器材制造业"}, {
        value: "科技推广和应用服务业",
        label: "科技推广和应用服务业"}, {
        value: "金属制品业",
        label: "金属制品业"}, {
        value: "非金属矿物制品业",
        label: "非金属矿物制品业"}, {
        value: "软件和信息技术服务业",
        label: "软件和信息技术服务业"}, {
        value: "计算机、通信和其他电子设备制造业",
        label: "计算机、通信和其他电子设备制造业"}, {
        value: "化学原料和化学制品制造业",
        label: "化学原料和化学制品制造业"}, {
        value: "航空运输业",
        label: "航空运输业"}, {
        value: "石油、煤炭及其他燃料加工业",
        label: "石油、煤炭及其他燃料加工业"}, {
        value: "石油和天然气开采业",
        label: "石油和天然气开采业"}, {
        value: "电信、广播电视和卫星传输服务",
        label: "电信、广播电视和卫星传输服务"}, {
        value: "土木工程建筑业",
        label: "土木工程建筑业"}, {
        value: "互联网和相关服务",
        label: "互联网和相关服务"}, {
        value: "有色金属冶炼和压延加工业",
        label: "有色金属冶炼和压延加工业"}, {
        value: "商务服务业",
        label: "商务服务业"}, {
        value: "资本市场服务",
        label: "资本市场服务"}, {
        value: "铁路、船舶、航空航天和其他运输设备制造业",
        label: "铁路、船舶、航空航天和其他运输设备制造业"}, {
        value: "多式联运和运输代理业",
        label: "多式联运和运输代理业"}, {
        value: "装卸搬运和仓储业",
        label: "装卸搬运和仓储业"}, {
        value: "水的生产和供应业",
        label: "水的生产和供应业"}, {
        value: "批发业",
        label: "批发业"}, {
        value: "文教、工美、体育和娱乐用品制造业",
        label: "文教、工美、体育和娱乐用品制造业"}, {
        value: "房地产业",
        label: "房地产业"}, {
        value: "开采专业及辅助性活动",
        label: "开采专业及辅助性活动"}, {
        value: "通用设备制造业",
        label: "通用设备制造业"}, {
        value: "煤炭开采和洗选业",
        label: "煤炭开采和洗选业"}, {
        value: "食品制造业",
        label: "食品制造业"}, {
        value: "农副食品加工业",
        label: "农副食品加工业"}, {
        value: "有色金属矿采选业",
        label: "有色金属矿采选业"}, {
        value: "研究和试验发展",
        label: "研究和试验发展"}, {
        value: "酒、饮料和精制茶制造业",
        label: "酒、饮料和精制茶制造业"}, {
        value: "教育",
        label: "教育"}, {
        value: "专用设备制造业",
        label: "专用设备制造业"}, {
        value: "房屋建筑业",
        label: "房屋建筑业"}, {
        value: "纺织服装、服饰业",
        label: "纺织服装、服饰业"}, {
        value: "橡胶和塑料制品业",
        label: "橡胶和塑料制品业"}, {
        value: "水上运输业",
        label: "水上运输业"}, {
        value: "货币金融服务",
        label: "货币金融服务"}, {
        value: "黑色金属冶炼和压延加工业",
        label: "黑色金属冶炼和压延加工业"}, {
        value: "住宿业",
        label: "住宿业"}, {
        value: "燃气生产和供应业",
        label: "燃气生产和供应业"}, {
        value: "道路运输业",
        label: "道路运输业"}, {
        value: "生态保护和环境治理业",
        label: "生态保护和环境治理业"}, {
        value: "纺织业",
        label: "纺织业"}, {
        value: "化学纤维制造业",
        label: "化学纤维制造业"}, {
        value: "其他制造业",
        label: "其他制造业"}, {
        value: "广播、电视、电影和录音制作业",
        label: "广播、电视、电影和录音制作业"}, {
        value: "仪器仪表制造业",
        label: "仪器仪表制造业"}, {
        value: "皮革、毛皮、羽毛及其制品和制鞋业",
        label: "皮革、毛皮、羽毛及其制品和制鞋业"}, {
        value: "造纸和纸制品业",
        label: "造纸和纸制品业"}, {
        value: "印刷和记录媒介复制业",
        label: "印刷和记录媒介复制业"}, {
        value: "餐饮业",
        label: "餐饮业"}, {
        value: "公共设施管理业",
        label: "公共设施管理业"}, {
        value: "其他金融业",
        label: "其他金融业"}, {
        value: "土地管理业",
        label: "土地管理业"}, {
        value: "林业",
        label: "林业"}, {
        value: "农业",
        label: "农业"}, {
        value: "废弃资源综合利用业",
        label: "废弃资源综合利用业"}, {
        value: "畜牧业",
        label: "畜牧业"}, {
        value: "文化艺术业",
        label: "文化艺术业"}, {
        value: "建筑装饰、装修和其他建筑业",
        label: "建筑装饰、装修和其他建筑业"}, {
        value: "黑色金属矿采选业",
        label: "黑色金属矿采选业"}, {
        value: "其他采矿业",
        label: "其他采矿业"}, {
        value: "机动车、电子产品和日用产品修理业",
        label: "机动车、电子产品和日用产品修理业"}, {
        value: "家具制造业",
        label: "家具制造业"}, {
        value: "建筑安装业",
        label: "建筑安装业"}, {
        value: "其他服务业",
        label: "其他服务业"}, {
        value: "社会工作",
        label: "社会工作"}, {
        value: "渔业",
        label: "渔业"}, {
        value: "体育",
        label: "体育"}, {
        value: "居民服务业",
        label: "居民服务业"}, {
        value: "邮政业",
        label: "邮政业"}, {
        value: "金属制品、机械和设备修理业",
        label: "金属制品、机械和设备修理业"}, {
        value: "卫生",
        label: "卫生"}, {
        value: "木材加工和木、竹、藤、棕、草制品业",
        label: "木材加工和木、竹、藤、棕、草制品业"}, {
        value: "农、林、牧、渔专业及辅助性活动",
        label: "农、林、牧、渔专业及辅助性活动"}, {
        value: "非金属矿采选业",
        label: "非金属矿采选业"}, {
        value: "租赁业",
        label: "租赁业"}, {
        value: "水利管理业",
        label: "水利管理业"},


      ],
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  watch:{
    value(newValue){
      this.industry=newValue
    }
  }
}
</script>

<style scoped>

</style>