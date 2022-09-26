import { describe, it, expect } from 'vitest';

import { Shop } from '../src/gilded_rose';
import {
  ItemBase,
  Item,
  ItemFactory,
  AgedBrieItemDecorator,
} from '../src/item';

function updateItem({ quality = 0, sellIn = 0, name = 'test-item' }): Item {
  const item = ItemFactory.createItem({ name, sellIn, quality });
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
      const item = new ItemBase('foo', 0, 0);
      expect(item.name).toBe('foo');
    });
  });

  describe('Item factory', () => {
    it('should return an item base for a normal name', () => {
      const item = ItemFactory.createItem({
        name: 'foo',
        sellIn: 1,
        quality: 1,
      });
      expect(item).to.be.instanceOf(ItemBase);
    });
    it('should return an AgedBrie for name `Aged Brie`', () => {
      const item = ItemFactory.createItem({
        name: 'Aged Brie',
        sellIn: 1,
        quality: 1,
      });
      expect(item).to.be.instanceOf(AgedBrieItemDecorator);
    });
    it.skip('should return an BackstagePasses for name `Backstage passes to a TAFKAL80ETC concert`', () => {
      const item = ItemFactory.createItem({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 1,
        quality: 1,
      });
      // expect(item).to.be.instanceOf(BackstagePassesItemDecorator);
    });
  });

  describe('Shop', () => {
    it('should decrease sellIn overtime', () => {
      expect(updateItem({ sellIn: 1 }).sellIn).to.eq(0);
    });

    describe('Quality', () => {
      it('should decrease item quality overtime', () => {
        expect(updateItem({ quality: 10, sellIn: 10 }).quality).to.eq(9);
      });
      it('should decrease item quality by two after sellIn date has passed', () => {
        expect(updateItem({ quality: 2, sellIn: 0 }).quality).to.eq(0);
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
  });
});
