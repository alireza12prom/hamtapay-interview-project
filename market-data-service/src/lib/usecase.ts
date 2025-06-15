export abstract class UseCase<In, Out> {
  abstract execute(input: In): Promise<Out>;
}
