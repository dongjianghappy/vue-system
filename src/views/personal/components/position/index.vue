<template>
<div class="position-wrap">
  <div class="position-dir pl15"><span>首页</span></div>


</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  useRouter,
  useRoute,
  getUid,
  watch
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
import {
  // Breadcrumb
} from '@/router/config'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Header',
  components: {
    Popover
  },
  props: {
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const channel = computed(() => store.getters['user/channel']);
    const menu: any = basicInfo;
    const messge: any = information;
    const isShow: any = ref(false)
    const Breadcrumbsssss: any = ref([])

    function filters(param: any) {
      debugger
      return param.filter(
        (route: any) => {
          return route.path === window.location.pathname
        }
      )
    }

    // 监听路由
    watch(route, (newValues, prevValues) => {
      router.Breadcrumb
      debugger
      // Breadcrumbsssss.value = itemRender(router.Breadcrumb)
      // Breadcrumbsssss.value = filters(router.Breadcrumb)
    })

    function itemRender(Breadcrumb: any) {
      alert(window.location.pathname)
      // 获取当前路径下相关对象
      const pathname = Breadcrumb.filter(
        (route: any) => {
          debugger
          return route.path === window.location.pathname
        }
      )

      // 如果当前对象由节点则进行分割，否则分割路径
      const arr =
        pathname.length > 0 && pathname[0].node ?
        pathname[0].node.split('/') :
        window.location.pathname.split('/')

      arr.shift()
      const arrs = []
      let path = ''

      for (let i = 0; i < arr.length; i++) {
        path += `/${arr[i]}`
        for (let j = 0; j < Breadcrumb.length; j++) {
          if (Breadcrumb[j].path === path || Breadcrumb[j].node === path) {
            arrs.push({
              path: Breadcrumb[j].path,
              name: Breadcrumb[j].name,
              disabled: Breadcrumb[j].disabled,
            })

            break
          }
        }
      }
      return arrs
      // return (
      //   <>
      //     {arrs.map((item, index) => (
      //       <>
      //         {arrs.length > 1 && index === 0 ? (
      //           <span
      //             key={index}
      //             onClick={() => this.props.history.push(item.path)}
      //           >
      //             {item.name}
      //           </span>
      //         ) : (
      //           <>
      //             {index !== 0 ? <span className="plr5">{'>'}</span> : ''}
      //             <span
      //               key={index}
      //               onClick={() =>
      //                 item.disabled === 'true'
      //                   ? this.props.history.push(item.path)
      //                   : ''
      //               }
      //             >
      //               {item.name}
      //             </span>
      //           </>
      //         )}
      //       </>
      //     ))}
      //   </>
      // )
    }

    function handleclick(param: any) {

      isShow.value = !isShow.value
    }

    function handleRouter(param: any, module: any) {
      isShow.value = false
      props.setRoute({
        path: param,
        module: module
      })
    }

    // 路由跳转
    function routing(param: any) {
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          router.push(`/login`)
        })
      } else {
        router.push(proxy.const.setUrl({
          uid: loginuser.value.account,
          query: param
        }))
      }
    }

    return {
      loginuser,
      userInfo,
      channel,
      menu,
      messge,
      isShow,
      handleclick,
      handleRouter,
      routing,
      Breadcrumbsssss
    }
  }
})
</script>

<style scoped>
.channel-bg {
  background: #eee;
}
</style>
