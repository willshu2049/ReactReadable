export default app => {
    app.get('/', (res, req, next)=>{
        res.send({hi: 'there'});
    })
}