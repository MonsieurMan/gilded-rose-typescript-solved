export class Item {
  static minQuality = 0;
  static maxQuality = 50;

  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update() {
    if (this.quality > Item.minQuality) {
      if (this.sellIn > 0) {
        this.quality--;
      } else {
        // Quality decrease faster after sellIn has passed
        const newQuality = this.quality - 2;
        // Quality can not go below zero
        this.quality = Math.max(newQuality, 0);
      }
    }

    this.sellIn--;
  }
}

export enum SpecialItem {
  AgedBrie = 'Aged Brie',
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
      (item.name == SpecialItem.AgedBrie ||
        item.name == SpecialItem.BackstagePasses) &&
      item.quality < Item.maxQuality
    ) {
      item.quality += 1;

      if (item.name == SpecialItem.BackstagePasses) {
        if (item.sellIn < 11 && item.quality < Item.maxQuality) {
          item.quality += 1;
        }
        if (item.sellIn < 6 && item.quality < Item.maxQuality) {
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
