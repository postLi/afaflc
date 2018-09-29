import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'
import { keepNumber, keepNumberAndPoint } from '@/utils/'
import { getToken } from '@/utils/auth'

Vue.mixin({
  data() {
    return {
      access_token: getToken()
    }
  },

  computed: {
    // 用户信息
    ...mapGetters([
      'otherinfo',
      'allRouters'
    ]),
    // 全局的事件分发器
    eventBus() {
      return eventBus
    }
  },
  methods: {
    keepNumber(event) {
      return keepNumber.call(event.target, event)
    },
    keepNumberAndPoint(event) {
      return keepNumberAndPoint.call(event.target, event)
    },
    // $_has_permission(value) {
    //     let isExist = false
    //     const buttonperms = getUserInfo();
    //     // console.log('buttonperms',buttonperms)
    //     const ptree = buttonperms.permissionTrees
    //     for (let i = 0; i < ptree.length; i++) {
    //       if (ptree[i].code === value) {
    //         isExist = true
    //         break
    //       }
    //     }
    //     return isExist
    //   }
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
