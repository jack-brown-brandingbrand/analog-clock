import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'clock-hand',
  styleUrl: 'clock-hand.css',
  shadow: true,
})
export class ClockHand {

  hand!: HTMLElement;

  @Prop() time: Date;
  @Prop() type: string;
  @Prop() seconds: number;

  getAngleHourHand() {
    const hours = this.time.getHours();
    const index = (hours === 12) ? 0 : hours;
    return (index * 30) + (this.getAngleMinuteHand() / 12)
  }

  getAngleMinuteHand() {
    return (this.time.getMinutes() * 6) + (this.time.getSeconds() / 10);
  }

  getAngleSecondHand() {
    return this.time.getSeconds() * 6;
  }

  getAngle() {
    switch (this.type) {
      case "hour":
        return this.getAngleHourHand();
      case "minute":
        return this.getAngleMinuteHand();
      case "second":
        return this.getAngleSecondHand();
    }
  }

  componentWillRender() {
    if (this.hand) {
      const angle = this.getAngle() - 90;
      this.hand.style.transform = "translateY(-50%) rotate("+angle+"deg)"
      this.hand.style.background = (this.type === "second")
        ? "#cc0000"
        : "#222";
      if (this.type === "hour") {
        this.hand.style.height = "4px";
        this.hand.style.width = "6rem";
      }
    }
  }

  render() {
    return (
      <Host>
        <span
          id={this.type+"-hand"}
          ref={(el) => this.hand = el as HTMLElement}
        >
        </span>
      </Host>
    );
  }
}

