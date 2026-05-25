function $(id){
  return document.getElementById(id);
}

function calc(){

  let weight = +$('weight').value;
  let height = +$('height').value;
  let age = +$('age').value;
  let activity = +$('activity').value;

  // Harris Benedict
  let tmb =
    88.362 +
    (13.397 * weight) +
    (4.799 * height) -
    (5.677 * age);

  let tdee = tmb * activity;

  // macros
  let protein = (tdee * 0.25) / 4;
  let carbs   = (tdee * 0.50) / 4;
  let fats    = (tdee * 0.25) / 9;

  let max = Math.max(protein, carbs, fats);

  $('target').innerText = Math.round(tdee);

  $('tmb').innerText = Math.round(tmb);
  $('tdee').innerText = Math.round(tdee);

  $('pgrams').innerText = Math.round(protein) + ' g';
  $('cgrams').innerText = Math.round(carbs) + ' g';
  $('fgrams').innerText = Math.round(fats) + ' g';

  $('pbar').style.width = (protein/max)*100 + '%';
  $('cbar').style.width = (carbs/max)*100 + '%';
  $('fbar').style.width = (fats/max)*100 + '%';

  // guardar
  localStorage.setItem('metabolic', JSON.stringify({
    weight,
    height,
    age,
    activity
  }));

}

['weight','height','age','activity']
.forEach(id=>{
  $(id).addEventListener('input',calc);
});

window.onload = ()=>{

  let data = JSON.parse(localStorage.getItem('metabolic'));

  if(data){

    $('weight').value = data.weight;
    $('height').value = data.height;
    $('age').value = data.age;
    $('activity').value = data.activity;

  }

  calc();
}
