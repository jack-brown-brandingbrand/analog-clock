import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'analog-clock',
  styleUrl: 'analog-clock.css',
  shadow: true,
})
export class AnalogClock {

  timer: number
  container!: HTMLElement;

  @State() time: number = Date.now();

  componentDidLoad() {
    if (this.container) {
      Array.from({ length: 12 }).map((_, i) => {
        const line = document.createElement("span");
        line.style.transform = "translateY(-50%) rotate("+i*30+"deg)";
        this.container.appendChild(line);
      })
      Array.from({ length: 60 }).map((_, i) => {
        const line = document.createElement("span");
        line.style.transform = "translateY(-50%) rotate("+i*6+"deg)";
        line.style.background = "#aaa";
        line.style.zIndex = "1";
        this.container.appendChild(line);
      })
    }
  }

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const d = new Date(this.time);
    return (
      <Host>
        <div ref={el => this.container = el as HTMLElement}>
          <clock-hand type="hour" time={d} />
          <clock-hand type="minute" time={d} />
          <clock-hand type="second" time={d} />
        </div>
      </Host>
    );
  }
}
