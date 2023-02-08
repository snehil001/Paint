let shown = false;
let settingsDiv = document.querySelector('.menu');

function showHideSettings(){
  if(shown){
    settingsDiv.style.display = 'none';
    shown = false;
  }
  else{
    settingsDiv.style.display = 'block';
    shown = true;
  }
}
