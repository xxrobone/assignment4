
document.querySelector('body').addEventListener('mousemove', eyeball);

 
function eyeball() {
    var eye = document.querySelectorAll('.eye');
    
    eye.forEach(function(eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2( event.pageX - x, event.pageY - y)
        let rotation = (radian * (180 / Math.PI) * -1) + 0; 
        eye.style.transform = "rotate("+ rotation + "deg)";
   })

  /*  console.log(event) */
};

var postition = document.documentElement;
postition.addEventListener('mousemove', e=> {
    postition.style.setProperty('--x', e.clientX + 'px')
    postition.style.setProperty('--y', e.clientY + 'px')
}) 