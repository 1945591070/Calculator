<template>
  <div class="EditableTree"
       style=" border-top:none;">
    <el-input placeholder="输入关键字进行过滤"
              v-model="filterText">
    </el-input>
    <el-tree ref="tree"
             :data="treeData"
             :props="defaultProps"
             highlight-current
             node-key="id"
             accordion
             :filter-node-method="filterNode"
             @node-click="handleNodeChange">
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    treeData: Array
  },
  data: function () {
    return {
      filterText: '',
      defaultProps: {
        children: 'Nodes',
        label: 'name'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 过滤节点
    filterNode: function (value, data, no) {
      console.log('过滤', value)
      if (!value) {
        return true
      } else {
        return data.name.indexOf(value) !== -1
      }
    },
    // 树节点被点击
    handleNodeChange: function (data, node, component) {
      this.$emit('node-click', data)
      console.log('点击', data)
    }
  }
}
</script>

<style>
.EditableTree input {
  width: 267px;
  margin: 15px 20px;
  border-radius: 14px;
}
</style>
