import { Item } from './item';

/**
 * Decorator used to override default item behaviour for special items.
 * @see `./decorators` folder
 */
export abstract class ItemDecorator implements Item {
  constructor(private item: Item) {}
  get name() {
    return this.item.name;
  }
  set name(value: string) {
    this.item.name = value;
  }
  get sellIn() {
    return this.item.sellIn;
  }
  set sellIn(value: number) {
    this.item.sellIn = value;
  }
  get quality() {
    return this.item.quality;
  }
  set quality(value: number) {
    this.item.quality = value;
  }
  update(): Item {
    return this.item.update();
  }
}
