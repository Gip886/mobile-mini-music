(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-625e6cd4"],{"42b3":function(t,i,s){t.exports=s.p+"img/火箭.34a1c8dd.svg"},9564:function(t,i,s){},b160:function(t,i,s){"use strict";s.r(i);var o=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"top-100-page"},[o("el-backtop",{staticStyle:{"background-color":"rgba(255, 255, 255, 0)"},attrs:{target:".top-100-item-box",bottom:100}},[o("img",{attrs:{src:s("42b3"),width:"35px",alt:""}})]),o("div",{staticClass:"top-100-title"},[t._v("Top 100")]),o("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],ref:"top100ItemBoxDom",staticClass:"top-100-item-box",attrs:{"infinite-scroll-immediate":"false"}},t._l(t.top100List,(function(i,s){return o("div",{key:s,staticClass:"top-100-item",style:t.currentIndex==s?t.playingSongStyle:""},[o("img",{staticClass:"top-100-mark-img",attrs:{src:t.markImgUrl,alt:""}}),o("el-image",{key:s,staticClass:"top-100-album-img",attrs:{src:i.picUrl,lazy:""},on:{click:function(o){return t.playThisSong(i,s)}}},[o("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" 加载中"),o("span",{staticClass:"dot"},[t._v("...")])])]),o("div",{staticClass:"top-100-album-info"},[o("div",{staticClass:"top-100-song-name"},[t._v(t._s(i.name))]),o("div",{staticClass:"top-100-singer-name"},[t._v(t._s(i.songer))])])],1)})),0)],1)},e=[],a=s("5530"),n=(s("8137"),s("2f62")),r={data:function(){return{markImgUrl:s("b549"),markedImgUrl:s("cc6e"),items:[],limit:36,isShowBackTop:!1,scrollerPosition:0,playingSongStyle:{transform:"scale(1.1)"},loading:!1}},computed:Object(a["a"])({},Object(n["c"])({top100List:function(t){return t.top100List},currentIndex:function(t){return t.currentIndex},audio:"audio",isPlay:"isPlay"})),mounted:function(){var t=this;this.$refs.top100ItemBoxDom.addEventListener("scroll",(function(){t.scrollerPosition=t.$refs.top100ItemBoxDom.scrollTop,t.$refs.top100ItemBoxDom.scrollTop>600?t.isShowBackTop=!0:t.isShowBackTop=!1})),this.$store.dispatch("getNewMusic",{limit:this.limit})},methods:{load:function(){this.$message("加载更多中")},backTop:function(){var t=this,i=setInterval((function(){t.$refs.top100ItemBoxDom.scrollTop-=30,t.$refs.top100ItemBoxDom.scrollTop<=0&&clearInterval(i)}))},playThisSong:function(t,i){var s={page:"DiscoverPage",currentIndex:i};i==this.currentIndex?this.isPlay||(this.audio.play(),this.$store.commit("changeAudioPlay",!0)):(this.$store.commit("changeCurrentIndex",s),this.$store.dispatch("getMusicDetail",{musicItem:t,index:i}),this.$store.dispatch("getMusiclyric",{id:t.id}))}},deactivated:function(){},activated:function(){this.$refs.top100ItemBoxDom.scrollTop=this.scrollerPosition}},c=r,l=(s("f7bf"),s("2877")),m=Object(l["a"])(c,o,e,!1,null,null,null);i["default"]=m.exports},b549:function(t,i,s){t.exports=s.p+"img/mark.0f03ca37.svg"},cc6e:function(t,i,s){t.exports=s.p+"img/marked.e0fdd7d1.svg"},f7bf:function(t,i,s){"use strict";s("9564")}}]);
//# sourceMappingURL=chunk-625e6cd4.a13131a8.js.map