var personIndex;
var people = []
var assets = []
var person;
var personImage;

fetch("https://cdn.contentful.com/spaces/eq7v79j9q2bj/entries?access_token=002313db02188f7993bf8e6f0c498c5dca85d796115c35908738242d9808cc92&content_type=team")
  .then(resp => resp.json())
  .then(data => {
    people = data.items
    assets = data.includes.Asset
  })

var showName = function(e) {
  document.getElementById('rocketeer').innerHTML = `${person.fields.name}`;
};

var showImage = function(e) {
  document.getElementById('rocketeer-img').style.backgroundImage = '';
  document.getElementById('rocketeer').innerHTML = '';
  personIndex = Math.floor(Math.random() * people.length);
  person = people[personIndex];
  personImage = assets.find(asset => person.fields.profilePic.sys.id === asset.sys.id);
  e.target.classList.add('loading');
  e.target.setAttribute('disabled','disabled');
  setTimeout(function(){
    e.target.classList.remove('loading');
    e.target.removeAttribute('disabled');
    var personImageSelector = document.getElementById('rocketeer-img')
    personImageSelector.style.backgroundImage = `url('${personImage.fields.file.url}')`;
    personImageSelector.addEventListener('click', showName);
  },1000);
}

document.querySelectorAll('button')[0].addEventListener('click',showImage);
