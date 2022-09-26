import { Item } from '../item';
import { ItemDecorator } from '../item_decorator';

export class BackstagePassesItemDecorator extends ItemDecorator {
  override update(): Item {
    this.sellIn--;
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.quality += 2;
    } else {
      this.quality++;
    }
    return this;
  }
}
