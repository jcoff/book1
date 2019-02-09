(function() {
    jQuery(function($) {

        var playerDom = document.getElementById('playerWrapper')

        var bar = document.getElementById('defaultBar');
        var progressBar = document.getElementById('progressBar');
        var slider = document.getElementById("myRange");
        var barSize = document.getElementById("defaultBar").offsetWidth
        var audio = document.getElementById("audio");
        var sliderDot = document.getElementById("progressDot")

        audio.volume = 0.6;
        slider.value = audio.volume * 10;

        $("#plays_btn").click(function() {
            playOrPause();
        });
        bar.addEventListener('click', clickedBar, false);

        function playOrPause() {
            if (audio.paused == false) {
                audio.pause();
                $("#play_btn").show();
                $("#pause_btn").hide();
                window.clearInterval(updateTime);

            } else {
                audio.play();
                $("#play_btn").hide();
                $("#pause_btn").show();
                updateTime = setInterval(playerUpdate, 500);

            }
        }

        // count function for timeleft

         function timeUpdate() {
            var timeleft = document.getElementById('timeleft'),
                duration = parseInt( audio.duration ),
                currentTime = parseInt( audio.currentTime ),
                timeLeft = duration - currentTime,
                s, m, h;

            h = Math.floor(timeLeft / 3600);
            timeLeft = timeLeft - h * 3600;
            m = Math.floor( timeLeft / 60 )
            timeLeft = timeLeft - m * 60;
            s = timeLeft;

            s = s < 10 ? "0"+s : s;
            m = m < 10 ? "0"+m : m;
            h = h < 10 ? "0"+h : h;

            $('#timeleft').text("-"+h+":"+m+":"+s);
        }

        function playerUpdate() {
            if(!audio.ended){
                timeUpdate();

                var size = parseInt(audio.currentTime*barSize/audio.duration);

                progressBar.style.width = size + 'px';
                sliderDot.style.marginLeft = progressBar.offsetWidth - 7 + "px";
            }
            else {
                $("#play_btn").show();
                $("#pause_btn").hide();

                progressBar.style.width = '0px';
                window.clearInterval(updateTime);
            }

        }

        function clickedBar(e) {
            if(!audio.ended) {
                var mouseX = e.pageX - bar.offsetLeft - playerDom.offsetLeft;
                var newTime = mouseX*audio.duration/barSize;

                audio.currentTime = newTime;
                progressBar.style.width = mouseX + 'px';
                console.log(progressBar.offsetWidth + " - it's offset");
                sliderDot.style.marginLeft = progressBar.offsetWidth - 7 +"px";
            }
        }


        slider.oninput = function() {
            audio.volume = this.value / 10 - 0.1;
            console.log(audio.volume);
        }
    });

})();
