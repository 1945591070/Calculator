import axios from 'axios'
export default {
  // 计算器 4个 字典项的值
  journalList () {
    return axios.get('http://192.168.0.61:8082/calculator/load')
  },
  // 新增 计算器
  addCalculator (model) {
    return axios.post('http://192.168.0.61:8082/calculator/calculation', model)
  },
  // 新增字典
  saveDictionary (model) {
    return axios.post('http://192.168.0.61:8082/modify/add_dictionary', model)
  },
  // 查询字典tree
  quDictionary () {
    return axios.get('http://192.168.0.61:8082/calculator/find_all_dictionary')
  },
  // 根据dictionaryId 查询字典项
  querySon (dictionaryId) {
    return axios.post('http://192.168.0.61:8082/calculator/load_items', dictionaryId)
  },
  // 修改字典
  updateDictionary (model) {
    return axios.post('http://192.168.0.61:8082/modify/update_dictionary', model)
  },
  // 删除 字典
  deleteDictionary (dictionaryId) {
    return axios.post('http://192.168.0.61:8082/modify/del_dictionary', dictionaryId)
  },
  // 新增公式页面 加载 下拉框数据
  loadDictionary () {
    return axios.post('http://192.168.0.61:8082/calculator/load_dictionary')
  },
  // 查询公式tree
  queruFormula () {
    return axios.get('http://192.168.0.61:8082/formulae_lookup/find_all_formulae')
  },
  // 新增公式页面 加载税种字典项
  queryTax () {
    return axios.get('http://192.168.0.61:8082/calculator/add_formulae_load')
  },
  // 获取税种的 value 传参（value）给 返回字典名称
  obtainDictionaryName (taxName) {
    return axios.post('http://192.168.0.61:8082/calculator/load_dictionary', taxName)
  },
  // 点击字典名称 加载字典项名称
  obtainDictionarySon (dictionaryId) {
    return axios.post('http://192.168.0.61:8082/calculator/load_item', dictionaryId)
  },
  // 新增 公式
  addFormulae (model) {
    return axios.post('http://192.168.0.61:8082/calculator/add_formulae', model)
  },
  // 点击 tree 传公式id 返回字典名称
  queruFormulaSon (formulaeId) {
    return axios.post('http://192.168.0.61:8082/formulae_lookup/find_formulae', formulaeId)
  },
  // 修改 税费公式
  editFormulaSon (formulaeModel) {
    return axios.post('http://192.168.0.61:8082//calculator/update_formulae', formulaeModel)
  },
  // 删除公式
  deleteFormulaSon (treeFormulaId) {
    return axios.post('http://192.168.0.61:8082/calculator/del_formulae', treeFormulaId)
  },
   // 获取税种的 value 传参（value）给 返回字典名称
  obtainDicyName (treeName) {
    return axios.post('http://192.168.0.61:8082/calculator/load_dictionary', treeName)
  }
}
