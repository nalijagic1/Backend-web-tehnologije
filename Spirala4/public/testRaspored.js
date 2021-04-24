let assert = chai.assert;
describe('Raspored', function () {
   describe('#dajTrentnuAktivnost', function () {
      it('Nema aktivnosti u datom vremenu', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajTrenutnuAktivnost("15-10-2020T11:00:00", "grupa2")
         assert.equal(status, 'Trenutno nema aktivnosti');
      });
      it('Početak neke aktivnosti', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajTrenutnuAktivnost("13-10-2020T09:00:00", "grupa2")
         assert.equal(status, 'MUR1 120');
      });
      it('Kraj neke aktivnosti', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajTrenutnuAktivnost("12-10-2020T12:00:00", "grupa1")
         assert.equal(status, 'BWT 90');
      });
      it('Pogrešna grupa', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajTrenutnuAktivnost("12-10-2020T14:15:00", "grupa1")
         assert.equal(status, 'Trenutno nema aktivnosti');
      });
      it('Ispravna grupa i vrijeme', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajTrenutnuAktivnost("12-10-2020T14:15:00", "grupa2")
         assert.equal(status, 'BWT 45');
      });
   });
   describe('#dajPrethodnuAktivnost', function () {
      it('Pogrešna grupa prethodnog', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajPrethodnuAktivnost("14-10-2020T12:50:00", "grupa2")
         assert.equal(status, 'FWT');
      });
      it('Prethodnoa aktivnost drugi dan', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajPrethodnuAktivnost("12-10-2020T09:00:00", "grupa1")
         assert.equal(status, 'MUR2');
      });
   });
   describe('#dajSljedecuAktivnost', function () {
      it('Pogrešna grupa sljedeće', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajSljedecuAktivnost("02-11-2020T12:50:00", "grupa1")
         assert.equal(status, 'BWT 130');
      });
      it('Nema slijedeće aktivnosti', function () {
         let raspored = `BWT-grupa2,vjezbe,ponedjeljak,13:30,15:00\nBWT,predavanje,ponedjeljak,15:00,18:00\nMUR1,predavanje,utorak,09:00,11:00\nMUR1-grupa1,vjezbe,srijeda,11:00,12:30\nMUR1-grupa2,vjezbe,srijeda,12:30,14:00\nRMA,predavanje,ponedjeljak,09:00,12:00\nBWT-grupa1,vjezbe,ponedjeljak,12:00,13:30\nFWT-grupa2,vjezbe,srijeda,11:00,12:30\nFWT-grupa1,vjezbe,srijeda,12:30,14:00\nASP,predavanje,srijeda,09:00,12:00\nMUR2,predavanje,cetvrtak,12:00,15:00\nFWT,predavanje,cetvrtak,09:00,10:30`;
         const k1 = new Raspored(raspored)
         let status = k1.dajSljedecuAktivnost("14-10-2020T13:30:00", "grupa1")
         assert.equal(status, 'Nastava je gotova za danas');
      });
   });
});