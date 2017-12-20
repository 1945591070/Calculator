import request from '@/api/api'
import * as type from '../varCon'
// 放置的数据源
const state = {
  // 计算器
  listData: {},
  // 计算器 返回值
  numMon: {},
  // 字典tree
  treeData: [],
  // 公式tree
  treeFormula: [],
  // 点击字典名称 传参数id 用来接收返回数据
  tableValue: {},
  // 树id
  nodeId: '',
  // 新增公式的 税种字典项
  taxCategory: [],
  // 传 税种 值 返回字典名称
  dictionaryNames: [],
  // 税种 name
  taxName: '',
  // 字典项目的id
  dictionaryId: '',
  // 字典项的 集合
  itemNames: [],
  // 新增公式
  formulaForm: {},
  // 公式 id
  treeFormulaId: '',
  // 点击公式名称 传参数id 用来接收返回数据
  tableValueName: {}
}
// 定义一个变量名 接收它的值
const getters = {
  treeData: state => state.treeData, // 字典tree
  tableValue: state => state.tableValue, // 点击字典tree 返回详情数据
  treeFormula: state => state.treeFormula, // 公式 tree
  taxCategory: state => state.taxCategory, // 税种
  dictionaryNames: state => state.dictionaryNames, // 传税种后 返回字典名称
  itemNames: state => state.itemNames, // 字典项的 集合
  tableValueName: state => state.tableValueName // 点击tree 返回字典详情
}

// 修改状态
const mutations = {
  [type.LIST_DATA] (state, dataModel) {
    state.listData = dataModel
  },
  // 计算器返回值
  [type.LIST_TABLE] (state, dataModel) {
    state.numMon = dataModel
  },
  // 查询 字典
  [type.TREE_DATA] (state, dataModel) {
    state.treeData = dataModel
  },
  // 查询公式
  [type.TREE_FORMULA] (state, dataModel) {
    state.treeFormula = dataModel
  },
  // 树节点ID 这个是传给后台的id 类型为Object
  [type.TREE_ID] (state, nodeId) {
    state.nodeId = nodeId
  },
  // 获取表格数据
  [type.TABLE_VALUE] (state, dataModel) {
    state.tableValue = dataModel
  },
  // 新增公式的 税种 字典项
  [type.TAX_MODEL] (state, dataModel) {
    state.taxCategory = dataModel
  },
  // 税种的 name
  [type.TAX_NAME] (state, taxName) {
    state.taxName = taxName
  },
  // 获取 返回的 字典名称
  [type.TAX_VALUES] (state, dictionaryNames) {
    state.dictionaryNames = dictionaryNames
  },
  // 字典项目的 id
  [type.DICTIONARY_ID] (state, dictionaryId) {
    state.dictionaryId = dictionaryId
  },
  // 字典项的 集合
  [type.ITEM_NAME] (state, itemNames) {
    state.itemNames = itemNames
  },
  // tree公式 的id
  [type.TREE_FORMULA_ID] (state, treeFormulaId) {
    state.treeFormulaId = treeFormulaId
  },
  // 点击公式tree返回字典的详情
  [type.FORMULA_NAMES] (state, tableValueName) {
    state.tableValueName = tableValueName
  }
}

const actions = {
  // 计算器 查询 table
  initPage: function ({ commit }) {
    request.journalList()
      .then(res => {
        commit(type.LIST_DATA, res.data.result)
      })
  },
  // 新增数据
  addAllValue: function ({ dispatch, commit }, addMoValue) {
    request.addCalculator(addMoValue)
      .then(res => {
        commit(type.LIST_TABLE, res.data.result)
        return dispatch('initPage')
      })
  },
  // 新增字典
  addDictionary: function ({ dispatch, commit }, addMoValue) {
    request.saveDictionary(addMoValue)
      .then(res => {
        console.log(res.data)
        return dispatch('queryDictionary')
      })
  },
  // 查询 tree字典
  queryDictionary: function ({ commit }) {
    request.quDictionary()
      .then(res => {
        commit(type.TREE_DATA, res.data.result)
      })
  },
  // 提交树节点ID
  treeNodeId: function ({ commit }, id) {
    commit(type.TREE_ID, id)
  },
  // 查询 字典项 传字典id
  queryName: function ({ commit, state }) {
    console.log('rwe', state.nodeId)
    request.querySon(state.nodeId)
      .then(res => {
        commit(type.TABLE_VALUE, res.data.result)
        console.log('3333', res.data.result)
      })
  },
  // 修改字典
  updDictionary: function ({ dispatch, commit }, addMoValue) {
    request.updateDictionary(addMoValue)
      .then(res => {
        return dispatch('queryDictionary')
      })
  },
  // 删除字典
  delDictionary: function ({ dispatch, commit, state }, data) {
    console.log('删除1', state.nodeId)
    request.deleteDictionary(state.nodeId)
      .then(res => {
        return dispatch('queryDictionary')
      })
  },
  // 查询公式tree
  queryFormula: function ({ commit }) {
    request.queruFormula()
      .then(res => {
        commit(type.TREE_FORMULA, res.data.result)
      })
  },
  // 新增公式的 税种的 字典
  queryTaxcon: function ({ commit }) {
    request.queryTax()
      .then(res => {
        commit(type.TAX_MODEL, res.data.result)
      })
  },
  // 提交税种 name
  taxName: function ({ commit }, taxName) {
    commit(type.TAX_NAME, taxName)
  },
  // 传 税种的值 返回字典名称
  returnDictionary: function ({ commit, state }) {
    console.log('税种名字', state.taxName)
    request.obtainDictionaryName(state.taxName)
      .then(res => {
        commit(type.TAX_VALUES, res.data.result)
      })
  },
  // 传税种的name 返回字典名称
  returnDictionaryName: function ({ commit, state }) {
    console.log('税种名字', state.treeName)
    request.obtainDicyName(state.treeName)
      .then(res => {
        commit(type.TREE_NAME, res.data.result)
        console.log('返回', res.data)
      })
  },
  // 提交 字典项目的 id
  dictionaryId: function ({ commit }, dictionaryId) {
    commit(type.DICTIONARY_ID, dictionaryId)
  },
  // 提交id 返回字典项的 名称的 集合
  returnDictionarySon: function ({ commit, state }) {
    console.log(state.dictionaryId)
    request.obtainDictionarySon(state.dictionaryId)
      .then(res => {
        commit(type.ITEM_NAME, res.data.result)
      })
  },
  // 新增 公式
  addFormula: function ({ dispatch, commit }, addMoValue) {
    console.log('新增', addMoValue)
    request.addFormulae(addMoValue)
      .then(res => {
        return dispatch('queryFormula')
      })
  },
  // 提交公式树节点ID
  treeFormulaId: function ({ commit }, treeFormulaId) {
    commit(type.TREE_FORMULA_ID, treeFormulaId)
  },
  // 传公式的id返回字典名称
  queryFormulaParent: function ({ commit, state }) {
    console.log('接口', state.treeFormulaId)
    request.queruFormulaSon(state.treeFormulaId)
      .then(res => {
        commit(type.FORMULA_NAMES, res.data.result)
      })
  },
  // 修改公式
  updateFormula: function ({ dispatch, commit }, addMoValue) {
    console.log('修改公式', addMoValue)
    request.editFormulaSon(addMoValue)
      .then(res => {
        return dispatch('queryFormula')
      })
  },
  // 删除公式
  delFormula: function ({ dispatch, commit, state }, data) {
    request.deleteFormulaSon(state.treeFormulaId)
      .then(res => {
        return dispatch('queryFormula')
      })
  }
}
// 导出
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
