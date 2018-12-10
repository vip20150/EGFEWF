$(function(){
 
  
  $('audio,video').mediaelementplayer({
      success: function(player, node) {
        //player.mediaelement.load();  
        player.addEventListener('ended', function(e){
              //alert('done!');
            	//alert(event.target.id);
            
              if (event.target.id == 'mejs') {
                console.log('first stopped');
                $('#mejs1')[0].player.media.load(); // fixes mystery error in chrome of Failed to load resource: net::ERR_CONTENT_LENGTH_MISMATCH
                $('#mejs1')[0].player.media.play();
                console.log('will start second');
              } else if (event.target.id == 'mejs1') {
                console.log('second stopped playing');
                $('#mejs2')[0].player.media.load();
                $('#mejs2')[0].player.media.play();
                console.log('will start third');
              } else if (event.target.id == 'mejs2') {
                console.log('third stopped');
                $('#mejs3')[0].player.media.load();
                $('#mejs3')[0].player.media.play();
                console.log('will start fourth');
              } else if (event.target.id == 'mejs3') {
                console.log('fourth stopped');
                //$('#mejs')[0].player.media.load(); // loops the playlist
                //$('#mejs')[0].player.media.play();
              }

          });
      }
  });
  
  

  //$('#mejs1')[0].player.media.play(); //autoplay

  	
});
