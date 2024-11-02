/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-10-31 08:26:38
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-02 15:30:45
 * @FilePath: /passenger/passenger-vue/passenger-app/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
