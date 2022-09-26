import { describe, it, expect } from 'vitest';

import { Item } from '../item';
import { ItemFactory } from '../item_factory';
import { SpecialItem } from '../special_items';

function updateItem({
  quality = 0,
  sellIn = 0,
  name = `Conjured fried eggs`,
}): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });

  return item.update();
}

describe('Conjured item', () => {
  it('should decrease quality twice as fast', () => {
    expect(
      updateItem({
        quality: 10,
        sellIn: 1,
      }).quality
    ).to.eq(8);
  });
  it('should decrease quality twice as fast', () => {
    expect(
      updateItem({
        quality: 10,
        sellIn: 0,
      }).quality
    ).to.eq(6);
  });
});
