import { Item, ItemBase } from './item';

export enum SpecialItem {
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
}

export class Shop {
  constructor(private items: Item[] = []) {
    this.items = items;
  }

  public updateAllItems(): Item[] {
    for (const item of this.items) {
      this.updateItemQuality(item);
    }

    return this.items;
  }

  private updateItemQuality(item: Item) {
    const isSpecialItem = Object.values(SpecialItem).includes(
      item.name as SpecialItem
    );

    if (!isSpecialItem) {
      item.update();
    } else {
      this.updateSpecialItem(item);
    }
  }

  private updateSpecialItem(item: Item) {
    if (
      item.name == SpecialItem.BackstagePasses &&
      item.quality < ItemBase.maxQuality
    ) {
      item.quality += 1;

      if (item.name == SpecialItem.BackstagePasses) {
        if (item.sellIn < 11 && item.quality < ItemBase.maxQuality) {
          item.quality += 1;
        }
        if (item.sellIn < 6 && item.quality < ItemBase.maxQuality) {
          item.quality += 1;
        }
      }
    }

    if (item.name != SpecialItem.Sulfuras) {
      item.sellIn -= 1;
    }

    if (item.sellIn < 0) {
      if (item.name === SpecialItem.BackstagePasses) {
        item.quality = 0;
      }
    }
  }
}
