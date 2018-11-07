/**
 * Created by jiachenpan on 16/11/18.
 */

const shouldCalcProperty = ['_index|1|单', 'nowPayFee', 'finishNowPayFee', 'notNowPayFee', 'arrivepayFee', 'finishArrivepayFee', 'notArrivepayFee', 'receiptpayFee', 'finishReceiptpayFee', 'notReceiptpayFee', 'monthpayFee', 'finishMonthpayFee', 'notMonthpayFee', 'changeFee', 'notChangeFee', 'finishChangeFee', 'inputChangeFee', 'inputMonthpayFee', 'inputNowPayFee', 'inputArrivepayFee', 'inputReceiptpayFee']
/**
 * 根据列表数据计算合计值
 * @param {*} param 列表数据
 * 计算的语法
 * 属性名 单位为元
 * 属性名|单位
 * _index|索引（|单位）
 */
export function getSummaries(param, propsArr) {
  const { columns, data } = param
  const sums = []
  // 获取需要计算的属性值列表
  propsArr = propsArr || shouldCalcProperty

  // console.log(columns, data)
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    let prop = ''

    let unit = '元'
    const find = propsArr.filter(el => {
      // 完全等于属性名
      if (el === column.property || el === column.prop) {
        prop = el
        return true
      }

      const propArr = el.split('|')
      if (propArr.length > 1) {
        // 前缀等于属性名
        if (propArr[0] === column.property || propArr[0] === column.prop) {
          prop = column.property || column.prop
          unit = propArr[1] || ''
          return true
        }
        // 索引位置相等
        if (propArr[0] === '_index' && parseInt(propArr[1], 10) === index) {
          prop = '_index'
          unit = propArr[2] || ''
          return true
        }
      } else {
        // 没有匹配
        return false
      }
    })

    // if (!values.every(value => isNaN(value))) {
    if (find.length) {
      if (prop === '_index') {
        sums[index] = data.length + unit
      } else {
        const values = data.map(item => Number(item[prop]))
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            // return prev + curr
            return tmsMath._add(prev, curr)
          } else {
            return prev
          }
        }, 0)
        sums[index] += ' ' + unit
      }
    } else {
      sums[index] = ' - '
    }
  })
  return sums
}

// export function parseTime(time, cFormat) {
//   if (arguments.length === 0) {
//     return null
//   }
//   if (!time) {
//     return ''
//   }
//   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
//   let date
//   if (typeof time === 'object') {
//     date = time
//   } else {
//     // 判断时毫秒还是字符串
//     time = typeof time === 'number' ? time : ('' + time).trim()
//     // 如果是秒级单位则转成毫秒
//     if (/^\d{10}$/.test(time)) {
//       time = parseInt(time) * 1000
//     } else if (/(\d){4}-(\d){2}-(\d){2}\s+(\d){2}:(\d){2}:(\d){2}/.test(time)) {
//       // IE需要标准格式
//       // time = time.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6Z')
//       time = time.replace(/-/g, '/')
//     }

