import { mount } from '@vue/test-utils';
import ConfirmationDialog from '@/components/dialog/ConfirmationDialog.vue';
import BasicDialog from '@/components/dialog/BasicDialog.vue';
import ButtonComponent from '@/components/button/ButtonComponent.vue';

describe('Tests for TextInput BasicDialog component', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should mount correctly the component', () => {
    const wrapper = mount(BasicDialog);
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });

  it('Should not show the dialog', () => {
    const wrapper = mount(BasicDialog, {
      props: {
        isOpen: false
      }
    });
    expect(document.querySelector('.gts-dialog-container')).toBeNull();
    wrapper.unmount();
  });

  it('Should show the dialog if it`s opened', () => {
    const wrapper = mount(BasicDialog, {
      props: {
        isOpen: true
      }
    });
    expect(document.querySelector('.gts-dialog-container')).not.toBeNull();
    wrapper.unmount();
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
    const titleElement = document.querySelector('.gts-dialog-header-title');
    expect(titleElement.textContent).toBe(title);
    expect(titleElement.getAttribute('style')).toContain(`color: ${titleColor};`);
    wrapper.unmount();
  });

  it("Should send close event clicked ", async () => {
    const wrapper = mount(BasicDialog, {
      props: {
        isOpen: true
      }
    });
    const closeIcon = document.querySelector('.gts-dialog-header-close-icon');
    closeIcon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(wrapper.emitted().onClosedDialog).toBeTruthy();
    wrapper.unmount();
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
    const slotContent = document.querySelector('.slot-content');
    expect(slotContent).not.toBeNull();
    expect(slotContent.textContent).toBe('Contenu personnalisé');
    wrapper.unmount();
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
    const footer = document.querySelector('.gts-dialog-footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toBe('Footer personnalisé');
    wrapper.unmount();
  });

  it("Should not show footer", () => {
    const wrapper = mount(BasicDialog, {
      props: {
        isOpen: true
      }
    });
    const footer = document.querySelector('.gts-dialog-footer');
    expect(footer).toBeNull();
    wrapper.unmount();
  });

  it("Should register isMovable and isResizable props with default false", () => {
    const wrapper = mount(BasicDialog);
    expect(wrapper.props().isMovable).toBe(false);
    expect(wrapper.props().isResizable).toBe(false);
    wrapper.unmount();
  });

  it("Should show resize handle only when isResizable is true", () => {
    const wrapperFalse = mount(BasicDialog, {
      props: {
        isOpen: true,
        isResizable: false
      }
    });
    expect(document.querySelector('.gts-dialog-resize-handle')).toBeNull();
    wrapperFalse.unmount();

    const wrapperTrue = mount(BasicDialog, {
      props: {
        isOpen: true,
        isResizable: true
      }
    });
    expect(document.querySelector('.gts-dialog-resize-handle')).not.toBeNull();
    wrapperTrue.unmount();
  });

  it("Should apply cursor move style to header when isMovable is true", () => {
    const wrapperFalse = mount(BasicDialog, {
      props: {
        isOpen: true,
        isMovable: false
      }
    });
    const headerFalse = document.querySelector('.gts-dialog-header');
    expect(headerFalse.getAttribute('style') || '').not.toContain('cursor: move;');
    wrapperFalse.unmount();

    const wrapperTrue = mount(BasicDialog, {
      props: {
        isOpen: true,
        isMovable: true
      }
    });
    const headerTrue = document.querySelector('.gts-dialog-header');
    expect(headerTrue.getAttribute('style') || '').toContain('cursor: move;');
    wrapperTrue.unmount();
  });
});

describe('Tests for TextInput ConfirmationDialog component', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should mount correctly the component', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        titleFirstBtn: 'Confirmer',
        titleLastBtn: 'Annuler'
      }
    });
    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
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
    wrapper.unmount();
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
    wrapper.unmount();
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
    wrapper.unmount();
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
    wrapper.unmount();
  });

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
    const slotContent = document.querySelector('.slot-content');
    expect(slotContent).not.toBeNull();
    expect(slotContent.textContent).toBe('Contenu personnalisé');
    wrapper.unmount();
  });
});
