import { createApp } from 'vue'
import App from './App.vue'

import { Button } from 'vant';

const app = createApp(App)

// 3. 注册你需要的组件
app.use(Button);
app.mount('#app')