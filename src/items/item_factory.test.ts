import { expect, describe, it } from 'vitest';

import { AgedBrieItemDecorator } from './decorators/aged_brie_item_decorator';
import { BackstagePassesItemDecorator } from './decorators/backstage_passes_item_decorator';
import { ConjuredItemDecorator } from './decorators/conjured_item_decorator';
import { SulfurasItemDecorator } from './decorators/sulfuras_item_decorator';
import { ItemBase } from './item';
import { ItemFactory } from './item_factory';
import { SpecialItem } from './special_items';

describe('Item factory', () => {
  it('should return an item base for a normal name', () => {
    const item = ItemFactory.createItem({
      name: 'foo',
      sellIn: 1,
      quality: 1,
    });
    expect(item).to.be.instanceOf(ItemBase);
  });
  it(`should return an AgedBrie for name ${SpecialItem.AgedBrie}`, () => {
    const item = ItemFactory.createItem({
      name: SpecialItem.AgedBrie,
      sellIn: 1,
      quality: 1,
    });
    expect(item).to.be.instanceOf(AgedBrieItemDecorator);
  });
  it(`should return a BackstagePasses for name ${SpecialItem.BackstagePasses}`, () => {
    const item = ItemFactory.createItem({
      name: SpecialItem.BackstagePasses,
      sellIn: 1,
      quality: 1,
    });
    expect(item).to.be.instanceOf(BackstagePassesItemDecorator);
  });
  it(`should return a Sulfuras for name ${SpecialItem.Sulfuras}`, () => {
    const item = ItemFactory.createItem({
      name: SpecialItem.Sulfuras,
      sellIn: 1,
      quality: 1,
    });
    expect(item).to.be.instanceOf(SulfurasItemDecorator);
  });
  it(`should return a Conjured item for name beginning by 'conjured'`, () => {
    const item = ItemFactory.createItem({
      name: 'Conjured fried egg',
      sellIn: 1,
      quality: 1,
    });
    expect(item).to.be.instanceOf(ConjuredItemDecorator);
  });
});
