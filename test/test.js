const  chai = require('chai')
const chaiHttp = require('chai-http')
const servidor = require('../index.js')

chai.use(chaiHttp)



describe('Probando API REST con Mocha - Chai', ()=>{
    it('La ruta /deportes devuelve un JSON con la propiedad deportes y es un arreglo', ()=>{
        chai.request(servidor)
        .get('/deportes')
        .end((error,res)=>{
            let data = JSON.parse(res.text)
            chai.expect(data).to.have.property('deportes')
            chai.expect(data.deportes).to.be.an('array')
        })
    })
})