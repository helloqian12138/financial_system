<template>
  <div>
    <h1>数据展示</h1>
    <input type="text" v-model="tableName" placeholder="请输入表名" />
    <input type="number" v-model="limit" placeholder="请输入最大查询数量" />
    <button @click="fetchData">查询</button>

    <table v-if="data.length > 0">
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>当前值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.current_value }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>没有数据</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableName: "",
      limit: 10,
      data: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/v1/data", {
          params: {
            table_name: this.tableName,
            limit: this.limit,
          },
        });
        this.data = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 8px;
  text-align: left;
}
</style>