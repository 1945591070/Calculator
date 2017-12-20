<template>
  <div id="journal">
    <el-tabs
             :tab-position="tabPosition"
             style="height: 200px;">
      <el-tab-pane label="税费计算器">
        <add-calculator></add-calculator>
      </el-tab-pane>
      <el-tab-pane label="税费计算器配置">
        <tax-calculator-config></tax-calculator-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabPosition: 'top',
      addCalculator: ''
    }
  }
}
</script>
<style>
.el-tabs {
  width: 1600px;
  margin: auto;
}
</style>
