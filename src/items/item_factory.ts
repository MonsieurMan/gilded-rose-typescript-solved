import { SpecialItem } from './special_items';
import { AgedBrieItemDecorator } from './decorators/aged_brie_item_decorator';
import { BackstagePassesItemDecorator } from './decorators/backstage_passes_item_decorator';
import { SulfurasItemDecorator } from './decorators/sulfuras_item_decorator';
import { Item, ItemBase } from './item';
import { ConjuredItemDecorator } from './decorators/conjured_item_decorator';

type ItemInputBase = Omit<Item, 'update' | 'name'>;

export type SpecialItemFactoryInput = ItemInputBase & {
  name: SpecialItem;
};

export type ItemFactoryInput = ItemInputBase & {
  name: string;
};

export class ItemFactory {
  // This factory has the interest of keeping the same interface.
  // Creating special objects only given their name that is.
  // ---
  // FIXME: It creates stringly typed behaviors, which are bad
  // if programmers want to use/test their special behaviors
  static createItem(item: ItemFactoryInput | SpecialItemFactoryInput): Item {
    const itemBase = new ItemBase(item.name, item.sellIn, item.quality);

    if (item.name.match(/^conjured .*/i)) {
      return new ConjuredItemDecorator(itemBase);
    }

    switch (item.name) {
      case SpecialItem.AgedBrie:
        return new AgedBrieItemDecorator(itemBase);
      case SpecialItem.BackstagePasses:
        return new BackstagePassesItemDecorator(itemBase);
      case SpecialItem.Sulfuras:
        return new SulfurasItemDecorator(itemBase);
      default:
        return itemBase;
    }
  }
}
