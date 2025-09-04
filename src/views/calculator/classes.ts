export class Calculator {
  value = 0;
  history = [] as command[];
  constructor() {}

  execute(command: command) {
    this.value = command.execute(this.value);
    this.history.push(command);
  }

  undo() {
    if (!this.history.length) {
      this.value = 0;
      return;
    }
    const command = this.history.pop();
    this.value = command?.undo(this.value) || 0;
  }
}

interface command {
  execute: (value: number) => number;
  undo: (value: number) => number;
  value: number;
}

export class AddCommand implements command {
  value;

  constructor(adder: number) {
    this.value = adder;
  }

  execute(value: number) {
    return this.value + value;
  }

  undo(value: number) {
    return value - this.value;
  }
}

export class SubtractCommand implements command {
  value;

  constructor(subtractor: number) {
    this.value = subtractor;
  }

  execute(value: number) {
    return value - this.value;
  }

  undo(value: number) {
    return this.value + value;
  }
}

export class MultiplyCommand implements command {
  value;

  constructor(multiplier: number) {
    this.value = multiplier;
  }

  execute(value: number) {
    return this.value * value;
  }

  undo(value: number) {
    return value / this.value;
  }
}

export class DivideCommand implements command {
  value;

  constructor(divider: number) {
    this.value = divider;
  }

  execute(value: number) {
    return value / this.value;
  }

  undo(value: number) {
    return this.value * value;
  }
}
