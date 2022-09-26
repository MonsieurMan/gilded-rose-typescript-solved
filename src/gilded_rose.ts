import { Item } from './item';

export class Shop {
  constructor(private items: Item[] = []) {
    this.items = items;
  }

  public updateAllItems(): Item[] {
    for (const item of this.items) {
      item.update();
    }

    return this.items;
  }
}
