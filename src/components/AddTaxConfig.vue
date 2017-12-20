<template>
  <div id="addConfig">
    <el-form :model="formValue"
             ref="formValue"
             :rules="rules">
      <el-form-item label="字典名称"
                    prop="dictionaryName">
        <el-input v-model="formValue.dictionaryName"></el-input>
      </el-form-item>
      <el-form-item label="字典状态"
                    prop="isHolding">
        <el-radio v-model="formValue.isHolding"
                  label="有效">有效</el-radio>
        <el-radio v-model="formValue.isHolding"
                  label="无效">无效</el-radio>
      </el-form-item>
      <el-form-item label="税种"
                    prop="taxes">
        <el-select v-model="formValue.taxes"
                   placeholder="请选择">
          <el-option v-for="item in taxCategory"
                     :key="item.taxes"
                     :label="item.taxes"
                     :value="item.taxes">
          </el-option>
        </el-select>
      </el-form-item>
      <template>
        <el-table :data="formValue.list"
                  border
                  height="230"
                  style="width: 100%">
          <el-table-column label="字典项名称"
                           width="180">
            <template slot-scope="scope">
              <!-- <el-form-item :prop="scope.row.itemName"> -->
                <el-input v-model="scope.row.itemName"></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column label="字典项状态"
                           width="120">
            <template slot-scope="scope">
              <!-- <el-form-item :prop="scope.row.isHolding" -->
                            <!-- :rules="{ required: true, message: '请至少选择字典项', trigger: 'change' }"> -->
                <el-select v-model="scope.row.isHolding">
                  <el-option v-for="item in forValue"
                             :label="item.name"
                             :value="item.name"
                             :key="item.id"></el-option>
                </el-select>
              <!-- </el-form-item> -->
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
    var test = (rule, value, callback) => {
      console.log('测试：', value)
    }
    return {
      sss: {
        value: ''
      },
      isHolding: '',
      // 新增字典的数据
      formValue: {
        dictionaryName: '',
        isHolding: '',
        taxes: '',
        list: [{
          itemName: '',
          isHolding: ''
        }]
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
      ],
      rules: {
        dictionaryName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        isHolding: [
          { required: true, message: '请选择字典的状态', trigger: 'change' }
        ],
        taxes: [
          { required: true, message: '请选择税种', trigger: 'change' }
        ],
        list: [
          { validator: test, message: '请至少选择一个字典', trigger: 'blur' }
        ]
        // list: [
        //   itemName: [{ ],
        //   isHolding: [{ required: true, message: '请至少选择字典项', trigger: 'change' }]
        // ]
      }
    }
  },
  // 给修改页面 赋值
  mounted: function () {
    if (this.data) {
      this.formValue = this.data
      this.value = this.formValue.taxes
      console.log('测试：', this.value)
      this.formValue.list.forEach(item => {
        if (item.isHolding === '1') {
          item.isHolding = '有效'
        } else {
          item.isHolding = '无效'
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      taxCategory: 'taxCategory' // 新增公式的 税种
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
      this.formValue.list.push(obj)
    },
    // 新增页面的table的 删除
    handleDelete: function (index, row) {
      this.formValue.list.splice(index, 1)
      row.splice(index, 1)
    },
    // 新增和修改的提交
    subDictionary: function (formValue) {
      this.$refs[formValue].validate((valid) => {
        if (valid) {
          console.log('新增字典的数据', this.formValue.list)
          this.$store.dispatch(this.action, this.formValue)
            .then(() => {
              this.$emit('dialog:close')
            })
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
.el-form-item {
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-table th > .cell {
  text-align: center;
}
.cell .el-select .el-input {
  width: 91px;
}
</style>

