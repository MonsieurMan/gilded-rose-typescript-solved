import { describe, it, expect } from 'vitest';

import { Item } from '../item';
import { ItemFactory } from '../item_factory';
import { SpecialItem } from '../special_items';

function updateItem({
  quality = 0,
  sellIn = 0,
  name = SpecialItem.BackstagePasses,
}): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });

  return item.update();
}

describe('Backstage passes', () => {
  it('should increase quality overtime', () => {
    expect(
      updateItem({
        quality: 0,
        sellIn: 20,
      }).quality
    ).to.eq(1);
  });
  it('should increase quality by two, 10 days before selling', () => {
    expect(
      updateItem({
        quality: 0,
        sellIn: 10,
      }).quality
    ).to.eq(2);
  });
  it('should increase quality by three, 5 days before selling', () => {
    expect(
      updateItem({
        quality: 0,
        sellIn: 5,
      }).quality
    ).to.eq(3);
  });
  it('should drop quality to zero after the sellIn date has passed', () => {
    expect(
      updateItem({
        quality: 10,
        sellIn: 0,
      }).quality
    ).to.eq(0);
  });
});
