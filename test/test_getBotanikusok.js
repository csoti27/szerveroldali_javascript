//var expect = require('chai').expect;
(async () => {
    const { expect } = await import('chai');
    var getBotanikusokMW = require('../middleware/botanikus/getBotanikusok');
    describe('getBotanikusok middleware ', function () {
      it('should multiple botanikus', function (done) {
        var req = {};
         var res = { 
            locals: {} 
        };
        var fakeBotanikusModel = { find: function (some, cb) {
            cb(undefined, ['botanikus1','botanikus2'])
          } 
        };
        getBotanikusokMW({
            BotanikusModel: fakeBotanikusModel
        })(req, res, function (err) {
          expect(res.locals.botanikusok).to.eql(['botanikus1','botanikus2']);
          expect(err).to.eql(undefined);
          done();
        });
      });
    
      it('should return error when db returns error', function (done) {
        var fakeNovenyModel = {
            find: function (some, cb) {
                cb('Database error', undefined)
            }
        };
    
        getBotanikusokMW({
            BotanikusModel: fakeBotanikusModel
        })({}, {}, function (err) {
            expect(err).to.eql('Database error');
            done();
        });
    });
    });
    });