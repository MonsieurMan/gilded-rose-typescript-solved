import { ItemBase } from '../item';
import { ItemDecorator } from '../item_decorator';

export class ConjuredItemDecorator extends ItemDecorator {
  override update() {
    if (this.quality > ItemBase.minQuality) {
      if (this.sellIn > 0) {
        // FIXME: Hardcoded quality drop rate value
        this.quality -= 2;
      } else {
        // Quality decrease faster after sellIn has passed
        // FIXME: Hardcoded quality drop rate value
        const newQuality = this.quality - 4;
        // Quality can not go below zero
        this.quality = Math.max(newQuality, 0);
      }
    }

    this.sellIn--;

    return this;
  }
}