//     date = new Date(time)
//   }
//   // 如果不能正确转换，则返回原有的数据
//   if (date.toString().indexOf('Invalid') !== -1) {
//     return time
//   }
//   const formatObj = {
//     y: date.getFullYear(),
//     m: date.getMonth() + 1,
//     d: date.getDate(),
//     h: date.getHours(),
//     i: date.getMinutes(),
//     s: date.getSeconds(),
//     a: date.getDay()
//   }
//   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
//     let value = formatObj[key]
//     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
//     if (result.length > 0 && value < 10) {
//       value = '0' + value
//     }
//     return value || 0
//   })
//   return time_str
// }
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    // 判断时毫秒还是字符串
    time = typeof time === 'number' ? time : ('' + time).trim()
    // 如果是秒级单位则转成毫秒
    if (/^\d{10}$/.test(time)) {
      time = parseInt(time) * 1000
    } else if (/(\d){4}-(\d){2}-(\d){2}\s+(\d){2}:(\d){2}:(\d){2}/.test(time)) {
      // IE需要标准格式
      // time = time.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6Z')
      time = time.replace(/-/g, '/')
    }

    date = new Date(time)
  }
  // 如果不能正确转换，则返回原有的数据
  if (date.toString().indexOf('Invalid') !== -1) {
    return time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 获取链接参数对象
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function uniqArray(array) {
  return Array.from(new Set(array))
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function objectMerge2() {
  var options
  var name
  var src
  var copy
  var copyIsArray
  var clone
  var target = arguments[ 0 ] || {}
  var i = 1
  var	length = arguments.length
  var	deep = true
  var obj = {}

	// 是否深层拷贝可以通过第一个参数控制
  if (typeof target === 'boolean') {
    deep = target

		// 往前移，去获取要合并的对象信息
    target = arguments[ i ] || {}
    i++
  }

	// 当合并对象为其它类型的值时，则忽略
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

	// 当只传了一个参数过来时
  if (i === length) {
    // 当仅传一个参数时
    target = Array.isArray(target) ? [] : {}
    i--
  }

  for (; i < length; i++) {
		// 合并对象必须为非null或者undefined值
    if ((options = arguments[ i ]) != null) {
			// Extend the base object
      for (name in options) {
        src = target[ name ]
        copy = options[ name ]

        // 避免循环引用的copy情况
        if (target === copy) {
          continue
        }

          // 当为数组或者对象时处理深层拷贝
        if (deep && copy && (obj.toString.call(copy) === '[object Object]' ||
              (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && obj.toString.call(src) ? src : {}
          }

                // 不要修改原有的数据
          target[ name ] = objectMerge2(deep, clone, copy)

            // undefined值不用传递过去
        } else if (copy !== undefined) {
          target[ name ] = copy
        }
      }
    }
  }

	// Return the modified object
  return target
}

export function objectMerge3() {
  let i = 1,
    target = arguments[0] || {},
    deep = true, // 默认为深层拷贝
    length = arguments.length,
    name, options, src, copy,
    copyIsArray, clone

  // 如果第一个参数的数据类型是Boolean类型
  // target往后取第二个参数
  if (typeof target === 'boolean') {
    deep = target
    // 使用||运算符，排除隐式强制类型转换为false的数据类型
    // 如'', 0, undefined, null, false等
    // 如果target为以上的值，则设置target = {}
    target = arguments[1] || {}
    i++
  }

  // 如果target不是一个对象或数组或函数
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

  // 如果arguments.length === 1 或
  // typeof arguments[0] === 'boolean',
  // 且存在arguments[1]，则直接返回target对象
  if (i === length) {
    return target
  }

  // 循环每个源对象
  for (; i < length; i++) {
    // 如果传入的源对象是null或undefined
    // 则循环下一个源对象
    if (typeof (options = arguments[i]) != null) {
      // 遍历所有[[emuerable]] === true的源对象
      // 包括Object, Array, String
      // 如果遇到源对象的数据类型为Boolean, Number
      // for in循环会被跳过，不执行for in循环
      for (name in options) {
          // src用于判断target对象是否存在name属性
        src = target[name]
        // copy用于复制
        copy = options[name]
        // 判断copy是否是数组
        copyIsArray = Array.isArray(copy)
        if (deep && copy && (typeof copy === 'object' || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false
            // 如果目标对象存在name属性且是一个数组
            // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
            clone = src && Array.isArray(src) ? src : []
          } else {
            // 如果目标对象存在name属性且是一个对象
            // 则使用目标对象的name属性，否则重新创建一个对象，用于复制
            clone = src && typeof src === 'object' ? src : {}
          }
          // 深复制，所以递归调用copyObject函数
          // 返回值为target对象，即clone对象
          // copy是一个源对象
          target[name] = objectMerge3(deep, clone, copy)
        } else if (copy !== undefined) {
          // 浅复制，直接复制到target对象上
          target[name] = copy
        }
      }
    }
  }
  // 返回目标对象
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions4 = {
  currentMonth(dateobj) {
    const end = dateobj || new Date()
    const start = new Date(end.getFullYear(), end.getMonth(), 1)
    return [start, end]
  },
  currentAllMonth(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), 1)
    _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastMonth(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth() - 1, 1)
    _end = new Date(_end.getFullYear(), _end.getMonth(), 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastDay(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    _end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())
    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  today(dateobj) {
    const _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  yesterDay(dateobj) {
    const _end = dateobj || new Date()
    const start1 = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const start2 = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())
    return [start1, start2]
  },
  beforeDady(dateobj) {
    const _end = dateobj || new Date()
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 2)
    return [start, end]
  },
  currentWeek(dateobj) {
    const _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay())
    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastWeek(dateobj) {
    const _end = dateobj || new Date()
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay())
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay() - 7)
    return [start, end]
  },
  currentAllWeek(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay())
    _end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay() + 7)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  currentYear(dateobj) {
    const _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  currentAllYear(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), 0, 1)
    _end = new Date(_end.getFullYear() + 1, 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastYear(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear() - 1, 0, 1)
    _end = new Date(_end.getFullYear(), 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  }
}

export const pickerOptions3 = [{
  text: '一天',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '半年',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一年',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
    picker.$emit('pick', [start, end])
  }
}]

