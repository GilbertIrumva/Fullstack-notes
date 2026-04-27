const http=  require('http')



const app=http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'Application/json'})

    response.end(JSON.stringify())
})

const PORT= 8088
app.listen(PORT)
console.log(`Server is running on ${PORT}`)