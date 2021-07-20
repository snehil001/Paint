let shown = false;
let settingsDiv = document.querySelector('#settingsDiv');
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
