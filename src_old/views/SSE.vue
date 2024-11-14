<template>
  <div>
    <h1>SSE数据：</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.data }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SSE.vue",
  data(){
    return{
      message:''

    }
  },
  methods:{
      longConnect(){
        const eventSource=new EventSource('http://61.240.140.173:9999/sse?message="fine"')
        eventSource.onmessage=function (event){
          const result= event.data;
          console.log('receive:',result)
        }
        eventSource.addEventListener('message', (event) => {
          this.messages.push({ id: Date.now(), data: event.data });
          console.log( event.data)
        });
      }
  },
  mounted() {
    this.longConnect()
  }
}
</script>

<style scoped>

</style>