var counter = 0;
app.get('/counter', function(req,res){
    counter = counter +1;
    res.send(counter.toString());
});