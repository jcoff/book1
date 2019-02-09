(function() {
	console.log('hola');

    jQuery(function($) {

        var playerDom = document.getElementById('playerWrapper')

        var bar = document.getElementById('defaultBar');
        var progressBar = document.getElementById('progressBar');


        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");

        var barSize = document.getElementById("defaultBar").offsetWidth

        // bar.addEventListener('click', clickedBar, false);

        //
        var audio = document.getElementById('audio');
        audio.volume = 0.6;
        slider.value = audio.volume * 10;
        console.log(audio.volume);

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
            console.log('playerUpdate func.');
            if(!audio.ended){
                timeUpdate();

                var size = parseInt(audio.currentTime*barSize/audio.duration);

                console.log('some check');
                console.log(size);
                console.log(audio.currentTime);
                progressBar.style.width = size + 'px';
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

                console.log("old time - " + audio.currentTime);
                audio.currentTime = newTime;
                console.log("new time - " + audio.currentTime);
                progressBar.style.width = mouseX + 'px';
            }
        }

        output.innerHTML = slider.value;

        slider.oninput = function() {
            output.innerHTML = this.value;
            audio.volume = this.value / 10 - 0.1;
            console.log(audio.volume);
        }
    });

})();
