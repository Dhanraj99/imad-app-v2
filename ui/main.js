var button = document.getElementById('counter');
counter = 0;
button.onclick = function(){
    
    //make a req 
    //Capture res
    //Store in var
    //Render var
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};