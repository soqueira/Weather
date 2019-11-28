import { mount } from '@vue/test-utils';
import Form from '@/components/Form.vue';

describe('Form.vue', () => {
  it('return a random city if city is not defined', () => {
    const wrapper = mount(Form, {
      stubs: ["router-link", "router-view"],
    });
    const vm = wrapper.vm;
    vm.initLocalStorage();
    expect(vm.city).toBeTruthy();
  });
});