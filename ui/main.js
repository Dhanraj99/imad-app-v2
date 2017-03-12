var button = document.getElementById('counter');

button.onclick = function(){
    
    var request = XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readysatte === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    request.open('GET','http://dhanraj99.imad.hasura-app.io/counter',true);
    request.send(null);
};