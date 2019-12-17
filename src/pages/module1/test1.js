import '@/styles/style.less'
import '@/styles/common.less'
import { getUrlQueryString } from '@/utils/util.js'

window.onload = function () {
  console.log(getUrlQueryString('test'))
}
