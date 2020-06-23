import {BaseElement} from '../BaseElement';
import './_styles.scss';

/**
 * Filters out Q&A's based on `data-category` property.
 *
 * @extends {BaseElement}
 * @final
 */
class EventQAndA extends BaseElement {
  constructor() {
    super();
    this.selectCategory = this.selectCategory.bind(this);

    this.catageories = new Set();
    this.categorySelectElement = document.createElement('select');
    this.categorySelectElement.classList.add('w-select--borderless');
    this.categorySelectElement.addEventListener('change', this.selectCategory);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addDropDown();

    this.querySelectorAll('[data-category]').forEach((element) => {
      element.addEventListener('click', this.closeDetail);
    });
  }

  disconnectedCallback() {
    this.categorySelectElement.removeEventListener(
      'change',
      this.selectCategory,
    );

    this.querySelectorAll('[data-category]').forEach((element) => {
      element.removeEventListener('click', this.closeDetail);
    });
    super.disconnectedCallback();
  }

  addDropDown() {
    this.querySelectorAll('[data-category]').forEach((element) =>
      this.catageories.add(element.getAttribute('data-category')),
    );

    const divContainer = document.createElement('div');
    divContainer.classList.add('w-event-question-element');
    divContainer.append(this.categorySelectElement);
    const allOption = document.createElement('option');
    allOption.setAttribute('value', '');
    allOption.innerText = 'All categories';
    this.categorySelectElement.append(allOption);

    this.catageories.forEach((category) => {
      const option = document.createElement('option');
      option.setAttribute('value', category);
      option.innerText = category;
      this.categorySelectElement.append(option);
    });

    this.prepend(divContainer);
  }

  closeDetail() {
    this.parentElement
      .querySelectorAll('[data-category]')
      .forEach((element) => {
        if (element !== this) {
          element.removeAttribute('open');
        }
      });
  }

  selectCategory($event) {
    this.querySelectorAll('[data-category]').forEach((element) => {
      if (
        !$event.target.value ||
        element.getAttribute('data-category') === $event.target.value
      ) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  }
}

customElements.define('web-event-q-and-a', EventQAndA);