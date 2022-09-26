export interface Item {
  name: string;
  sellIn: number;
  quality: number;
  update(): Item;
}

export class ItemBase implements Item {
  static minQuality = 0;
  static maxQuality = 50;

  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update() {
    if (this.quality > ItemBase.minQuality) {
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

    return this;
  }
}

export abstract class ItemDecorator implements Item {
  constructor(protected item: Item) {}
  get name() {
    return this.item.name;
  }
  get sellIn() {
    return this.item.sellIn;
  }
  get quality() {
    return this.item.quality;
  }
  update(): Item {
    return this.item.update();
  }
}

export class AgedBrieItemDecorator extends ItemDecorator {
  override update(): Item {
    if (this.quality < ItemBase.maxQuality) {
      this.item.quality++;
    }
    this.item.sellIn--;
    return this;
  }
}

// export class BackstagePassesItemDecorator extends ItemDecorator {}

export class ItemFactory {
  // This factory has the interest of keeping the same interface.
  // Creating special objects only given their name that is.
  // ---
  // FIXME: It creates stringly typed behaviors, which are bad
  // if programmers want to use/test their special behaviors
  static createItem(item: Omit<Item, 'update'>): Item {
    const itemBase = new ItemBase(item.name, item.sellIn, item.quality);

    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieItemDecorator(itemBase);
      // case 'Backstage passes to a TAFKAL80ETC concert':
      //   return new BackstagePassesItemDecorator(itemBase);
      default:
        return itemBase;
    }
  }
}
