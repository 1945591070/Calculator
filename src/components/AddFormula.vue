<template>
  <div id="addConfig">
    <el-form :model="formValue"
             ref="formValue"
             :rules="rules">
      <el-form-item label="公式名称"
                    prop="formulaeName">
        <el-input v-model="formValue.formulaeName"></el-input>
      </el-form-item>
      <el-form-item label="公式状态"
                    prop="isHolding">
        <el-radio v-model="formValue.isHolding"
                  label="1">有效</el-radio>
        <el-radio v-model="formValue.isHolding"
                  label="0">无效</el-radio>
      </el-form-item>
      <el-form-item label="现价税率"
                    prop="taxRate">
        <el-input v-model.number="formValue.taxRate"></el-input>
      </el-form-item>
      <el-form-item label="差价税率"
                    prop="differenceTaxRate">
        <el-input v-model.number="formValue.differenceTaxRate"></el-input>
      </el-form-item>
      <el-form-item label="税种"
                    prop="taxes">
        <el-select v-model="formValue.taxes"
                   @change="changeOnlick(formValue.taxes)"
                   placeholder="请选择">
          <el-option v-for="item in taxCategory"
                     :key="item.taxes"
                     :label="item.taxes"
                     :value="item.taxes">
          </el-option>
        </el-select>
      </el-form-item>
      <template>
        <el-table :data="formValue.dictionaryAndItemVO"
                  border
                  height="200"
                  style="width: 100%">
          <el-table-column label="字典名称"
                           width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dictionaryName"
                         placeholder="请选择"
                         @change="changeClick">
                <el-option v-for="item in dictionaryNames"
                           :key="item.dictionaryId"
                           :label="item.dictionaryName"
                           :value="item.dictionaryId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字典项名称"
                           width="180">
            <template slot-scope="scope">
              <el-select placeholder="请选择"
                         v-model="scope.row.itemName">
                <el-option v-for="item in itemNames"
                           :key="item.itemId"
                           :label="item.itemName"
                           :value="item.itemId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="handleEdit(scope.$index, scope.row)">新增</el-button>
              <el-button size="mini"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </template>
      <el-button type="primary"
                 @click="subDictionary('formValue')">提交</el-button>
      <el-button type="info"
                 @click="closeDialog">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('list')
export default {
  props: {
    action: String,
    data: Object
  },
  data: function () {
    return {
      isHolding: '',
      valueS: '',
      // 新增公式 的数据
      formValue: {
        formulaeName: '',
        isHolding: '',
        taxes: '',
        taxRate: '',
        differenceTaxRate: '',
        dictionaryAndItemVO: [{
          dictionaryId: '',
          itemId: ''
        }]
      },
      rules: {
        formulaeName: [
          { required: true, message: '请输入公式名称', trigger: 'blur' }
        ],
        isHolding: [
          { required: true, message: '请选择公式状态', trigger: 'change' }
        ],
        taxRate: [
          { required: true, message: '请输入现价税率', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ],
        differenceTaxRate: [
          { required: true, message: '请输入差价税率', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ],
        taxes: [
          { required: true, message: '请选择购买家庭房屋套数', trigger: 'blur' }
        ]
      },
      // table里面的 字典值
      forValue: [
        {
          name: '有效',
          id: 1
        },
        {
          name: '无效',
          id: 0
        }
      ]
    }
  },
  // 给修改页面赋值
  mounted: function () {
    if (this.data) {
      this.formValue = this.data
    }
    this.changeOnlick()
  },
  computed: {
    ...mapGetters({
      taxCategory: 'taxCategory', // 新增公式的 税种
      dictionaryNames: 'dictionaryNames', // 点击税种 返回的 字典名称
      itemNames: 'itemNames' // 字典项目的 集合
    })
  },
  // 监听formValue的值
  watch: {
    data: function (val) {
      this.formValue = this.data
    }
  },
  methods: {
    // 关闭页面
    closeDialog: function () {
      if (this.formValue) {
        this.$emit('dialog:close')
      } else {
        this.$emit('dialog:hide')
      }
    },
    // 新增页面的table 的 option
    handleEdit (index, row) {
      var obj = {
        itemName: '',
        isHolding: ''
      }
      this.formValue.dictionaryAndItemVO.push(obj)
    },
    // 新增页面的table的 删除
    handleDelete: function (index, row) {
      this.formValue.dictionaryAndItemVO.splice(index, 1)
      row.splice(index, 1)
    },
    // 新增 和 修改的提交
    subDictionary: function (formValue) {
      this.$refs[formValue].validate((valid) => {
        if (valid) {
          console.log('新增', this.formValue)
          this.$store.dispatch(this.action, this.formValue)
            .then(() => {
              this.$emit('dialog:close')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 改变的 税种的值的事件
    changeOnlick: function (value) {
      console.log('税种', { tax: value })
      this.$store.dispatch('list/taxName', { tax: value })
      this.$store.dispatch('list/returnDictionary')
        .then(res => {
        })
    },
    // 改变字典名称的 值 的事件
    changeClick: function (value) {
      console.log('字典项id', { dictionaryId: value })
      this.$store.dispatch('list/dictionaryId', { dictionaryId: value })
      this.$store.dispatch('list/returnDictionarySon')
    }
  }
}
</script>
<style>
.el-form {
  width: 600px;
  height: 670px;
}
.el-table {
  width: 100%;
}
.el-form-item {
  margin-top: -5px;
  margin-bottom: 15px;
}
.el-table th > .cell {
  text-align: center;
}
.cell .el-select .el-input {
  width: 91px;
}
</style>

