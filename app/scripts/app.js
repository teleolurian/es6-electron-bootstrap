$ = require('./helpers')

module.exports = function(){
  console.log("Loaded.")
  $('h1')[0].textContent = "LOADED APP"
}
