function getImg(e) {
  if (e === '甲') {
    return require('@/assets/SVG/jia.svg')
  }
  if (e === '乙') {
    return require('@/assets/SVG/yi.svg')
  }
  if (e === '丙') {
    return require('@/assets/SVG/bing.svg')
  }
  if (e === '丁') {
    return require('@/assets/SVG/ding.svg')
  }
  if (e === '戊') {
    return require('@/assets/SVG/wu.svg')
  }
  if (e === '己') {
    return require('@/assets/SVG/ji.svg')
  }
  if (e === '庚') {
    return require('@/assets/SVG/geng.svg')
  }
  if (e === '辛') {
    return require('@/assets/SVG/xin.svg')
  }
  if (e === '壬') {
    return require('@/assets/SVG/ren.svg')
  }
  if (e === '癸') {
    return require('@/assets/SVG/gui.svg')
  }
  if (e === '子') {
    return require('@/assets/SVG/zi.svg')
  }
  if (e === '丑') {
    return require('@/assets/SVG/chou.svg')
  }
  if (e === '寅') {
    return require('@/assets/SVG/yin.svg')
  }
  if (e === '卯') {
    return require('@/assets/SVG/mao.svg')
  }
  if (e === '辰') {
    return require('@/assets/SVG/chen.svg')
  }
  if (e === '巳') {
    return require('@/assets/SVG/si.svg')
  }
  if (e === '午') {
    return require('@/assets/SVG/wu_.svg')
  }
  if (e === '未') {
    return require('@/assets/SVG/wei.svg')
  }
  if (e === '申') {
    return require('@/assets/SVG/shen.svg')
  }
  if (e === '酉') {
    return require('@/assets/SVG/you.svg')
  }
  if (e === '戌') {
    return require('@/assets/SVG/xu.svg')
  }
  if (e === '亥') {
    return require('@/assets/SVG/hai.svg')
  }
}

export default {
  install: function (Vue) {
    Vue.prototype.GetImg = (e) => getImg(e)
  }
}