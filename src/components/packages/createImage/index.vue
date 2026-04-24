<template>
<v-button v-model:show="isShow">
  <img :src="detail.draw_image || '/images/slideshow.png'" style="width: 400px" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" title="" :style="{width: 900, height: 550}" @submit="submit">
  <template v-slot:content>
    <div class="flex">
      <div class="relative" style="width: 600px">
        <div class="pic" style="`height: 450px">
          <div id="pic-wrap" style=" position: absolute; z-index: 1000;"></div>
          <img class="img absolute" ref="pic" style="z-index: 1; display: block" id="pic" :src="img" @mousedown="onmousedown" />
          <div class="canvas-box" :style="`top: 0; right: 0; bottom: 0; left:0;`">
            <canvas ref="cover" id="canvas" width="600" height="450" style="pointer-events: none;"></canvas>
          </div>
        </div>
        <div style="position: absolute; right: 0; bottom: 0; z-index: 100">
          <span><i class="iconfont icon-img" @click="handleChoose" /></span>
          <v-popover content="<i class='iconfont icon-shezhi' />" arrow="tb" offset="right" :move="-150" :keys="`static_img}`">
            <div class="p10 font14" style="width: 250px; overflow: hidden;">
              <div class="col-md-3" v-for="(item, index) in pattern.filter(data => data.type === '0')" :key="index">
                <img :src="item.image" style="width: 100%; height: 60px" @click="handleWenli" />
              </div>
            </div>
          </v-popover>
          <span><i class="iconfont icon-fangda" @click="handleScale(2)" /></span>
          <span><i class="iconfont icon-suoxiao" @click="handleScale(0.5)" /></span>
          <span>
            <v-popover content="<i class='iconfont icon-alpha-desc' />" arrow="tb" offset="right" :move="-125" :keys="`static_img}`">
              <div class="p15 font14" style="width: 150px;">
                透明度：{{data.background.opacity}}
                <input type="range" v-model="data.background.opacity" max="1" min=0 step="0.01" class="input-sm input-full" />
              </div>
            </v-popover>
          </span>
        </div>
      </div>
        <div class="module-wrap ml25">
          <div class="module-head p0">设置
            <span class="right align_right">
              <v-space>
                <v-popover content="<i class='iconfont icon-img' />" arrow="tb" offset="right" :move="-160" :keys="`static_img}`">
                  <div class="p10 font14" style="width: 250px; overflow: hidden;">
                    <div class="col-md-2" v-for="(item, index) in pattern.filter(data => data.type === '1')" :key="index">
                      <img :src="item.image" style="width: 100%; height: 45px" @click="handleAdd" /></div>
                  </div>
                </v-popover>
                <v-popover content="<i class='iconfont icon-font-colors' />" arrow="tb" offset="right" :move="-250" keys="calendar">
                  <div class="color-list color-wrap" style="width: 350px; height: 200px;">
                    <a class="col-md-3 color p5" @click="handleColor()">
                      <div class="cl">
                        <i class="size-32-24 all" style="border: 1px solid #eee;">
                        <i class="size-32-24 all no-event" style="z-index: 100; top: 0; left: 0"></i>
                        <input type="color" v-model="data.background.color" style="background: none; border: 0; width: 32px; height: 24px;" />  
                        </i>默认
                      </div>
                    </a>
                    <a class="col-md-3 color p5" @click="() => data.background.color = item.value" v-for="(item, index) in DRAWCOLOR" :key="index">
                      <div class="cl">
                        <i class="size-32-24" style="border: 1px solid #eee;" :style="{background: item.value}"></i>{{item.name}}
                      </div>
                    </a>
                  </div>
                </v-popover>
                
                <i class="iconfont icon-anonymous-iconfont" @click="handleAdd('text')" />
                <input type="file" id="filElem" accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
              </v-space>
            </span>
          </div>
          <div class="module-content" style="width: 250px; height: 400px; overflow: auto">
            <div v-for="(item, index) in data.text" :key="index">
              <Attr :data="item" @delete="handleRecycle(item, index)" @collapse="handleCollapse" v-if="item.type === 'text'" />
              <IconAttr :data="item" @delete="handleRecycle(item, index)" @collapse="handleCollapse" v-else />
            </div>
          </div>
        </div>
      </div> 
    </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  useStore,
  codings
} from '@/utils'
import Attr from "./attr.vue"
import IconAttr from "./iconAttr.vue"
import { setColor, colorHex2Rgb, colorRgb2Hex} from "@/utils/color";
import {
  DRAWCOLOR
} from '@/assets/common_const'
const props: any = defineProps({
  detail: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

    const emit: any = defineEmits(['image'])
    const store = useStore()
    const coding = codings.pattern
    const isShow: any = ref(false)
    const cover: any = ref(null)
    const pattern: any = ref([])
    const data: any = ref({
      text: [],
      background: {
        color: '#562020',
        opacity: '1'
      }
    })
    const pic: any = ref(null)
    let offX: any = 0 // 图片默认x坐标
    let offY: any = 0 // 图片默认y坐标

    const proportion: any = ref('1')
    let img: any = ref("")
    

    const image: any = ref({
        width: 800
      })

      const size: any = ref({
        width: 600,
        height: 450
      })

    const filElem = ref("filElem")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        Object.assign(data.value, JSON.parse(props.detail.draw_config))
        init()
        setTimeout(() => {
          createIcon()
          cutPicture()
        }, 10)
      }
    })

    watch(data.value, async (newValues, prevValues) => {
      cutPicture()
    })

  function init() {
    store.dispatch('common/Fetch', {
      data: {
        coding
      }
    }).then((res: any) => {
      pattern.value = res.result || []
    })
  }


