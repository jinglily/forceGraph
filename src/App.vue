<template>
  <div id="app">
    <svg style="width:100%;height:1000px" v-on:mousedown.stop.prevent="mousedown">
      <g class="nodes" :transform="'translate('+translate.x+', '+translate.y+')'">
        <line v-for="n in forceData.links" :x1="n.source.x" :y1="n.source.y" :x2="n.target.x" :y2="n.target.y" stroke-width="3"></line>
        <circle v-for="n in forceData.nodes" :cx="n.x" :cy="n.y" r="5" fill="#000"></circle>
      </g>
    </svg>
  </div>
</template>
<!-- <script src="../static/d3.v3.min.js"></script> -->
<script>
import Vue from 'vue';
import d3 from '../static/d3.v3.min.js';
var data = {
  msg: 'Hello World'
};
var mousePosition = data.translate = {
  flag :false,
  x:0,
  y:0
}
var event = {
  mousedown (event){
    mousePosition.offsetX = event.offsetX;
    mousePosition.offsetY = event.offsetY;
    mousePosition.flag = true;
  },
  mousemove (event){
    if(!mousePosition.flag)return;
    mousePosition.x += event.offsetX - mousePosition.offsetX;
    mousePosition.y += event.offsetY - mousePosition.offsetY;
    mousePosition.offsetX = event.offsetX;
    mousePosition.offsetY = event.offsetY;
  },
  mouseup (){
    mousePosition.flag = false;
  }
}
var d = [];
data.forceData = {"links":[{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#13812345678","1#15812345678"],"source":0,"target":1},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#13812345678","7#777"],"source":0,"target":3},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","1#13812345678"],"source":1,"target":0},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","100#usertaobao"],"source":1,"target":2},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","8#56789"],"source":1,"target":4},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["8#56789","1#15212345678"],"source":4,"target":5},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15212345678","1#15812345678"],"source":5,"target":6},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15212345678","101#userjd"],"source":5,"target":7},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","1#13812345678"],"source":6,"target":8},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","100#usertaobao"],"source":6,"target":9},{"selected":false,"sizeFlag":{"pt":true,"selected":false,"hover":false},"previouslySelected":false,"_key":["1#15812345678","8#56789"],"source":6,"target":10}],"nodes":[{"fixed":false,"index":0,"selected":false,"x":0,"y":0,"type":"1","sizeFlag":{"pt":true,"query":true,"selected":false,"hover":false},"weight":3,"name":"13812345678","previouslySelected":false,"_key":"1#13812345678"},{"fixed":false,"index":1,"selected":true,"x":0,"y":0,"type":"1","sizeFlag":{"pt":true,"query":true,"selected":true,"hover":true},"weight":4,"name":"15812345678","previouslySelected":true,"_key":"1#15812345678"},{"fixed":false,"index":2,"selected":false,"x":0,"y":0,"type":"100","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":1,"name":"usertaobao","previouslySelected":false,"_key":"100#usertaobao"},{"fixed":false,"index":3,"selected":false,"x":0,"y":0,"type":"7","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":1,"name":"777","previouslySelected":false,"_key":"7#777"},{"fixed":false,"index":4,"selected":false,"x":0,"y":0,"type":"8","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":2,"name":"56789","previouslySelected":false,"_key":"8#56789"},{"fixed":false,"index":5,"selected":false,"x":0,"y":0,"type":"1","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":3,"name":"15212345678","previouslySelected":false,"_key":"1#15212345678"},{"fixed":false,"index":6,"selected":false,"x":0,"y":0,"type":"1","sizeFlag":{"pt":true,"query":true,"selected":false,"hover":false},"weight":4,"name":"15812345678","previouslySelected":false,"_key":"1#15812345678"},{"fixed":false,"index":7,"selected":false,"x":0,"y":0,"type":"101","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":1,"name":"userjd","previouslySelected":false,"_key":"101#userjd"},{"fixed":false,"index":8,"selected":false,"x":0,"y":0,"type":"1","sizeFlag":{"pt":true,"query":true,"selected":false,"hover":false},"weight":1,"name":"13812345678","previouslySelected":false,"_key":"1#13812345678"},{"fixed":false,"index":9,"selected":false,"x":0,"y":0,"type":"100","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":1,"name":"usertaobao","previouslySelected":false,"_key":"100#usertaobao"},{"fixed":false,"index":10,"selected":false,"x":0,"y":0,"type":"8","sizeFlag":{"pt":true,"query":false,"selected":false,"hover":false},"weight":1,"name":"56789","previouslySelected":false,"_key":"8#56789"}]};

var dd = {links:[], nodes:[]}
for(var i = 0; i<20;i++){
  d.push(JSON.parse(JSON.stringify(data.forceData)));
  d[i].links.forEach(function(v, index, origin){
    v.source = d[i].nodes[v.source];
    v.target = d[i].nodes[v.target];
  })
  dd.links = dd.links.concat(d[i].links)
  dd.nodes = dd.nodes.concat(d[i].nodes)
}
var w = 300;
var h = 300;
var n = 30;
var s = 0;
var c = 0;
for(var i in dd.nodes){
  i=i-0;
  s = Math.floor(Math.floor(i/n) / Math.floor(Math.sqrt(dd.nodes.length/n)));
  c = Math.floor(i/n) % Math.floor(Math.sqrt(dd.nodes.length/n));
  dd.nodes[i].x = getRandom(c*w, (c+1)*w);
  dd.nodes[i].y = getRandom(s*h, (s+1)*h);
}
console.log(dd);
data.forceData = dd;

var force = d3.layout.force()
      .charge(-100)
      .gravity(0.08)
      .linkDistance(20)
      .chargeDistance(500)
      .linkStrength(1)
      .links(data.forceData.links)
      .nodes(data.forceData.nodes)
      .alpha(0.5)
      .size([1000, 500]);
force.start();

function getRandom(a, z){
  return Math.floor(Math.random()*(a==0?z:(a+(z-a))))
}
export default {
  name: 'app',
  data () {
    return data
  },
  methods:event,
  mounted(){
    window.addEventListener('mouseup', event.mouseup)
    window.addEventListener('mousemove', event.mousemove);
  }
}
</script>

<style>
body, html{
  margin:0;
  padding: 0;
  width:100%;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
line {
  stroke: #999;
  stroke-opacity: 0.6;
}

circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