export const pickerOptions2 = [{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 00:00:00')
    picker.$emit('pick', [start, end])
  }
}, {
  text: '昨天',
  onClick(picker) {
    const day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    const end = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 23:59:59')
    const start = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 00:00:00')
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '本月',
  onClick(picker) {
    let _end = new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), 1)
    _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1)

    const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '上个月',
  onClick(picker) {
    let day = new Date()
    day = new Date(day.getFullYear(), day.getMonth(), 1)
    const start = new Date(day.getFullYear(), day.getMonth() - 1, 1)
    const end = new Date(day.getFullYear(), day.getMonth() - 1, (day.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
    console.log(picker)
  }
}]

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/** ***
 *
 * DOM相关操作
 *
 */
// ===========事件处理===========
/**
 * 只能输入数字
 * @param {*} event 事件对象
 */
export function keepNumber(event) {
  keepNumberAndPoint(event, 0)
}
export function keepNumberAndPoint(event, pointNum = 2) {
  var hasPoint = !!pointNum
  // enter ctrl+c ctrl+v ctrl+a ctrl+x 应该仍然可以使用
  // 左右、删除、tab键
  if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && hasPoint) && !(event.keyCode === 13) &&
    !((event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 65 || event.keyCode === 88) && event.ctrlKey && !event.altKey && !event.shiftKey)
  ) {
    // 数字 小键盘数字
    if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  var el = event.target
  // 如果第一位为小数点，则补0
  el.value = hasPoint ? el.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2') : el.value.replace(/\D/g, '').replace(/\./g, '')
}
// element-closest | CC0-1.0 | github.com/jonathantneal/closest
/**
 * 判断dom元素是否匹配某个选择器
 * @param {dom元素} element
 * @param {选择器} selector
 */
export function matches(element, selector) {
  var elements = (element.document || element.ownerDocument).querySelectorAll(selector)
  var index = 0
  while (elements[index] && elements[index] !== element) {
    ++index
  }
  return Boolean(elements[index])
}
/**
 * 获取指定元素最近的匹配选择器的元素
 * @param {dom元素} element
 * @param {选择器} selector
 */
export function closest(element, selector) {
  while (element && element.nodeType === 1) {
    if (matches(element, selector)) {
      return element
    }

    element = element.parentNode
  }

  return null
}
/**
 * 用隐藏iframe的方式下载文件
 * @param {*} url 要导出的链接
 */
