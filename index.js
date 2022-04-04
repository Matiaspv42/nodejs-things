const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000


const servidor = 

app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})

app.get('/', (req,res)=>{
    res.setHeader('Content-type', 'text/html')
    fs.readFile('index.html','utf8',(err, html)=>{
        res.end(html)
    })
})

app.get('/deportes', (req,res)=>{
    fs.readFile('deportes.json', 'utf8', (err,data)=>{
        res.end(data)
    })
})

app.use('/agregar', express.json())

app.post('/agregar', (req,res)=>{
    const {nombre, precio} = req.body;
    if(nombre == ''|| precio ==''){
        res.statusCode = 400;
        res.statusMessage = 'Error en los parametros';
        res.end()
    }else{
        fs.readFile('deportes.json', 'utf8', (err,data)=>{
            const deportes = JSON.parse(data).deportes;
            deportes.push({
                nombre,
                precio
            })
            fs.writeFile('deportes.json', JSON.stringify({deportes}), (error,data)=>{
                error? console.log('error'): console.log('correcto');
                res.end('Deporte agregado con éxito')
            });
        });
    }
  
})

app.use('/editar', express.json())

app.use('/editar', (req,res)=>{
    const {nombre,precio} = req.body;
    if(nombre == ''|| precio ==''){
       res.statusCode= 400;
       res.statusMessage = 'Error en los parametros';
       res.end()
    }else{
        fs.readFile('deportes.json', 'utf8', (err,data)=>{
            let deportes = JSON.parse(data).deportes;
            deportes = deportes.map((deporte)=> {
                if(deporte.nombre === nombre ){
                    deporte.precio = precio
                    return deporte
                }else{
                    return deporte
                }
            })
            fs.writeFile('deportes.json', JSON.stringify({deportes}),(error,data)=>{
                error? console.log('error'): console.log('correcto');
                res.end('Deporte modificado con éxito')
            })
        })
    }
})
app.delete('/eliminar', (req,res)=>{
    const {nombre} = req.query;
    fs.readFile('deportes.json', 'utf8', (err,data)=>{
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.filter((dep)=> dep.nombre !== nombre)

        fs.writeFile('deportes.json', JSON.stringify({deportes}), (error,data)=>{
            error? console.log('error'): console.log('correcto');
            res.end('Deporte eliminado con éxito')
        });
    });
})

module.exports = servidor;