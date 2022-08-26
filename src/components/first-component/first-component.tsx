import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'first-component',
  styleUrl: 'first-component.css',
  shadow: true,
})
export class FirstComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
