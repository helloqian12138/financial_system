<!-- 用户管理 -->
<template>

    
  <div>
    <el-row>
      <el-tabs type="border-card">
      <el-tab-pane label="邀请码">
    <div class="form">
        
                                                        <!-- inline="true"表单域在一行 -->
          <el-form :inline="true"  :model="formInline" class="demo-form-inline">


<!--            <el-form-item label="搜索用户名">-->
<!--                <el-input v-model="formInline.name" size="mini" placeholder="" ></el-input>-->
<!--            </el-form-item>-->

            <el-form-item style="margin-left: 10px;">
              <el-button  @click="onSubmit" >查看所有用户</el-button>
            </el-form-item>
          </el-form>


        
            <el-form :inline="true"  :model="formInline" class="demo-form-inline">


<!--            <el-form-item>-->
<!--                <el-button v-if="permissions=='管理员'" type="warning"   plain @click="onSubmit" icon="el-icon-postcard" size="mini" >点击生成邀请码</el-button>-->
<!--            </el-form-item>-->

            <el-form-item >
                <el-button type="primary" plain style="margin-right: 10px;margin-left: 10px;" size="mini" icon="el-icon-plus" @click="addInviteCode">点击添加邀请码</el-button>
            </el-form-item>
           
          </el-form>

    </div>

    <el-table v-if="permissions=='管理员'" class='table' :data="tableData" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}" 
                border
                height="100%"   
                :row-style="{height:'36px'}"
                :cell-style="{padding:'0px'}"
                header-row-class-name="active_header"
                header-cell-class-name="active_header"
                cell-class-name="content_center">
                
                <el-table-column v-for='(val,key) in tableLabel' :prop="key" :label="val" /><!--插槽里面没有东西就可以用单标签  -->

                <el-table-column
                    prop="scale"
                    label="操作">
                    <template slot-scope="scope">

                         <!-- <el-button v-if="scope.row.权限=='管理员'" v-on:click="detail(scope.row)" size="mini" type="primary">生成邀请码</el-button> -->
                         <el-button v-on:click="modify(scope.row)" size="mini" >修改</el-button>
                         <el-button v-on:click="delete(scope.row)" size="mini" >删除</el-button>

                    </template>
                </el-table-column>
              </el-table>
    <el-button style='width: 150px;' @click="queryInviteCode">邀请码管理</el-button>
    <el-dialog title="邀请码使用情况" :visible.sync="dialogVisible" width="100%">
        <el-table
            :data="inviteCodeData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="code"
              label="邀请码"
              width="200">
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="生成时间"
              width="300">
          </el-table-column>
          <el-table-column
              prop="tuser"
              label="使用者"
          width="100">
          </el-table-column>
          <el-table-column
              prop="status"
              label="是否使用"
              width="100">
          </el-table-column>
          <el-table-column
              prop="utime"
              label="使用时间"
              width="300">
          </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog title="用户列表" :visible.sync="usertDataVisible" width="100%">
      <el-table
          :data="usertData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="realname"
            label="姓名"
            width="200">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            width="200">
        </el-table-column>
        <el-table-column
            prop="telephone"
            label="电话"
            width="300">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="200">
        </el-table-column>
        <el-table-column
            prop="unit"
            label="单位"
            width="200">
        </el-table-column>
        <el-table-column
            prop="position"
            label="职位"
            width="200">
        </el-table-column>
        <el-table-column
            prop="status"
            label="是否为管理员（1为管理员）"
            width="80">
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="当前生成的邀请码" :visible.sync="inviteCodeVisible" width="100%">
      {{inviteCode}}
    </el-dialog>
    </el-tab-pane>

    <el-tab-pane label="用户活动" height="500px">
    <el-form :inline="true">

      <el-form-item >
        <el-input v-model="name"  placeholder="请输入用户名" size="mini" @keyup.enter.native="activity(name,start,end)" @submit.native.prevent></el-input>
      </el-form-item>

      <el-form-item label="开始时间" prop="开始时间">
        <el-date-picker
            v-model="start"
            type="date"
            placeholder="年/月/日"
            size="mini"
            value-format="yyyy-MM-dd[T]hh:mm:ss[.000Z]"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" prop="结束时间">
        <el-date-picker
            v-model="end"
            type="date"
            placeholder="年/月/日"
            size="mini"
            value-format="yyyy-MM-dd[T]hh:mm:ss[.000Z]"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" plain style="margin-right: 10px;margin-left: 10px;"   @click="activity(name,start,end)">查看</el-button>
      </el-form-item>
    </el-form>
