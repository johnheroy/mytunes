describe('SongQueueView', function() {
  var view, fakeSongs;

  beforeEach(function() {
    fakeSongs = new SongQueue([
      {
        artist: 'data',
        url: '/test/testsong.mp3',
        title:'test song'
      },
      {
        artist: 'data',
        url: '/test/testsong2.mp3',
        title:'test song 2'
      }
    ]);
    view = new SongQueueView({collection: fakeSongs});
  });

  it('creates SongQueueEntryViews for each queued song & renders them', function(){
    sinon.spy(SongQueueEntryView.prototype, 'render');
    view.render();
    expect(SongQueueEntryView.prototype.render).to.have.been.called;
  });

  it('renders when add or remove event fires from the song queue collection', function(){
    sinon.spy(SongQueueView.prototype, 'render');
    view.collection.add({
      artist: 'data',
      url: '/test/testsong3.mp3',
      title:'test song 3'
    });
    view.collection.pop();
    setTimeout(function(){
      expect(view.render).to.have.been.called;
    }, 0);
  });

  it('dequeues a song when the user clicks on it', function(){
    expect(view.collection.length).to.be.equal(2);
    view.$el.children().first().click();
    setTimeout(function(){
      expect(view.collection.length).to.be.equal(1);
    }, 0);
  });

});
