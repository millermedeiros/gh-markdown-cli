var expect = require('chai').expect,
    exec = require('child_process').exec
    ;


describe("CLI", function() {
  it ("should work with both --input and UNIX-style argv filename input", function(done) {

    var p = exec('bin/mdown --input "*.md"', function(err, stdout, stderr) {
      if (err) throw err;

      var p2 = exec('bin/mdown *.md', function(err, stdout2, stderr2) {
        if (err) throw err;

        expect(stdout2.length).to.be.above(0);
        expect(stdout.length).to.be.above(0);
        expect(stdout2).to.equal(stdout);
        expect(stderr2).to.equal(stderr);

        done();

      });
    });
  });

  it ("should be compatible with find(1) UNIX-style argv filename input", function(done) {
    this.timeout(10000);

    var p = exec('find tests/ -name "*.md" -exec bin/mdown {} \\;', function(err, stdout, stderr) {
      if (err) throw err;
      var p2 = exec('bin/mdown --input "tests/**/*.md"', function(err, stdout2, stderr2) {
        expect(stdout2.length).to.be.above(0);
        expect(stdout.length).to.be.above(0);
        expect(stdout2).to.equal(stdout);
        expect(stderr2).to.equal(stderr);

        done();
      });
    });
  });
});
