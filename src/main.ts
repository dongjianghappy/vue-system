import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-plus'
// import 'element-plus/dist/index.css'
import views from './controller/component' // 公共组件
import publics from './controller/public' // 前台公共组件
import packages from './controller/packages' // 公共组件
import hlj from './components/plugin/loading'
import hljs from './plugin/effects'
import scroll from './plugin/flxed'
import move from './plugin/move'
import drag from './plugin/drag'
import cons from './plugin/const'
import auth from './plugin/authorized'
import form from './plugin/validate'
import codings from './assets/coding'
import chartist from 'vue-chartist'


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';
// import './permission' // permission control
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});



const Vue = createApp(App)
// Vue.use(ElementUI)
views(Vue)
publics(Vue)
packages(Vue)
hlj(Vue)
hljs(Vue)
scroll(Vue)
move(Vue)
drag(Vue)
auth(Vue)
cons(Vue)
form(Vue)
Vue.use(PerfectScrollbar)
Vue.use(chartist)
Vue.config.globalProperties.$coding = codings
Vue.use(store).use(router).mount('#app')
