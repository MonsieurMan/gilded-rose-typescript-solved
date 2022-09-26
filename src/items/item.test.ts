import { describe, it, expect } from 'vitest';

import { Shop } from '../gilded_rose';
import { ItemBase, Item } from './item';
import { ItemFactory } from './item_factory';
import { AgedBrieItemDecorator } from './decorators/aged_brie_item_decorator';
import { BackstagePassesItemDecorator } from './decorators/backstage_passes_item_decorator';
import { SulfurasItemDecorator } from './decorators/sulfuras_item_decorator';
import { SpecialItem } from './special_items';

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
    it(`should return an AgedBrie for name ${SpecialItem.AgedBrie}`, () => {
      const item = ItemFactory.createItem({
        name: SpecialItem.AgedBrie,
        sellIn: 1,
        quality: 1,
      });
      expect(item).to.be.instanceOf(AgedBrieItemDecorator);
    });
    it(`should return an BackstagePasses for name ${SpecialItem.BackstagePasses}`, () => {
      const item = ItemFactory.createItem({
        name: SpecialItem.BackstagePasses,
        sellIn: 1,
        quality: 1,
      });
      expect(item).to.be.instanceOf(BackstagePassesItemDecorator);
    });
    it(`should return an Sulfuras for name ${SpecialItem.Sulfuras}`, () => {
      const item = ItemFactory.createItem({
        name: SpecialItem.Sulfuras,
        sellIn: 1,
        quality: 1,
      });
      expect(item).to.be.instanceOf(SulfurasItemDecorator);
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
          updateItem({ quality: 50, sellIn: 1, name: SpecialItem.AgedBrie })
            .quality
        ).to.eq(50);
      });
    });

    describe('Special items', () => {
      it('should increase Aged Brie quality', () => {
        expect(
          updateItem({
            quality: 1,
            sellIn: 1,
            name: SpecialItem.AgedBrie,
          }).quality
        ).to.eq(2);
      });
      it('should not decrease Sulfuras quality', () => {
        expect(
          updateItem({
            quality: 80,
            sellIn: 1,
            name: SpecialItem.Sulfuras,
          }).quality
        ).to.eq(80);
      });
      it('should not decrease Sulfuras sellIn', () => {
        expect(
          updateItem({
            quality: 80,
            sellIn: 1,
            name: SpecialItem.Sulfuras,
          }).sellIn
        ).to.eq(1);
      });
      describe('Backstage passes', () => {
        it('should increase quality overtime', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 20,
              name: SpecialItem.BackstagePasses,
            }).quality
          ).to.eq(1);
        });
        it('should increase quality by two, 10 days before selling', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 10,
              name: SpecialItem.BackstagePasses,
            }).quality
          ).to.eq(2);
        });
        it('should increase quality by three, 5 days before selling', () => {
          expect(
            updateItem({
              quality: 0,
              sellIn: 5,
              name: SpecialItem.BackstagePasses,
            }).quality
          ).to.eq(3);
        });
        it('should drop quality to zero after the sellIn date has passed', () => {
          expect(
            updateItem({
              quality: 10,
              sellIn: 0,
              name: SpecialItem.BackstagePasses,
            }).quality
          ).to.eq(0);
        });
      });
    });
  });
});
