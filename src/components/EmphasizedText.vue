<template>
  <div class="emphasized-text">
    <el-tag type="success" effect="dark">{{ emphasizedText }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'EmphasizedText',
  props: {
    emphasizedText: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.emphasized-text {
  font-size: 1.2em;
  margin: 10px 0;
}

.el-tag {
  background-color: #409eff !important;
  color: #fff !important;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>