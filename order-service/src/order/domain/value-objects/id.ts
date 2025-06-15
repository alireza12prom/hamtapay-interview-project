import { isUUIDValid } from 'src/common/helpers/is-uuid-valid';
import { ValueObject } from '../../../lib/value-object';

export class ID extends ValueObject<string> {
  validate() {
    if (!isUUIDValid(this.value)) throw new Error('ID is not a valid VO');
  }
}
