import { mount } from '@vue/test-utils';
import Form from '@/components/Form.vue';

describe('Form.vue', () => {
  it('ajax call returns city', () => {
    const wrapper = mount(Form, {
      stubs: ["router-link", "router-view"],
    });
    const vm = wrapper.vm;
    wrapper.vm.initLocalStorage();
    expect(vm.city).toBeTruthy();
  });
});