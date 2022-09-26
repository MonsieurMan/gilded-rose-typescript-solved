import { Item } from './item';

export class Shop {
  constructor(private items: Item[] = []) {
    this.items = items;
  }

  public updateAllItems(): Item[] {
    for (const item of this.items) {
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.update();
      }
    }

    return this.items;
  }
}
