// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){

    this.on('add', function(){
      if (this.length === 1){
        this.playFirst();
      }
    });

    this.on('remove', function(){
      if (this.length > 0){
        this.playFirst();
      }
    });

    this.on('ended', function(){
      this.shift();
      window.localStorage.setItem('queue', JSON.stringify(this));
    });

    this.on('dequeue', function(song){
      this.remove(song);
      window.localStorage.setItem('queue', JSON.stringify(this));
    });

  },

  playFirst: function(){
    var song = this.at(0);
    setTimeout(function(){
      song.play();
    }, 0);
  }

});
