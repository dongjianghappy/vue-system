import { createRouter, createWebHistory } from 'vue-router'
import routes , {asyncRoutes, loop} from './config'

const use = window.location.pathname.split("/")[1]
const router: any = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const aaaaaa: any = sessionStorage.getItem('menuList')


const bbbbbb = JSON.parse(aaaaaa) || []


let bbb: any = loop(bbbbbb || [])
asyncRoutes[0].children = bbb
router.matcher=bbb
asyncRoutes.forEach((item: any) => {
  // Router4中，去掉了 router.addRoutes ，只能使用 addRoute单个添加
  router.addRoute(item)
  
})

// let aaass = routes.filter(item => {
//   return item.path === "/admin"
// })
// debugger
// router.selfaddRoutes = function (params: any){

  // const newData: any = []
  // for(let i = 0; i < params.length; i++){
  //   if(params[i].path.indexOf('/admin/article') > -1){
  //     newData.push(params[i])
  //   }
  // }
  // if(newData.length > 0){
  //   let vvv = newData.filter((item: any) => {
  //     return item.path === "/admin/article"
  //   })
  
  //   let index = params.findIndex((item: any) => item.path === vvv[0].path)
  // // alert(index)
  // newData.splice(index, 1)
  // newData.push(vvv[0])
  // }

	// let bbb: any = loop(params || [])
  // // let Breadcrumbs: any = Breadcrumb(params || {}, [])
  // debugger
  // // asyncRoutes.children = [{ path: '/admin/basic', component: () => import('../views/basic/index.vue')}]
  // debugger
  // let aaa: any = [
  //   { path: '/', component: () => import('../views/layout/index.vue')},
  // ]
//   // router.matched = createRouter({
//   //   history: createWebHistory(process.env.BASE_URL),
//   //   routes: aaa
//   // });
// debugger
  // router.addRoute(params)
// aaa[0].children = bbb
// debugger
//   aaa.forEach((item: any) => {
//     // Router4中，去掉了 router.addRoutes ，只能使用 addRoute单个添加
//     router.addRoute(item)
    
//  })
//  router.matcher=bbb
//  router.Breadcrumb = Breadcrumbs

  // router.addRoute(asyncRoutes)
// }


// router.matcher = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

export default router
