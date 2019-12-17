import '@/styles/style.less'
import '@/styles/common.less'
import '@/styles/test/test.less'
import { getUrlQueryString } from '@/utils/util.js'

window.onload = function () {
  console.log(123456)
  console.log(getUrlQueryString('test'))
  document.getElementById('_txt').innerText = '98654'
}
