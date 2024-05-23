//var expect = require('chai').expect;
(async () => {
const { expect } = await import('chai');
var getNovenyMW = require('../middleware/noveny/getNoveny');
describe('getNoveny middleware ', function () {
  it('should return noveny', function (done) {
    var req = {};
     var res = { 
        locals: {} 
    };
    var fakeNovenyModel = { find: function (some, cb) {
        cb(undefined, 'noveny')
      } 
    };
    getNovenyMW({
        NovenyModel: fakeNovenyModel
    })(req, res, function (err) {
      expect(res.locals.novenyek).to.eql('noveny');
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

    getNovenyMW({
        novenyModel: fakeNovenyModel
    })({}, {}, function (err) {
        expect(err).to.eql('Database error');
        done();
    });
});
});
});