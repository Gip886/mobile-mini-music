(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76a5d345"],{"046c":function(t,i,s){t.exports=s.p+"img/previous.bc327ad2.svg"},"193c":function(t,i,s){},"2ac3":function(t,i,s){t.exports=s.p+"img/随机播放.5ceea0af.svg"},"694f":function(t,i,s){t.exports=s.p+"img/循环播放.e98ab0f3.svg"},7316:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("transition",{attrs:{name:"el-zoom-in-bottom"}},[e("div",{staticClass:"playing-song-page",style:t.animationStyle},[e("div",{staticClass:"large-album-img"},[e("img",{style:t.isPlay?t.palyStyle:t.pauseStyle,attrs:{src:t.currentMusicInfo.picUrl,alt:""}})]),e("div",{staticClass:"contral-box"},[e("div",{ref:"progressBox",staticClass:"progress-box",on:{click:t.setSongDot,touchstart:t.songDotTouchStart,touchmove:t.songDotTouchMove,touchend:t.songDotTouchEnd}},[e("div",{staticClass:"progress-bar"},[e("div",{staticClass:"progressed",style:{width:null===t.duration?0:t.currentTime/t.duration*100+"%"}})]),e("div",{staticClass:"slider-dot",style:{"margin-left":(null===t.duration?0:t.currentTime/t.duration*100)+"%"}},[e("div",{staticClass:"breath-dot"})])]),e("div",{staticClass:"below-progress-box"},[e("div",{staticClass:"time-box"},[t._v(t._s(t.showTime))]),e("div",{staticClass:"volume-box"},[e("img",{attrs:{src:s("d3ef")}}),e("div",{staticClass:"volume-percentage"},[t._v(t._s(parseInt(t.volume)))]),e("div",{ref:"volumeAdjustBox",staticClass:"volume-adjust-box",on:{click:t.setVolumeDot,touchmove:t.volumeDotMove,touchend:t.volumeDotTouchEnd}},[e("div",{staticClass:"volume-adjust-bar"},[e("div",{staticClass:"volume-progressed",style:{width:t.volume+"px"}})]),e("div",{staticClass:"slider-dot",style:{"margin-left":t.volume+"px"}},[e("div",{staticClass:"breath-dot"})])])]),e("div",{staticClass:"below-volume-box"},[e("div",{staticClass:"play-mode-box",on:{click:function(i){t.isShow=!t.isShow}}},[e("img",{attrs:{src:s("f3cb")}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"mode-options-box"},[e("div",{staticClass:"mode-option active"},[e("img",{attrs:{src:s("f3cb")}}),e("div",{staticClass:"mode-option-text"},[t._v("顺序播放")])]),e("div",{staticClass:"mode-option"},[e("img",{attrs:{src:s("694f")}}),e("div",{staticClass:"mode-option-text"},[t._v("单曲循环")])]),e("div",{staticClass:"mode-option"},[e("img",{attrs:{src:s("694f")}}),e("div",{staticClass:"mode-option-text"},[t._v("列表循环")])]),e("div",{staticClass:"mode-option"},[e("img",{attrs:{src:s("2ac3")}}),e("div",{staticClass:"mode-option-text"},[t._v("随机播放")])])])]),e("div",{staticClass:"play-contral-box"},[e("div",{staticClass:"previous-song"},[e("img",{attrs:{src:s("046c"),width:"40px"}})]),e("div",{staticClass:"palying-or-paused",on:{click:function(i){return i.stopPropagation(),t.playClick.apply(null,arguments)}}},[e("img",{attrs:{src:t.isPlay?t.pauseImg:t.playImg,width:"40px"}})]),e("div",{staticClass:"next-song",on:{click:function(i){return i.stopPropagation(),t.nextSong.apply(null,arguments)}}},[e("img",{attrs:{src:s("96db"),width:"40px"}})])]),e("div",{staticClass:"playing-page-mark-box"},[e("img",{attrs:{src:s("b4aa")}})])])])])])])},o=[],n=s("5530"),a=s("2f62"),r={data:function(){return{playImg:s("9217"),pauseImg:s("3cc1"),palyStyle:"animation: albumRotate 15s linear infinite running",pauseStyle:"animation: albumRotate 15s linear infinite paused",animationStyle:{},currentVolume:null,isShow:!1}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(a["c"])({audio:"audio",isPlay:"isPlay",volume:"volume",duration:"duration",currentTime:"currentTime",currentIndex:"currentIndex",currentList:"currentList"})),Object(a["b"])(["currentMusicInfo"])),{},{showTime:function(){var t=Math.floor(this.currentTime/60),i=parseInt(this.currentTime%60),s=Math.floor(this.duration/60),e=parseInt(this.duration%60);return t+="",i+="",s+="",e+="",t=1==t.length?"0"+t:t,i=1==i.length?"0"+i:i,s=1==s.length?"0"+s:s,e=1==e.length?"0"+e:e,t+":"+i+"/"+s+":"+e}}),methods:{setSongDot:function(t){var i=t.x-this.$refs.progressBox.getBoundingClientRect().left,s=this.$refs.progressBox.getBoundingClientRect().right-this.$refs.progressBox.getBoundingClientRect().left,e=i/s*this.audio.duration;this.audio.currentTime=e,this.audio.play()},songDotTouchStart:function(t){this.audio.volume=0},songDotTouchMove:function(t){var i=t.touches[0].pageX-this.$refs.progressBox.getBoundingClientRect().left,s=this.$refs.progressBox.getBoundingClientRect().right-this.$refs.progressBox.getBoundingClientRect().left,e=i/s*this.audio.duration;console.log(s),this.audio.currentTime=e,this.audio.play()},songDotTouchEnd:function(t){this.audio.volume=this.volume/100},setVolumeDot:function(t){var i=t.x-this.$refs.volumeAdjustBox.getBoundingClientRect().left;i<0&&(i=0),i>100&&(i=100),this.currentVolume=i,this.audio.volume=this.currentVolume/100,this.$store.commit("sendAudioVolume",this.currentVolume)},volumeDotMove:function(t){var i=t.touches[0].pageX-this.$refs.volumeAdjustBox.getBoundingClientRect().left;i<0&&(i=0),i>100&&(i=100),this.currentVolume=i,this.audio.volume=this.currentVolume/100,this.$store.commit("sendAudioVolume",this.currentVolume)},volumeDotTouchEnd:function(){this.$store.commit("sendAudioVolume",this.currentVolume)},playClick:function(){""!=this.audio.src&&(this.isPlay?(this.audio.pause(),this.$store.commit("changeAudioPlay",!1)):(this.audio.play(),this.$store.commit("changeAudioPlay",!0)))},nextSong:function(){this.$store.commit("changeAudioPlay",!1),this.currentIndex<this.currentList.length&&(this.$store.state.currentIndex++,this.$store.dispatch("getMusicDetail",{musicItem:this.currentList[this.currentIndex],index:this.currentIndex}),this.$store.dispatch("getMusiclyric",{id:this.currentList[this.currentIndex].id}))}},activated:function(){this.animationStyle={animation:"slideUp 0.5s linear forwards"}},deactivated:function(){this.animationStyle={}}},c=r,u=(s("ace9"),s("2877")),l=Object(u["a"])(c,e,o,!1,null,"06259fd6",null);i["default"]=l.exports},"96db":function(t,i,s){t.exports=s.p+"img/next.8367f739.svg"},ace9:function(t,i,s){"use strict";s("193c")},b4aa:function(t,i,s){t.exports=s.p+"img/mark.7e59ed3e.svg"},d3ef:function(t,i,s){t.exports=s.p+"img/音量.bf12cbcd.svg"},f3cb:function(t,i,s){t.exports=s.p+"img/顺序播放.df85c5ab.svg"}}]);
//# sourceMappingURL=chunk-76a5d345.2d5bb380.js.map