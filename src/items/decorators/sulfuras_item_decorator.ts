import { Item } from '../item';
import { ItemDecorator } from '../item_decorator';

export class SulfurasItemDecorator extends ItemDecorator {
  override get quality() {
    return 80;
  }
  override update(): Item {
    return this;
  }
}
