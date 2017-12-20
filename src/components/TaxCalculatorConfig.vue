<template>
  <div id="calculatorCon">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple  button_btn">
          <el-button type="danger"
                     @click="openAddca">新增字典</el-button>
          <el-button type="primary"
                     @click="openEdit">修改字典</el-button>
          <el-button type="info"
                     @click="deleteList">删除</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light button_btn">
          <el-button type="danger"
                     @click="addFormula">新增税费公式</el-button>

          <el-button type="primary"
                     @click="EditFormula">修改税费公式</el-button>
          <el-button type="info"
                     @click="deleteFormula">删除</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="calculator_row">
      <el-col :span="12">
        <el-card class="box-card card_left">
          <div slot="header"
               class="clearfix">
            <strong>字典名称</strong>
          </div>
          <div class="text item">
            <filter-tree :treeData="treeData"
                         @node-click="insertName"></filter-tree>
          </div>
        </el-card>
        <el-card class="box-card card_right">
          <div slot="header"
               class="clearfix">
            <strong>字典详情</strong>
          </div>
          <div class="text item">
            <ul>
              <li>
                <span>字典名称：</span>
                <strong>{{tableValue.dictionaryName}}</strong>
              </li>
              <li style="margin-left: 131px;">
                <span>字典状态：</span>
                <strong>{{tableValue.isHolding}}</strong>
              </li>
            </ul>
            <template>
              <el-table :data="tableValue.list"
                        border>
                <el-table-column label="字典项名称"
                                 width="225"
                                 height="30">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="字典项状态"
                                 width="202"
                                 height="30">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.isHolding=="1"?"有效":"无效" }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card card_left">
          <div slot="header"
               class="clearfix">
            <strong>公式菜单</strong>
          </div>
          <div class="text item">
            <filter-tree :treeData="treeFormula"
                         @node-click="dictionarySname"></filter-tree>
          </div>
        </el-card>
        <el-card class="box-card card_right">
          <div slot="header"
               class="clearfix">
            <strong>公式详情</strong>
          </div>
          <div class="text item">
            <ul>
              <li>
                <span>公式名称：</span>
                <strong>{{tableValueName.formulaeName}}</strong>
              </li>
              <li style="margin-left: 131px;">
                <span>公式状态：</span>
                <strong>{{tableValueName.isHolding=="1"?"有效":"无效" }}</strong>
              </li>
            </ul>
            <ul>
              <li>
                <span>税种：</span>
                <strong>{{tableValueName.taxes}}</strong>
              </li>
              <li style="margin-left: 131px;">
                <span>税率1：</span>
                <strong>{{tableValueName.taxRate}}</strong>
              </li>
              <li style="margin-left: 131px;">
                <span>税率2：</span>
                <strong>{{tableValueName.differenceTaxRate}}</strong>
              </li>
            </ul>
            <template>
              <el-table :data="tableValueName.dictionaryAndItemVO"
                        border>
                <el-table-column label="字典名称"
                                 width="206">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.dictionaryName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="字典项名称"
                                 width="140">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="字典状态"
                                 width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.isHolding=="1"?"有效":"无效" }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <grace-dialog :dialog:visible.sync="addConfig"
                  dialog:title="新增字典"
                  action="list/addDictionary"
                  dialog:is="add-tax-config"></grace-dialog>

    <grace-dialog :dialog:visible.sync="booFormula"
                  :data="tableValue"
                  dialog:title="修改字典"
                  action="list/updDictionary"
                  dialog:is="add-tax-config"></grace-dialog>

    <grace-dialog :dialog:visible.sync="fooFormula"
                  dialog:title="新增公式"
                  dialog:is="add-formula"
                  action="list/addFormula"></grace-dialog>

    <grace-dialog :dialog:visible.sync="editFormula"
                  :data="tableValueName"
                  dialog:title="修改公式"
                  action="list/updateFormula"
                  dialog:is="add-formula"></grace-dialog>

  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('list')
