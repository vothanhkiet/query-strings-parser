const expect = require('chai').expect
const filter = require('../../lib/mapper/filters')


describe('QueryString: Filters', function () {

    context('when query filters are string/number parameters', function () {
        it('should return a JSON with filters params', function (done) {
            verify(filter.filters({ name: 'lucas', age: '30' }, default_options))
            done()
        })
    })

    context('when query filters key contains blank space', function () {
        it('should return a JSON with filters params, ignoring blank spaces', function (done) {
            verify(filter.filters({ ' na  me   ': 'lucas', age: '30' }, default_options))
            done()
        })
    })

    context('when query filters key contains special characteres', function () {
        it('should return a JSON with filters params, ignoring the special characteres', function (done) {
            verify(filter.filters({ '#(@@$na%me!?': 'lucas', age: '30' }, default_options))
            done()
        })
    })

    context('when use the default options without query', function () {
        it('should return a JSON with default filters params', function (done) {
            const result = filter.filters({}, default_options)
            expect(result).to.eql(default_options.default.filters)
            done()
        })
    })
})

function verify(result) {
    expect(result).to.have.property('name')
    expect(result).to.have.property('age')
    expect(result.name).to.eql('lucas')
    expect(result.age).to.eql(30)
}