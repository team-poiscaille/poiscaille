class Animation {
  constructor(duration, renderer) {
    this.tick = 0;
    this.duration = duration;
    this.renderer = renderer;
  }

  init() {}

  render() {
    this.tick += 1;
    this.doRender();

    return this.tick < this.duration;
  }
}

export default Animation;