function getFile() {
  let _obj: any = document.getElementById(filElem.value);
  let file = _obj.files[0]

  let reader = new FileReader()
  reader.onload = function () {
    img.value = reader.result
    pic.value.width = image.value.width * proportion.value
    cover.value.width = size.value.width
    cover.value.height = size.value.height
  }
  reader.readAsDataURL(file)
}

// 拖拽图片
function onmousedown(ev: any) {
  ev.preventDefault()
  let oevent = ev || event
  let distanceX = oevent.clientX //鼠标点击位置
  let distanceY = oevent.clientY //鼠标点击位置
  //dX和dY是鼠标在pic内的相对位置
  //在移动后，设置图片的外边距，利用负外边距移动图片
  document.onmousemove = function (ev) {
    let oevent = ev || event,
    x1 = oevent.clientX - distanceX,
    y1 = oevent.clientY - distanceY
    distanceX = oevent.clientX
    distanceY = oevent.clientY
    let left_p = pic.value.getBoundingClientRect().left
    let top_p = pic.value.getBoundingClientRect().top

    let left_b = cover.value.getBoundingClientRect().left
    let top_b = cover.value.getBoundingClientRect().top

    //左右移动
    if (left_p <= left_b || x1 < 0) {
      let aaa = x1 + offX
      if (aaa >= 0) {
        aaa = 0
      } else if (aaa <= -(pic.value.width - 600)) {
        aaa = -(pic.value.width - 600)
      }
      console.log(0);

      pic.value.style.marginLeft = aaa + 'px'
      offX = x1 + offX
    }

    // 上下移动
    if (top_p <= top_b || y1 < 0) {
      let aaa = y1 + offY
      if (aaa >= 0) {
        aaa = 0
      } else if (aaa <= -(pic.value.height - 450)) {
        aaa = -(pic.value.height - 450)
      }
      pic.value.style.marginTop = aaa + 'px'
      offY = y1 + offY
    }
  }

  document.onmouseup = function () {
    document.onmousemove = null
    cutPicture()
  }
}

// 选择图片
function handleChoose() {
  let _obj: any = document.getElementById(filElem.value);
  _obj.dispatchEvent(new MouseEvent('click'))
  const canvas: any = document.getElementById("canvas");
  canvas.style.background = "none"
}

function handleAdd(param: any){
  let config: any = {}
  if(param === 'text'){
    config = {
      name: data.value.text.length == 0 ? props.detail.title : '文本内容',
      type: 'text',
      size: '32',
      color: '#fff',
      bold: false,
      italic: false,
      underline: false,
      opacity: '1',
      top: 235,
      left: 50,
      offsetX: '0',
      offsetY: '0',
      shadowBlur: 2,
      shadowColor: '#000'
    }
  }else{
    config = {
      type: 'icon',
      file: param.currentTarget.src,
      index: data.value.text.length + 1,
      opacity: '1',
      top: 0,
      left: 0,
      offsetX: '0',
      offsetY: '0',
      shadowBlur: 2,
      shadowColor: '#000'
    }
    let _pic = document.getElementById('pic-wrap')     
    let _img = document.createElement('img') 
    _img.src = param.currentTarget.src
    _img.id = "img_"+config.index
    _pic?.appendChild(_img)
  }
  data.value.text.push(config)
}

function createIcon(){
  let imgList = data.value.text.filter((item: any) => item.type === 'icon')
  for(let i = 0; i < imgList.length; i++){
    let _pic = document.getElementById('pic-wrap')     
    let _img = document.createElement('img') 
    _img.src = imgList[i].file
    _img.className = "hide"
    _img.id = "img_"+imgList[i].index
    _pic?.appendChild(_img)
  }
}

function handleRecycle(param: any, index: any){
  data.value.text.splice(index, 1)
  let img = document.getElementById("img_"+param.index)  
  img?.remove()
}

function handleWenli(e: any) {
  pic.value.src = e.currentTarget.src
  cutPicture()
}

function handleCollapse(param: any){
  param.visible = !param.visible
}

