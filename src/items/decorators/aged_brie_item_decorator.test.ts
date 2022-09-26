import { describe, it, expect } from 'vitest';

import { Item } from '../item';
import { ItemFactory } from '../item_factory';
import { SpecialItem } from '../special_items';

function updateItem({
  quality = 0,
  sellIn = 0,
  name = SpecialItem.AgedBrie,
}): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });

  return item.update();
}

describe('Aged Brie', () => {
  it('should increase Aged Brie quality', () => {
    expect(
      updateItem({
        quality: 1,
        sellIn: 1,
      }).quality
    ).to.eq(2);
  });
});