export function exportWithIframe(url) {
  let ifr = document.getElementById('downloadiframe')
  if (!ifr) {
    ifr = document.createElement('iframe')
    ifr.id = 'downloadiframe'
    document.body.appendChild(ifr)
  }
  ifr.src = url
}

// 计算总数
// 只计算小数点后两位
export function getTotal() {
  const args = Array.from(arguments)
  return tmsMath._calc('_add', args).result()
  /* let total = 0
  // 先处理成俩位
  // 然后乘以10000
  // 再计算
  // 最后再除以10000返回
  args.map(el => {
    // 保留俩位小数
    el = el || 0
    el = el.toString().replace(/([^.]*)(\.?)(\d)?(\d)?(.*)/, '$1$2$3$4')
    el = ((parseFloat(el, 10) || 0) * 10000).toString().replace('\..*$', '')
    total += parseInt(el, 10)
  })
  console.log('total args:', args, total, 'final:', (total / 10000))
  return (total / 10000) */
}

/**
 * 加载js
 * 返回promise对象
 */
export function loadJs(src, callback) {
  return new Promise((resolve, reject) => {
    var doc = document
    var script = doc.createElement('script')
    var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement
    script.async = 'async'

    script.onload = script.onreadystatechange = function() {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      // Handle memory leak in IE
        script.onload = script.onreadystatechange = null

      // Remove the script
        if (head && script.parentNode) {
          head.removeChild(script)
        }

      // Dereference the script
        script = undefined

      // Callback if not abort
        if (callback) {
          callback()
        }
        resolve()
      }
    }

    script.onerror = function(err) {
      reject('加载失败:' + JSON.stringify(err))
    }

    script.src = src
    head.insertBefore(script, head.firstChild)
  })
}

// 数学计算
export const tmsMath = {
  _result: 0,
  _isCalc: false,
  _add(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (this._mul(a, e) + this._mul(b, e)) / e
  },
  _sub(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (this._mul(a, e) - this._mul(b, e)) / e
  },
  _mul(a, b) {
    // console.log(a, b)
    var c = 0,
      d = a.toString(),
      e = b.toString()

    try {
      c += d.split('.')[1].length
    } catch (f) {}
    try {
      c += e.split('.')[1].length
    } catch (f) {}
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
  },
  _div(a, b) {
    var c, d, e = 0,
      f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {}
    return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), this._mul(c / d, Math.pow(10, f - e))
  },
  _calc(type, arg) {
    const len = arg.length
    var i = 0
    if (!this._isCalc) {
      this._result = 0
    }

    // 如果第一个是除法或者减法计算，则将第一个参数当做除数/减数
    if ((type === '_div' || type === '_sub') && !this._isCalc) {
      this._result = arg[0]
      i = 1
    }

    this._isCalc = true

    let total = this._result

    for (; i < len; i++) {
      // console.log('before calc:' + type, total, arg[i])
      // 当为非数值对象时，则将其转为0
      total = this[type](total, Number(arg[i]) || 0)
      // console.log('calc result:' + type, total)
    }

    this._result = total
    return this
  },
  clear() {
    this._result = 0
    this._isCalc = false
    return this
  },
  result(num = 2) {
    const res = parseFloat(this._result, 10).toFixed(num) || 0
    this._result = 0
    this._isCalc = false
    return parseFloat(res, 10)
  },
  add() {
    this._calc('_add', arguments)
    return this
  },
  sub() {
    this._calc('_sub', arguments)
    return this
  },
  mul() {
    this._calc('_mul', arguments)
    return this
  },
  div() {
    this._calc('_div', arguments)
    return this
  }
}
/**
 * json 数组去重 合计fee
 * @param  {[type]} array [description]
 * @param  {[type]} key   [description]
 */