function cutPicture(param: any = {}) {
  const canvas: any = document.getElementById("canvas");
  const big_canvas = canvas.getContext('2d');
  canvas.style.width = "600px"
  canvas.style.height = "450px"

  let x = 0 - parseInt(pic.value.style.marginLeft || 0)
  let y = 0 - parseInt(pic.value.style.marginTop || 0)
  big_canvas.clearRect(0, 0, 1000, 1000)
  big_canvas.fillStyle = data.value.background.color
  big_canvas.fillRect(0, 0, 600, 450)

  var im = document.createElement('img')
  im.src = pic.value.src
  var real_width = im.width
  var real_height = im.height
  big_canvas.globalAlpha = data.value.background.opacity
  
  big_canvas.drawImage(
    pic.value,
    (real_width / pic.value.width) * x,
    (real_height / pic.value.height) * y,
    (real_width / pic.value.width) * size.value.width,
    (real_height / pic.value.height) * size.value.height,
    0,
    0,
    600,
    450
  )

  let textList = data.value.text.filter((item: any) => item.type === 'text')
  let iconList = data.value.text.filter((item: any) => item.type === 'icon')
  for(let i = 0; i < textList.length; i++){
    let list = textList[i]
    let {rgb}: any = setColor(list.color)

    
    big_canvas.shadowOffsetX= list.offsetX // 设定阴影在X轴的延申距离
    big_canvas.shadowOffsetY= list.offsetY // 设定阴影在Y轴的延申距离
    big_canvas.shadowBlur= list.shadowBlur // 设定阴影的模糊度, 默认0
    big_canvas.shadowColor= list.shadowColor // 设定阴影颜色效果
    
    big_canvas.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${list.opacity})`;
    let font = ''
    if(list.bold){
      font += "bold "
    }
    if(list.italic){
      font += "italic "
    }

    font += list.size + "px ''";
    big_canvas.font = font
    // big_canvas.fillText(list.name, list.left, list.top);

    var drawTxt = ''; //当前绘制的内容
    var drawLine = 0; //第几行开始绘制
    var drawIndex = 0; //当前绘制内容的索引
    const textHeight = big_canvas.measureText(list.name).hangingBaseline + 12;
    //判断内容是够可以一行绘制完毕
    if (big_canvas.measureText(list.name).width <= 500) {
      big_canvas.fillText(list.name, list.left, list.top);
    } else {
      for (let i = 0; i < list.name.length; i++) {
        drawTxt += list.name[i];
        if (big_canvas.measureText(drawTxt).width >= 500) {
          big_canvas.fillText(list.name.substring(drawIndex, i + 1), list.left, parseInt(list.top) + drawLine * textHeight)
          drawIndex = i + 1;
          drawLine += 1;
          //drawY+=lineHeight;
          drawTxt = '';
        } else {
          //内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
          if (i === list.name.length - 1) {
            big_canvas.fillText(list.name.substring(drawIndex, i + 1), list.left, parseInt(list.top) + drawLine * textHeight)
          }
        }
      }
    }

    
    if(list.underline){
      const textWidth = big_canvas.measureText(list.name).width;
      const textHeight = big_canvas.measureText(list.name).fontBoundingBoxDescent;

      big_canvas.beginPath();
      big_canvas.moveTo(list.left, parseInt(list.top) + textHeight); // y坐标是文本基线以下的位置
      big_canvas.lineTo(list.left + textWidth, parseInt(list.top) + textHeight);
      big_canvas.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${list.opacity})`; // 或其他你想要的颜色
      big_canvas.lineWidth = 1; // 或其他你想要的线宽
      big_canvas.stroke();
    }

  }

  for(let i = 0; i < iconList.length; i++){
    let list = iconList[i]
    let {rgb}: any = setColor(list.color)
  
    big_canvas.shadowOffsetX= list.offsetX // 设定阴影在X轴的延申距离
    big_canvas.shadowOffsetY= list.offsetY // 设定阴影在Y轴的延申距离
    big_canvas.shadowBlur= list.shadowBlur // 设定阴影的模糊度, 默认0
    big_canvas.shadowColor= list.shadowColor // 设定阴影颜色效果

    let _img: any = document.getElementById('img_'+list.index) 
    _img.style.marginTop = list.top + 'px'
    _img.style.marginLeft = list.left + 'px'
    _img.style.display = 'none'
    // _img.style.width = list.size + 'px'
    big_canvas.globalAlpha = list.opacity
    big_canvas.drawImage(
      _img,
      -list.left,
      -list.top,
      600,
      450,
      0,
      0,
      600,
      450
    )
  }

  big_canvas.globalAlpha = 1
  var image = new Image();
  image.src = cover.value.toDataURL("image/png");
  return image.src
}

function handleScale(scale: any) {
  if (pic.value.width == image.value.width && scale == "0.5") {
    pic.value.width = image.value.width * 0.75
  } else if (pic.value.width < image.value.width && scale == "2") {
    pic.value.width = image.value.width
  } else {
    if (pic.value.width * scale < image.value.width) {
      return
    }
    pic.value.width = pic.value.width * scale
  }
}

    function submit() {
      let src = cutPicture()
      emit('image', {src, config: JSON.stringify(data.value)})
      isShow.value = false
    }
</script>

<style lang="less" scoped>
.pic {
  position: relative;
  width: 600px;
  height: 450px;
  overflow: hidden;
  margin: 0 auto;

  .canvas-box {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 600px;
    height: 450px;
    pointer-events: none;
  }
}
</style>