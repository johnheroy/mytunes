// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    if (window.localStorage.getItem('queue')) {
      var localQueue = JSON.parse(window.localStorage.getItem('queue'));
      localQueue = localQueue.map(function(item){
        return params.library.findWhere({url: item.url});
      });
      localQueue.forEach(function(song){
        this.get('songQueue').add(song);
      }, this);
    }

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song) {
      this.get('songQueue').add(song);
      window.localStorage.setItem('queue', JSON.stringify(this.get('songQueue')));
    }, this);

  }

});