export const uniqueArray = (array, key) => {
  const result = [array[0]]
  for (let i = 1; i < array.length; i++) {
    const item = array[i]
    let repeat = false
    for (let j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

export const geoCoordMap = {
    "海门":[121.15,31.89],
    "鄂尔多斯":[109.781327,39.608266],
    "招远":[120.38,37.35],
    "舟山":[122.207216,29.985295],
    "齐齐哈尔":[123.97,47.33],
    "盐城":[120.13,33.38],
    "赤峰":[118.87,42.28],
    "青岛":[120.33,36.07],
    "乳山":[121.52,36.89],
    "金昌":[102.188043,38.520089],
    "泉州":[118.58,24.93],
    "莱西":[120.53,36.86],
    "日照":[119.46,35.42],
    "胶南":[119.97,35.88],
    "南通":[121.05,32.08],
    "拉萨":[91.11,29.97],
    "云浮":[112.02,22.93],
    "梅州":[116.1,24.55],
    "文登":[122.05,37.2],
    "上海":[121.48,31.22],
    "攀枝花":[101.718637,26.582347],
    "威海":[122.1,37.5],
    "承德":[117.93,40.97],
    "厦门":[118.1,24.46],
    "汕尾":[115.375279,22.786211],
    "潮州":[116.63,23.68],
    "丹东":[124.37,40.13],
    "太仓":[121.1,31.45],
    "曲靖":[103.79,25.51],
    "烟台":[121.39,37.52],
    "福州":[119.3,26.08],
    "瓦房店":[121.979603,39.627114],
    "即墨":[120.45,36.38],
    "抚顺":[123.97,41.97],
    "玉溪":[102.52,24.35],
    "张家口":[114.87,40.82],
    "阳泉":[113.57,37.85],
    "莱州":[119.942327,37.177017],
    "湖州":[120.1,30.86],
    "汕头":[116.69,23.39],
    "昆山":[120.95,31.39],
    "宁波":[121.56,29.86],
    "湛江":[110.359377,21.270708],
    "揭阳":[116.35,23.55],
    "荣成":[122.41,37.16],
    "连云港":[119.16,34.59],
    "葫芦岛":[120.836932,40.711052],
    "常熟":[120.74,31.64],
    "东莞":[113.75,23.04],
    "河源":[114.68,23.73],
    "淮安":[119.15,33.5],
    "泰州":[119.9,32.49],
    "南宁":[108.33,22.84],
    "营口":[122.18,40.65],
    "惠州":[114.4,23.09],
    "江阴":[120.26,31.91],
    "蓬莱":[120.75,37.8],
    "韶关":[113.62,24.84],
    "嘉峪关":[98.289152,39.77313],
    "广州":[113.23,23.16],
    "延安":[109.47,36.6],
    "太原":[112.53,37.87],
    "清远":[113.01,23.7],
    "中山":[113.38,22.52],
    "昆明":[102.73,25.04],
    "寿光":[118.73,36.86],
    "盘锦":[122.070714,41.119997],
    "长治":[113.08,36.18],
    "深圳":[114.07,22.62],
    "珠海":[113.52,22.3],
    "宿迁":[118.3,33.96],
    "咸阳":[108.72,34.36],
    "铜川":[109.11,35.09],
    "平度":[119.97,36.77],
    "佛山":[113.11,23.05],
    "海口":[110.35,20.02],
    "江门":[113.06,22.61],
    "章丘":[117.53,36.72],
    "肇庆":[112.44,23.05],
    "大连":[121.62,38.92],
    "临汾":[111.5,36.08],
    "吴江":[120.63,31.16],
    "石嘴山":[106.39,39.04],
    "沈阳":[123.38,41.8],
    "苏州":[120.62,31.32],
    "茂名":[110.88,21.68],
    "嘉兴":[120.76,30.77],
    "长春":[125.35,43.88],
    "胶州":[120.03336,36.264622],
    "银川":[106.27,38.47],
    "张家港":[120.555821,31.875428],
    "三门峡":[111.19,34.76],
    "锦州":[121.15,41.13],
    "南昌":[115.89,28.68],
    "柳州":[109.4,24.33],
    "三亚":[109.511909,18.252847],
    "自贡":[104.778442,29.33903],
    "吉林":[126.57,43.87],
    "阳江":[111.95,21.85],
    "泸州":[105.39,28.91],
    "西宁":[101.74,36.56],
    "宜宾":[104.56,29.77],
    "呼和浩特":[111.65,40.82],
    "成都":[104.06,30.67],
    "大同":[113.3,40.12],
    "镇江":[119.44,32.2],
    "桂林":[110.28,25.29],
    "张家界":[110.479191,29.117096],
    "宜兴":[119.82,31.36],
    "北海":[109.12,21.49],
    "西安":[108.95,34.27],
    "金坛":[119.56,31.74],
    "东营":[118.49,37.46],
    "牡丹江":[129.58,44.6],
    "遵义":[106.9,27.7],
    "绍兴":[120.58,30.01],
    "扬州":[119.42,32.39],
    "常州":[119.95,31.79],
    "潍坊":[119.1,36.62],
    "重庆":[106.54,29.59],
    "台州":[121.420757,28.656386],
    "南京":[118.78,32.04],
    "滨州":[118.03,37.36],
    "贵阳":[106.71,26.57],
    "无锡":[120.29,31.59],
    "本溪":[123.73,41.3],
    "克拉玛依":[84.77,45.59],
    "渭南":[109.5,34.52],
    "马鞍山":[118.48,31.56],
    "宝鸡":[107.15,34.38],
    "焦作":[113.21,35.24],
    "句容":[119.16,31.95],
    "北京":[116.46,39.92],
    "徐州":[117.2,34.26],
    "衡水":[115.72,37.72],
    "包头":[110,40.58],
    "绵阳":[104.73,31.48],
    "乌鲁木齐":[87.68,43.77],
    "枣庄":[117.57,34.86],
    "杭州":[120.19,30.26],
    "淄博":[118.05,36.78],
    "鞍山":[122.85,41.12],
    "溧阳":[119.48,31.43],
    "库尔勒":[86.06,41.68],
    "安阳":[114.35,36.1],
    "开封":[114.35,34.79],
    "济南":[117,36.65],
    "德阳":[104.37,31.13],
    "温州":[120.65,28.01],
    "九江":[115.97,29.71],
    "邯郸":[114.47,36.6],
    "临安":[119.72,30.23],
    "兰州":[103.73,36.03],
    "沧州":[116.83,38.33],
    "临沂":[118.35,35.05],
    "南充":[106.110698,30.837793],
    "天津":[117.2,39.13],
    "富阳":[119.95,30.07],
    "泰安":[117.13,36.18],
    "诸暨":[120.23,29.71],
    "郑州":[113.65,34.76],
    "哈尔滨":[126.63,45.75],
    "聊城":[115.97,36.45],
    "芜湖":[118.38,31.33],
    "唐山":[118.02,39.63],
    "平顶山":[113.29,33.75],
    "邢台":[114.48,37.05],
    "德州":[116.29,37.45],
    "济宁":[116.59,35.38],
    "荆州":[112.239741,30.335165],
    "宜昌":[111.3,30.7],
    "义乌":[120.06,29.32],
    "丽水":[119.92,28.45],
    "洛阳":[112.44,34.7],
    "秦皇岛":[119.57,39.95],
    "株洲":[113.16,27.83],
    "石家庄":[114.48,38.03],
    "莱芜":[117.67,36.19],
    "常德":[111.69,29.05],
    "保定":[115.48,38.85],
    "湘潭":[112.91,27.87],
    "金华":[119.64,29.12],
    "岳阳":[113.09,29.37],
    "长沙":[113,28.21],
    "衢州":[118.88,28.97],
    "廊坊":[116.7,39.53],
    "菏泽":[115.480656,35.23375],
    "合肥":[117.27,31.86],
    "武汉":[114.31,30.52],
    "大庆":[125.03,46.58]
}