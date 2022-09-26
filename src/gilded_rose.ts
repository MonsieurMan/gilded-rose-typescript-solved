export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export enum SpecialItem {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
}

export class Shop {
  maxQuality = 50;
  minQuality = 0;

  constructor(private items: Item[] = []) {
    this.items = items;
  }

  updateAllItems() {
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
      if (item.quality > this.minQuality) {
        if (item.sellIn > 0) {
          item.quality--;
        } else {
          // Quality decrease faster after sellIn has passed
          const newQuality = item.quality - 2;
          // Quality can not go below zero
          item.quality = Math.max(newQuality, 0);
        }
      }

      item.sellIn--;

      return;
    }

    if (
      (item.name == SpecialItem.AgedBrie ||
        item.name == SpecialItem.BackstagePasses) &&
      item.quality < this.maxQuality
    ) {
      item.quality += 1;

      if (item.name == SpecialItem.BackstagePasses) {
        if (item.sellIn < 11 && item.quality < this.maxQuality) {
          item.quality += 1;
        }
        if (item.sellIn < 6 && item.quality < this.maxQuality) {
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
