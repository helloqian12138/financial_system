<template>
    <dv-capsule-chart :config="config" style="width:100%;height:260px" />
</template>

<script>


export default {
props:{
    colorsChart:{
        type:Array,
        default:()=>[]
    },
    dataChart:{
        type:Array,
        default:()=>[
            {
            name: '南阳',
            value: 167
            },
            {
            name: '周口',
            value: 67
            },
            {
            name: '漯河',
            value: 123
            },
            {
            name: '郑州',
            value: 55
            },
            {
            name: '西峡',
            value: 98
            }
        ]
    }
},
data(){
  return {
    config:{
      data: this.dataChart,
      colors: this.colorsChart,
      unit: '单位',
      showValue: true
    }
  }
}

}
</script>
