export interface Item {
  name: string;
  sellIn: number;
  quality: number;
  update(): Item;
}

export class ItemBase implements Item {
  public static minQuality = 0;
  public static maxQuality = 50;

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
