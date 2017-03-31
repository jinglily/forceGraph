import Vue from 'vue'
import App from './App.vue'

{
	let app = new Vue({
	  el: '#app',
	  render: h => h(App),
	  data:App.data(),
	  created:function(){

	  }
	})
	app.msg = "你好 世界";
}



//等价

// import Vue from 'vue'
// import App from './App.vue'

// new Vue({
//   el: '#app',
//   render: function(h){
//   	return h(App);
//   }
// })
// 
// 
// ————————————————————————————