<!--用户表-->
      <el-table class='table' :data="activityData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :header-cell-style="{background: 'rgba(242, 242, 242, 0.654901960784314)'}"
                border
                height="100%"
                :row-style="{height:'36px'}"
                :cell-style="{padding:'0px'}"
                header-row-class-name="active_header"
                header-cell-class-name="active_header"
                cell-class-name="content_center">

        <el-table-column v-for='(val,key) in activityLabel' :prop="key" :label="val" /><!--插槽里面没有东西就可以用单标签  -->

<!--        <el-table-column-->
<!--            prop="scale"-->
<!--            label="操作">-->
<!--          <template slot-scope="scope">-->

<!--            &lt;!&ndash; <el-button v-if="scope.row.权限=='管理员'" v-on:click="detail(scope.row)" size="mini" type="primary">生成邀请码</el-button> &ndash;&gt;-->
<!--            <el-button v-on:click="modify(scope.row)" size="mini" >修改</el-button>-->
<!--            <el-button v-on:click="delete(scope.row)" size="mini" >删除</el-button>-->

<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>

<!--      分页-->
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"

                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="activityData.length">
        </el-pagination>
      </div>



    </el-tab-pane>
        <el-tab-pane label="访问模块" height="500px">
          <el-form :inline="true">

          <el-form-item label="开始时间" prop="开始时间">
            <el-date-picker
                v-model="moduleStart"
                type="date"
                placeholder="年/月/日"
                size="mini"
                value-format="yyyy-MM-dd[T]hh:mm:ss[.000Z]"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="结束时间">
            <el-date-picker
                v-model="moduleEnd"
                type="date"
                placeholder="年/月/日"
                size="mini"
                value-format="yyyy-MM-dd[T]hh:mm:ss[.000Z]"
            >
            </el-date-picker>
          </el-form-item>
            <el-form-item >
              <el-button type="primary" plain style="margin-right: 10px;margin-left: 10px;"   @click="moduleAct(moduleStart,moduleEnd)">查看</el-button>
            </el-form-item>
          </el-form>

          <div id="module" ref="module"  style="width:100%;height:300px;"></div>
          <div id="time" ref="time"  style="width:100%;height:300px;"></div>
        </el-tab-pane>

      </el-tabs>
    </el-row>

  </div>

</template>

