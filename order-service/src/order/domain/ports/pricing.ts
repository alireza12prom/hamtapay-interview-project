export abstract class PricingPort {
  abstract get(): Promise<number>;
}
