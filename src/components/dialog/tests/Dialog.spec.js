import { mount } from '@vue/test-utils';
import ConfirmationDialog from '@/components/dialog/ConfirmationDialog.vue';
import BasicDialog from '@/components/dialog/BasicDialog.vue'
import ButtonComponent from '@/components/button/ButtonComponent.vue';


describe('Tests for TextInput BasicDialog component', () => {

    it('Should mount correctly the component', () => {
      const wrapper = mount(BasicDialog);
      expect(wrapper.exists()).toBe(true);
    });
  
     
    it('Should not show the dialog', () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: false
        }
      });
      expect(wrapper.find('.gts-dialog-container').exists()).toBe(false);
    });
  
     
    it('Should show the dialog if it`s opened', () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true
        }
      });
      expect(wrapper.find('.gts-dialog-container').exists()).toBe(true);
    });
  
    
    it("Should show the title with the right color", () => {
      const title = 'Titre du Dialogue';
      const titleColor = 'rgb(255, 0, 0)';
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true,
          title: title,
          titleColor: titleColor
        }
      });
      const titleElement = wrapper.find('.gts-dialog-header-title');
      expect(titleElement.text()).toBe(title);
      expect(titleElement.attributes('style')).toContain(`color: ${titleColor};`);
    });
  
    it("Should send close event clicked ", async () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true
        }
      });
      const closeIcon = wrapper.find('.gts-dialog-header-close-icon');
      await closeIcon.trigger('click');
      expect(wrapper.emitted().onClosedDialog).toBeTruthy();
    });
  
     
    it("Should show passed content slot", () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true
        },
        slots: {
          default: '<div class="slot-content">Contenu personnalisé</div>'
        }
      });
      expect(wrapper.find('.slot-content').exists()).toBe(true);
      expect(wrapper.find('.slot-content').text()).toBe('Contenu personnalisé');
    });
  
    
    it("Should show footer if footer slot passed", () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true
        },
        slots: {
          footer: '<div class="footer-content">Footer personnalisé</div>'
        }
      });
      const footer = wrapper.find('.gts-dialog-footer');
      expect(footer.exists()).toBe(true);
      expect(footer.text()).toBe('Footer personnalisé');
    });
  
     
    it("Should not show footer", () => {
      const wrapper = mount(BasicDialog, {
        props: {
          isOpen: true
        }
      });
      const footer = wrapper.find('.gts-dialog-footer');
      expect(footer.exists()).toBe(false);
    });

    it("Should register isMovable and isResizable props with default false", () => {
      const wrapper = mount(BasicDialog);
      expect(wrapper.props().isMovable).toBe(false);
      expect(wrapper.props().isResizable).toBe(false);
    });

    it("Should show resize handle only when isResizable is true", () => {
      const wrapperFalse = mount(BasicDialog, {
        props: {
          isOpen: true,
          isResizable: false
        }
      });
      expect(wrapperFalse.find('.gts-dialog-resize-handle').exists()).toBe(false);

      const wrapperTrue = mount(BasicDialog, {
        props: {
          isOpen: true,
          isResizable: true
        }
      });
      expect(wrapperTrue.find('.gts-dialog-resize-handle').exists()).toBe(true);
    });

    it("Should apply cursor move style to header when isMovable is true", () => {
      const wrapperFalse = mount(BasicDialog, {
        props: {
          isOpen: true,
          isMovable: false
        }
      });
      const headerFalse = wrapperFalse.find('.gts-dialog-header');
      expect(headerFalse.attributes('style') || '').not.toContain('cursor: move;');

      const wrapperTrue = mount(BasicDialog, {
        props: {
          isOpen: true,
          isMovable: true
        }
      });
      const headerTrue = wrapperTrue.find('.gts-dialog-header');
      expect(headerTrue.attributes('style') || '').toContain('cursor: move;');
    });
  });


describe('Tests for TextInput ConfirmationDialog component', () => {
  
   
  it('Should mount correctly the component', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

   
  it("Should use theme passed for confirmation buttons", () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler',
        isOpen: true,
      }
    });
     
    const buttons = wrapper.findAllComponents(ButtonComponent);
    expect(buttons[0].props().theme).toBe('gts-button-primary-inverse');
    expect(buttons[1].props().theme).toBe('gts-button-primary');
  });

  
  it("Should display the right passed props buttons titles", () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler',
        isOpen: true,
      }
    });

    
    
    const buttons = wrapper.findAllComponents({ name: 'ButtonComponent' });
    expect(buttons[0].props().title).toBe('Confirmer');
    expect(buttons[1].props().title).toBe('Annuler');
  });

  it("Should send event when firstBtn clicked", async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler',
        isOpen: true,
      }
    });
    const firstButton = wrapper.findAllComponents({ name: 'ButtonComponent' })[0];
    await firstButton.vm.$emit('buttonClicked');
    expect(wrapper.emitted().onFirstBtnClicked).toBeTruthy();
  });

  it("Should send event when secondBtn clicked", async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler',
        isOpen: true,
      }
    });
    const lastButton = wrapper.findAllComponents({ name: 'ButtonComponent' })[1];
    await lastButton.vm.$emit('buttonClicked');
    expect(wrapper.emitted().onLastBtnClicked).toBeTruthy();
  });

  // Teste le rendu du slot
  it("devrait afficher le contenu du slot par défaut", () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler',
        isOpen: true,
      },
      slots: {
        default: '<div class="slot-content">Contenu personnalisé</div>'
      }
    });
    expect(wrapper.find('.slot-content').exists()).toBe(true);
    expect(wrapper.find('.slot-content').text()).toBe('Contenu personnalisé');
  });
});
