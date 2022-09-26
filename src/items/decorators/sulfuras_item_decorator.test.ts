import { describe, it, expect } from 'vitest';

import { Item } from '../item';
import { ItemFactory } from '../item_factory';
import { SpecialItem } from '../special_items';

function updateItem({
  quality = 0,
  sellIn = 0,
  name = SpecialItem.Sulfuras,
}): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });

  return item.update();
}

describe('Sulfuras', () => {
  it('should not decrease Sulfuras quality', () => {
    expect(
      updateItem({
        quality: 80,
        sellIn: 1,
      }).quality
    ).to.eq(80);
  });
  it('should not decrease Sulfuras sellIn', () => {
    expect(
      updateItem({
        quality: 80,
        sellIn: 1,
      }).sellIn
    ).to.eq(1);
  });
});
