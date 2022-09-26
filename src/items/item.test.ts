import { describe, it, expect } from 'vitest';

import { ItemBase, Item } from './item';
import { ItemFactory } from './item_factory';
import { SpecialItem } from './special_items';

function updateItem({ quality = 0, sellIn = 0, name = 'test-item' }): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });

  return item.update();
}

describe('Item', () => {
  it('should have the given name', function () {
    const item = new ItemBase('foo', 0, 0);
    expect(item.name).toBe('foo');
  });

  it('should decrease sellIn overtime', () => {
    expect(updateItem({ sellIn: 1 }).sellIn).to.eq(0);
  });

  describe('Quality', () => {
    it('should decrease overtime', () => {
      expect(updateItem({ quality: 10, sellIn: 10 }).quality).to.eq(9);
    });
    it('should decrease by two after sellIn date has passed', () => {
      expect(updateItem({ quality: 2, sellIn: 0 }).quality).to.eq(0);
    });
    it('should not decrease quality below zero', () => {
      expect(updateItem({ quality: 0 }).quality).to.eq(0);
    });
    it('should decrease value twice as fast if sellIn is zero', () => {
      expect(updateItem({ quality: 2, sellIn: 0 }).quality).to.eq(0);
    });
    it('should not increase above 50', () => {
      // FIXME: Using `special` items behaviour here is not the best
      expect(
        updateItem({ quality: 50, sellIn: 1, name: SpecialItem.AgedBrie })
          .quality
      ).to.eq(50);
    });
  });
});
