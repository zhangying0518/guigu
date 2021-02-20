import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

// Vue.filter('data-format', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
//     return moment(value).format(formatStr)
// })

Vue.filter('data-format', function (value, formatStr) {
    return format(value, formatStr || 'yyyy-MM-dd HH:mm:ss') 
})