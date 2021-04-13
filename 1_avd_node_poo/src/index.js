const { response, request, query } = require('express');
const express =  require('express');
const app =  express ();
const { v4: uuidv4 }= require("uuid");
app.use(express.json())

const  faculdade = [
    {  diadasemana: "segunda-feira", datadaavd: "10/04/2021", disciplina: "LPW", horario: "10:00",professor: " Carlos" },
    {  diadasemana: "quinta feira", datadaavd: "03/05/2021", disciplina: "NODEJS", horario: "8:00",professor: "Antonio" },

]

app.use((request, response, next) => {
    return next()
})

const faculdadeNaoExiste = (request, response, next) => {
    const { id } = request.params 
    
    
   
    if( !faculdade[id]){ 
        return response
        .status(400)
        .json({ error: 'Não existe data da prova com esse id' })
    }
    return next()
}


const faculdadeRequisicao = ( request, response, next) => {
    if( !request.body.datadaavd || !request.body.horario || !request.body.professor || !request.body.diadasemana || !request.body.disciplina) {
        return response
        .status(400)
        .json({ error: 'O campo datadaavd , horario , professor , diadasemana ou disciplina não existe no corpo da requisição!'})
    }
    return next()
}

 
 app.get('/faculdade', (request, response) => {
   return response.json(faculdade)
    
}) 

//-------------------------------//--------------------------------------------------//--------------//


app.get('/datadaavd/:index', (request, response) => {
    const { index } = request.params 

    if (index < faculdade.length){

        return response.json(faculdade[index])
    }else{
        return response.json({error: 'Não existe data da prova com este id.'})
    }
})

app.post('/faculdade', faculdadeRequisicao, (request, response) => {
    const { datadaavd, horario, professor, diadasemana, disciplina} = request.body

    const facul = {
        datadaavd,
        id: uuidv4(),
        horario,
        professor,
        diadasemana,
        disciplina
    }
    faculdade.push(facul)
    return response.json(faculdade)
})

app.put('/faculdade/:id',faculdadeRequisicao,faculdadeNaoExiste, (request, response) => {
    const { id } =  request.params

    const {diadasemana, datadaavd, disciplina, horario, professor} = request.body

    const facul  = {
        diadasemana,
        id: uuidv4(),
        datadaavd,
        disciplina,
        horario,
        professor
    }

    faculdade[id] = facul
    return response.json(faculdade)
}) 

 app.delete('/faculdade/:id',faculdadeNaoExiste, (request, response) => {
    const { id } =  request.params
    faculdade.splice(id, 1) 
   
    return response.json(faculdade)
}) 

app.get('/professor', (request, response) => {
    const professor = request.query.name

 

      return response.json({
        professor, 
        professor:datadaavd,
        professor:diadasemana,
        professor:horario,
        professor:disciplina
    })  
})


app.listen(3939,() => {
    console.log('1_avd_rodando')
})