var HTTP = require('../services/httpService');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
    listenables: [Actions],
    
    getIngredients: function () {
        HTTP.get('/gfs').then(function (json) {
          this.ingredients = json;     
          this.fireUpdate();     
        }.bind(this));
    },
    
    postIngredient: function (text) {
        if (!this.ingredients){
            this.ingredients = [];
        }
        
        var ingredient = {
            "tipo": text,
            "id": Math.floor(Date.now/1000)+ text    
        };
        
        this.ingredients.push(ingredient);
        this.fireUpdate();
        
        HTTP.post('/gfs', ingredient)
        .then(function (response){
            this.getIngredients();
        }.bind(this));
    },
    
    fireUpdate: function () {
        this.trigger('change', this.ingredients);
    }
});

module.exports = IngredientStore;