import { add } from './tools/add'
import './styles/index.scss'
import { createApp } from 'vue';
import App from './App.vue'

createApp(App).mount('#app')

console.log(add(1, 2));
console.log('我是main.js');