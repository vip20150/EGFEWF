angular.module('playerDemo', [])
.directive('player', ['$interval', function($interval){
  function zp(number){
    if(number < 10){
      return '0' + number;
    }
    return number;
  }
  return {
    templateUrl: 'audio-player.html',
    replace: true,
    restrict: 'E',
    scope: {
      src: '@'
    },
    link: function(scope, element, attrs, controller){
      element.prop('controls', false);
      var audio = new Audio(attrs.src);
      scope.trackName = attrs.src.split('/').pop();
      scope.audio = audio;
      scope.playing = false;
      scope.play = function(){
        scope.playing = true;
        audio.play();
      }
      
      function updatePostion(currentTime){
          var minutes = Math.round(currentTime / 60);
          var seconds = Math.round(currentTime) % 60;
          scope.position = zp(minutes) + ':' + zp(seconds);
      }

      updatePostion(0);
      audio.addEventListener('timeupdate', function(){
        scope.$apply(function(){
          updatePosition(audio.currentTime);
                  
        

          scope.ratio = audio.currentTime / audio.duration;
        
        });
      });
      audio.addEventListener('ended', function(){
        scope.$apply(function(){
                  audio.currentTime = 0;
                  scope.playing = false;
        });
      });
      scope.stop = function(){
        audio.pause();
        scope.playing = false;        
      }
    }
  };
}])
