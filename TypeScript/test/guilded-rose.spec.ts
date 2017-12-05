import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('constructor works', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        expect(gildedRose.items[0].name).to.equal('foo');
        expect(gildedRose.items[0].quality).to.equal(5);
        expect(gildedRose.items[0].sellIn).to.equal(5);
    });

    it('Quality is never negative when quality is zero', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 0) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(0);
    });

    it('Quality is never greater 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 50) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(50);
    });

    it('Quality increased with brie', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 49, 49) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(50);
    });

    it('Quality and sellIn for the legendary item is constant', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', -1, 50) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(-1);
    });

    it('Quality for backstage pass increases by 2 and 3', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0) ]);
        let items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(9);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(4);
        expect(items[0].sellIn).to.equal(8);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(6);
        expect(items[0].sellIn).to.equal(7);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(8);
        expect(items[0].sellIn).to.equal(6);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(10);
        expect(items[0].sellIn).to.equal(5);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(13);
        expect(items[0].sellIn).to.equal(4);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(16);
        expect(items[0].sellIn).to.equal(3);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(19);
        expect(items[0].sellIn).to.equal(2);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(22);
        expect(items[0].sellIn).to.equal(1);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(25);
        expect(items[0].sellIn).to.equal(0);

        items = gildedRose.updateQualityAndSellin();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });

    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 4) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(-2);
    });

    it('updateQuality works', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(4);
        expect(items[0].sellIn).to.equal(4);
    });

    it ('it updates all items', function(){
        const gildedRose = new GildedRose([ new Item('foo', 5, 5), new Item('bar', 3, 4) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].name).to.equal('foo');
        expect(items[0].quality).to.equal(4);
        expect(items[0].sellIn).to.equal(4);
        expect(items[1].name).to.equal('bar');
        expect(items[1].quality).to.equal(3);
        expect(items[1].sellIn).to.equal(2);
    });

    it('Conjured” items degrade in Quality twice as fast as normal items', function() {
        const gildedRose = new GildedRose([ new Item('Conjured', 5, 4) ]);
        const items = gildedRose.updateQualityAndSellin();
        expect(items[0].name).to.equal('Conjured');
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(4);
    });
});
