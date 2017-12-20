<template>
  <div id="addCalculator">
    <el-form ref="ruleForm"
             :model="form"
             :rules="rules"
             :label-position="labelPosition"
             label-width="196px">
      <el-form-item label="购买家庭房屋套数"
                    prop="houseNumber">
        <general-select ref="select"
                        :value="form.houseNumber"
                        :options="test.houseNumber"
                        @select-value="house"></general-select>
      </el-form-item>

      <el-form-item label="房屋面积"
                    prop="area"
                    label-width="196px">
        <general-select ref="select"
                        :value="form.area"
                        :options="test.area"
                        @select-value="area"></general-select>
      </el-form-item>
      <el-form-item label="产权取得年限"
                    prop="years">
        <general-select ref="select"
                        :value="form.years"
                        :options="test.years"
                        @select-value="years"></general-select>
      </el-form-item>
      <el-form-item label="家庭唯一住房"
                    prop="isOnly">
        <el-radio-group v-model="form.isOnly">
          <el-radio v-model="form.isOnly"
                    label="是"></el-radio>
          <el-radio v-model="form.isOnly"
                    label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="房产来源"
                    prop="houseSource">
        <general-select ref="select"
                        :value='form.houseSource'
                        :options="test.houseSource"
                        @select-value="houseSource"></general-select>
      </el-form-item>

      <el-form-item label="原房屋购置价"
                    prop="originalCost">
        <el-input type="mon"
                  v-model.number="form.originalCost"></el-input>
        <span style="float:right">万</span>
      </el-form-item>

      <el-form-item label="现房屋总价"
                    prop="presentPrice">
        <el-input type="mon"
                  v-model.number="form.presentPrice"></el-input>
        <span style="float:right">万</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="subValue('ruleForm')">计算</el-button>
        <el-button type="info"
                   @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <div class="header_self">
          <strong class="size">合计</strong>
          <span class="price">{{value.total}}</span>
          <strong class="size">元</strong>
        </div>
      </div>
      <div class="text item">
        <el-row type="flex"
                class="row-bg"
                justify="space-between">
          <el-col :span="4">
            <div class="grid-content bg-purple">契税</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">{{value.deedTax}}
              <span>元</span>
              <em>(卖方缴纳，双方另有约定除外)</em>
            </div>
          </el-col>
          <el-col :span="4">

          </el-col>
        </el-row>
        <el-row type="flex"
                class="row-bg"
                justify="space-between">
          <el-col :span="4">
            <div class="grid-content bg-purple">增值税</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">{{value.addedValueTax}}
              <span>元</span>
              <em>(卖方缴纳，双方另有约定除外)</em>
            </div>
          </el-col>
          <el-col :span="4">

          </el-col>
        </el-row>
        <el-row type="flex"
                class="row-bg"
                justify="space-between">
          <el-col :span="4">
            <div class="grid-content bg-purple">个人所得税</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">{{value.personalIncomeTax}}
              <span>元</span>
              <em>(卖方缴纳，双方另有约定除外)</em>
            </div>
          </el-col>
          <el-col :span="4">

          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isOnly: '',
      labelPosition: 'left',
      form: {
        isOnly: '',
        originalCost: '',
        presentPrice: '',
        houseNumber: '',
        area: '',
        years: '',
        houseSource: ''
      },
      rules: {
        houseNumber: [
          { required: true, message: '请选择购买家庭房屋套数', trigger: 'change' }
        ],
        originalCost: [
          { required: true, message: '请输入原房屋购置价', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择房屋面积', trigger: 'change' }
        ],
        years: [
          { required: true, message: '请选择产权取得年限', trigger: 'change' }
        ],
        houseSource: [
          { required: true, message: '请选择房产来源', trigger: 'change' }
        ],
        isOnly: [
          { required: true, message: '请选择是否为家庭唯一住房', trigger: 'change' }
        ],
        presentPrice: [
          { required: true, message: '请输入现房屋总价', trigger: 'blur' },
          { type: 'number', message: '请输入数字' }
        ]
      }
    }
  },
  watch: {
    value: function (val) {

    }
  },
  mounted: function () {
    this.initPage()
  },
  computed: {
    ...mapState({
      test: state => state.list.listData,
      value: state => state.list.numMon
    })
  },
  methods: {
    initPage: function () {
      this.$store.dispatch('list/initPage')
    },
    // 计算器提交
    subValue: function (formValue) {
      this.$refs[formValue].validate((valid) => {
        if (valid) {
          this.$store.dispatch('list/addAllValue', this.form)
            .then(res => {
              this.$emit('dialog:close')
            })
        } else {
          alert('请输入完整')
        }
      })
    },
    // 清空table
    initTable: function () {
      this.value.deedTax = ''
      this.value.total = ''
      this.value.addedValueTax = ''
      this.value.personalIncomeTax = ''
    },
    // 点击重置清除数据
    resetForm: function (form) {
      this.form = {
        isOnly: '',
        originalCost: '',
        presentPrice: '',
        houseNumber: '',
        area: '',
        years: '',
        houseSource: ''
      }
      this.initTable()
    },
    house: function (house) {
      this.form.houseNumber = house
    },
    area: function (area) {
      this.form.area = area
    },
    years: function (years) {
      this.form.years = years
    },
    houseSource: function (houseSource) {
      this.form.houseSource = houseSource
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#addEdit {
  width: 473px;
}
.el-form {
  width: 473px;
}
.el-form-item {
  margin-top: 32px;
  margin-bottom: 54px;
}
.el-select .el-input {
  height: 40px;
  width: 273px;
}
.input_user {
  height: 31px;
}
.el-button .el-button--info {
  background: #f7f7ff;
}
.el-card {
  width: 473px;
  height: 142px;
  background: #f7f7f7;
  border: 0px;
}
.clearfix .total {
  font-size: 14px;
}
.clearfix .price {
  font-size: 20px;
  color: #d74943;
}
.el-card__header {
  padding: 11px 20px;
  margin-left: -18px;
}
.header_self {
  font-size: 12px;
}
.el-card__body {
  padding: 0px;
}
.text {
  font-size: 12px;
  height: 34px;
  line-height: 34px;
}
.el-card {
  text-align: left;
}
#addCalculator .el-form .el-input {
  width: 250px;
}
</style>
