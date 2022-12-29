import { mount } from '@vue/test-utils'
import Tab2Page from '@/views/Tab2Page.vue'

describe('Tab1Page.vue', () => {
  it('renders tab 2 Tab2Page', () => {
    const wrapper = mount(Tab2Page)
    expect(wrapper.text()).toMatch('Tab 2 page')
  })
})
