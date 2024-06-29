const chai = require('chai');
const chaiHttp = require('chai-http');
const mockServer = require('../server/server');

chai.use(chaiHttp);
chai.should();

describe("API Tests", () => {
	describe('POST /bid', () => {
		it('should return prerequired MOCK data', (done) => {
			const request = {}

			chai.request(mockServer)
				.post('/bid')
				.send(request)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('cpm').eql(1.5);
					res.body.should.have.property('width').eql(200);
					res.body.should.have.property('height').eql(150);
					res.body.should.have.property('ad').to.be.a('string')
					res.body.should.have.property('ttl').eql(300);
					res.body.should.have.property('creativeId').eql('sample_creative');
					res.body.should.have.property('netRevenue').to.be.true;
					res.body.should.have.property('currency').eql('USD');
					res.body.should.have.property('adId').eql('unique-ad-id-12345');
					done()
				})
		})
	})
})