<!--通用的下拉选择器组件-->
<template>
  <el-select v-model="test"
             :placeholder="placeholder"
             filterable
             @change="onChangeClick"
             :allow-create="allowCreate">
    <el-option v-for="item in options"
               :key="item.value"
               :label="item.itemName?item.itemName:item.value"
               :value="item.itemName">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      placeholder: String,
      options: Array,
      value: String,
      allowCreate: Boolean // 是否允许用户创建新条目
    },
    data: function () {
      return {
        test: ''
      }
    },
    watch: {
      value: function (val) {
        this.test = val
      }
    },
    methods: {
      onChangeClick: function (val) {
        this.$emit('select-value', this.test)
        console.log('测试：', val)
      }
    }
  }
</script>
