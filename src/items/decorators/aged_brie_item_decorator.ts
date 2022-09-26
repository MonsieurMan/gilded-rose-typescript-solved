import { Item, ItemBase } from '../item';
import { ItemDecorator } from '../item_decorator';

export class AgedBrieItemDecorator extends ItemDecorator {
  override update(): Item {
    if (this.quality < ItemBase.maxQuality) {
      this.quality++;
    }
    this.sellIn--;
    return this;
  }
}