export default {
  data: function () {
    return {
      addConfig: false,
      booFormula: false,
      fooFormula: false,
      editFormula: false,
      title: '',
      value: '',
      defaultProps: {
        children: 'Nodes',
        label: 'name'
      }
    }
  },
  // 加载
  mounted: function () {
    this.addQueryValue()
  },
  computed: {
    ...mapGetters({
      treeData: 'treeData', // 字典tree
      tableValue: 'tableValue', // 点击tree 返回的详情
      treeFormula: 'treeFormula', // 公式的tree
      taxCategory: 'taxCategory', // 新增公式的 税种
      tableValueName: 'tableValueName' // 点击公式tree 返回的 详情
    })
  },
  methods: {
    // 打开新增的字典页面
    openAddca: function () {
      this.addConfig = true
    },
    // 打开字典的修改页面
    openEdit: function () {
      if (this.$store.state.list.nodeId) {
        this.booFormula = true
      } else {
        alert('请选中字典')
      }
    },
    // 删除字典
    deleteList: function () {
      if (this.$store.state.list.nodeId) {
        this.$confirm('是否删除此数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('list/delDictionary', this.$store.state.list.nodeId)
        })
      } else {
        alert('请选中字典')
      }
    },
    // 打开新增公式页面
    addFormula: function () {
      this.fooFormula = true
    },
    // 打开修改公式的 页面
    EditFormula: function () {
      if (this.$store.state.list.treeFormulaId) {
        this.editFormula = true
      } else {
        alert('请选中公式')
      }
    },
    // 查询字典项： 点击tree 字典 传入 当前字典id
    insertName: function (id) {
      this.$store.dispatch('list/treeNodeId', { dictionaryId: id.id })
      this.$store.dispatch('list/queryName')
        .then(res => {
          console.log(this.data)
        })
    },
    // 关闭页面
    closeAddEdit: function (val) {
      console.log(val)
      if (this.title === '新增字典') {
        this.addConfig = val
      }
      if (this.title === '新增公式') {
        this.booFormula = val
      }
    },
    // 派发查询字典 和 公式 的 数据
    addQueryValue: function () {
      this.$store.dispatch('list/queryDictionary')
      this.$store.dispatch('list/queryFormula')
      this.$store.dispatch('list/queryTaxcon')
    },
    // 点击 公式tree 查看 详情
    dictionarySname: function (id) {
      this.$store.dispatch('list/treeFormulaId', { formulaeId: id.id })
      this.$store.dispatch('list/queryFormulaParent')
    },
    // 删除公式
    deleteFormula: function () {
      console.log(this.$store.state.list.treeFormulaId)
      if (this.$store.state.list.treeFormulaId) {
        this.$confirm('是否删除此数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('list/delFormula', this.$store.state.list.treeFormulaId)
        })
      } else {
        alert('请选中公式')
      }
    }
  }
}
</script>
<style>
#calculatorCon {
  width: 1600px;
}
.el-card {
  background: white;
}
strong {
  color: #0082c4;
}
.button_btn {
  text-align: right;
}
#calculatorCon {
  margin-top: 20px;
}
.wrap_left {
  width: 798px;
}
.calculator_row {
  height: 728px;
  margin-top: 20px;
}
.wrap_left .el-col-4 {
  width: 41.66667%;
}
.wrap_left .el-col-8 {
  width: 58.33333%;
}
.el-card__header {
  background: #ddf1fb;
}
.header_size {
  color: #0082c4;
}
.el-card__body {
  background: white;
}
.card_left {
  width: 306px;
  float: left;
  height: 728px;
}
.card_right {
  width: 494px;
  height: 728px;
}
.el-dialog__wrapper .el-dialog {
  width: 576px;
  height: 500px;
}
.el-dialog__header {
  background: #ddf1fb;
}
.EditableTree {
  background: white;
}
.el-dialog__title {
  font-weight: bold;
  margin-left: -469px;
}
#addConfig .el-form {
  width: 465px;
  margin: auto;
  min-height: 354px;
}
#addConfig .el-form-item__content .el-input {
  display: inline-block;
  width: 286px;
  height: 31px;
}
#addConfig .el-radio-group {
  margin-left: -141px;
}
.text ul {
  display: inline-block;
  width: 494px;
  height: 35px;
}
.text ul li {
  float: left;
  list-style: none;
  margin-left: 40px;
}
.text ul li strong {
  font-size: 14px;
  color: black;
}
#calculatorCon .el-dialog {
  min-height: 576px;
}
#addConfig .el-table {
  width: 479px;
  height: 200px;
  margin: auto;
}
.text .el-table {
  width: 428px;
  margin: 50px auto;
}
.el-table th > .cell {
  text-align: center;
}
.has-gutter tr {
  background: red;
}
.el-table tr {
  text-align: center;
}
.el-table__header-wrapper .el-table_header {
  width: 463px;
  height: 30px;
}
.el-table .el-table__header-wrapper table tr {
  background: #0094df;
  color: white;
  text-align: center;
}
.el-table__header-wrapper {
  height: 45px;
  line-height: 1px;
}
</style>
