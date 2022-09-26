import { describe, it, expect } from 'vitest';

import { Shop, Item } from '../src/gilded_rose';

function updateItem({ quality = 0, sellIn = 0, name = 'test-item' }): Item {
  const item = new Item(name, sellIn, quality);
  const shop = new Shop([item]);
  const updatedItem = shop.updateAllItems()[0];
  if (!updatedItem) {
    throw new Error(`Could not get item`);
  }
  return updatedItem;
}

describe('Gilded Rose', function () {
  describe('Item', () => {
    it('should have the given name', function () {
      const item = new Item('foo', 0, 0);
      expect(item.name).toBe('foo');
    });
  });

  describe('Shop', () => {
    describe('Quality', () => {
      it('should decrease item quality', () => {
        expect(updateItem({ quality: 1 }).quality).to.eq(0);
      });
      it('should not decrease quality below zero', () => {
        expect(updateItem({ quality: 0 }).quality).to.eq(0);
      });
      it('should decrease value twice as fast if sellIn is zero', () => {
        expect(updateItem({ quality: 2, sellIn: 0 }).quality).to.eq(0);
      });
      it('should not increase above 50', () => {
        expect(
          updateItem({ quality: 50, sellIn: 1, name: 'Aged Brie' }).quality
        ).to.eq(50);
      });
    });

    describe('Special items', () => {
      it('should increase Aged Brie quality', () => {
        expect(
          updateItem({
            quality: 1,
            sellIn: 1,
            name: 'Aged Brie',
          }).quality
        ).to.eq(2);
      });
      it('should not decrease Sulfuras quality', () => {
        expect(
          updateItem({
            quality: 50,
            sellIn: 1,
            name: 'Sulfuras, Hand of Ragnaros',
          }).quality
        ).to.eq(50);
      });
      describe('Backstage passes', () => {
        const backstagePasses = `Backstage passes to a TAFKAL80ETC concert`;
        it('should increase quality overtime', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 20,
              name: backstagePasses,
            }).quality
          ).to.eq(1);
        });
        it('should increase quality by two, 10 days before selling', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 10,
              name: backstagePasses,
            }).quality
          ).to.eq(2);
        });
        it('should increase quality by three, 5 days before selling', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 5,
              name: backstagePasses,
            }).quality
          ).to.eq(3);
        });
        it('should drop quality to zero after the sellIn date has passed', () => {
          expect(
            updateItem({
              quality: 10,
              sellIn: 0,
              name: backstagePasses,
            }).quality
          ).to.eq(0);
        });
      });
    });

    describe('SellIn', () => {
      it('should decrease sellIn', () => {
        expect(updateItem({ sellIn: 1 }).sellIn).to.eq(0);
      });
    });
  });
});
