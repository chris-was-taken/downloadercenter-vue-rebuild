import Vue from 'vue'
import Downloadcenter from '@/components/Downloadcenter'

describe('Downloadcenter.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Downloadcenter)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
