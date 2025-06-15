export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  abstract validate(): void;

  getValue(): T {
    return this.value;
  }
}
