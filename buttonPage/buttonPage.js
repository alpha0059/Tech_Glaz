let btn = document.querySelector('button');
let x =btn.addEventListener("click", function(){
    if(btn.style.backgroundColor === 'blue'){
        originalColor(x);
    }
    else{
        changeColor(x);
    }
});
function changeColor(x){
    btn.style.backgroundColor = 'blue';
}
function originalColor(){
    btn.style.backgroundColor = 'red';
}