<script>
import http from "@/utils/request";
import * as echarts from "echarts"
import {Loading} from "element-ui";
export default {
  components:{
  },
  data () {
    return {
      moduleStart:'',
      moduleEnd:'',
      start:'',
      end:'',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      name:'',
      activityData:[],
      usertData:'',
      usertDataVisible:false,
      inviteCode:'',
      inviteCodeData:[],
      dialogVisible:false,
      inviteCodeVisible:false,
        formInline:{
            name:''
        },
        // 当前用户
        // permissions:'管理员',
        permissions:'普通用户',

      activityLabel:{
        用户名:'用户名',
        IP:'IP',
        访问模块:'访问模块',
        关键词:'关键词',
        时间:'时间',


      },

        tableLabel: {
                  用户名: '用户名',
                  姓名: '姓名',
                  电话: '电话',
                  邮箱: '邮箱',
                  单位:'单位',
                  职位:'职位',
                  权限:'权限',
                  

        },
        tableData:[
            {
                用户名: 'user1',
                权限:'管理员',
            },
            {
                用户名: 'test1',
                权限:'普通用户',
            },
            {
                用户名: 'test2',
                权限:'普通用户',
            },
            {
                用户名: 'test3',
                权限:'普通用户',
            },
            {
                用户名: 'user2',
                权限:'管理员',
            },
            {
                用户名: 'test4',
                权限:'普通用户',
            },
            {
                用户名: 'test5',
                权限:'普通用户',
            },
                ]
    }
  },
  mounted(){

  },
  watch:{
    activityData(){
      console.log(this.activityData.length)
      this.total= this.activityData.length
    }

  },
  methods:{

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },


    activity(name,start,end){
      const params = new URLSearchParams();
      params.append('username', name);
      params.append('stime',start);
      params.append('etime',end);
      // if (start!=='' && end!==''){
      //   ''
      // }
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);
      http.post('/users/user_act/',params).then((res)=>{
        this.activityData=res.data
        loadingInstance.close()
      }).finally(()=>
          loadingInstance.close()
      )
    },

    moduleAct(moduleStart,moduleEnd){
      const params = new URLSearchParams();
      params.append('stime',moduleStart)
      params.append('etime',moduleEnd)
      let options={
        text:'请稍等'
      }
      let loadingInstance = Loading.service(options);
      http.post('/users/model_act/',params).then((res)=>{
        let data=[]
        for (let i in res.data){
          let tmp={}
          tmp['name']=res.data[i]['访问模块']
          tmp['value']=res.data[i]['次数']
          data.push(tmp)
        }
        // let chartDom = document.getElementById('module');
        let myChart = echarts.init(this.$refs.module)
        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            // {
            //   name: '访问来源',
            //   type: 'pie',
            //   radius: ['50%', '70%'],
            //   avoidLabelOverlap: false,
            //   label: {
            //     show: false,
            //     position: 'center'
            //   },
            //   emphasis: {
            //     label: {
            //       show: true,
            //       fontSize: '30',
            //       fontWeight: 'bold'
            //     }
            //   },
            //   labelLine: {
            //     show: false
            //   },
            //   data: data
            // }

            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: data
            }
          ]
        };
        // console.log(option)
    myChart.setOption(option)
        console.log(myChart.getOption())

      })
      http.post('/users/time_act/',params).then((res)=>{

       let  data=[]
        let time=[]
        for (let i in res.data){
         time.push(res.data[i]['访问模块'])
          data.push(res.data[i]['访问量'])
        }
        // let chartDom = document.getElementById('time');

        let myChart = echarts.init(this.$refs.time);
        let option = {
          xAxis: {
            type: 'category',
            data: data
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: time,
              type: 'line',
              smooth: true
            }
          ]
        };
        // console.log(option)
        myChart.setOption(option);
        console.log(myChart.getOption())
      })
      loadingInstance.close()


    },

    queryInviteCode(){
      http.get('/users/invite_all/').then((res)=>{
        this.inviteCodeData=res.data
        this.dialogVisible=true
      })
    },
    addInviteCode(){
      http.get('/users/invite/').then((res)=>{

        this.inviteCode=res.data
        this.inviteCodeVisible=true
      })
    },
    onSubmit(){
      http.post('/users/all_users/').then((res)=>{
        this.usertData=res.data
        this.usertDataVisible=true
      })


    },
    modify(){},
    delete(){},
  },
}
</script>
<style lang='less' scoped>
.form1{//2、产品搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    margin:0px; 
    // height: 40px;
    padding-left: 5px;
    .el-form-item {
    margin-bottom: 5px;
}

  }
  .form{//搜索栏
    
    display:flex;
    justify-content:space-between;//左右贴边
    // margin-top:5px; 
    // height: 40px;
    padding-left: 5px;
  }

  .table{
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 5px;
    padding: 0px;
    }
//     /deep/ .el-table {
//   width: 98.5% !important;
// }
// /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
//       border-bottom: 1px solid rgba(224, 223, 223, 0.771) !important;
//       padding: 0px 0 !important;
//       min-width: 0 !important;
//     }
//     .el-table .el-table__cell {
//       padding: 20px 0; 
//       min-width: 0;
//     }
    /deep/ .active_header{//表头
      color: #333333;
      font-size: 13px;
      text-align: center !important;
      // height: 1px;
    }
    /deep/ .content_center{//表的内容
      text-align: center !important;
      font-size: 13px;
    }


    
  .grayish_btn{//浅灰色按钮
    color: #fff;//文字颜色
    background-color: #aaaaaa;//背景颜色
  }

.el-tabs--card {
  height: calc(100vh - 110px);
  /* overflow-y: auto; */
}
.el-tab-pane {
  height: calc(100vh - 110px);
  overflow-y: auto;
}

</style>
