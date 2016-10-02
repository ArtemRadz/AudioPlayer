var audio, volume = 1;

$('#pause').hide();

initAudio($('#playlist li:first-child'));

//Function for initializing Audio
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

	audio = new Audio('media/' + song);

	$('#curtimetext').text('00:00');
	$('#durtimetext').text('00:00');

	$('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);

	$('img.cover').attr('src','img/covers/' + cover);
	
	$('#playlist li').removeClass('active');
    element.addClass('active');
}

//Function for Play Song
function play() {
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
	audio.volume = volume;
}

//Button Play
$('#play').click(function () {
	play();
});

//Button Pause
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});
	
//Button Stop
$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
	seekslider.value = 0;
	$('#pause').hide();
	$('#play').show();
});

//Button Next
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
	play();
});

//Button Prev
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
	play();
});

//Playlist
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	play();
});

//Volume
$('#volume').click(function(){
	volume = this.value / 100;
	audio.volume = volume;
});

//Time
function showDuration(){
	$(audio).bind('timeupdate', function(){
		var nt = audio.currentTime * (100 / audio.duration);
		seekslider.value = nt;
		//Get hours and minutes
		var curmins = parseInt(audio.currentTime / 60);
		var cursecs = parseInt(audio.currentTime - curmins * 60);
		var durmins = Math.floor(audio.duration / 60);
		var dursecs = Math.floor(audio.duration - durmins * 60);
		//Add 0 if seconds less than 10
		if (cursecs < 10)
			cursecs = '0' + cursecs;
		if (curmins < 10)
			curmins = '0' + curmins;
		if(dursecs < 10)
			dursecs = "0" + dursecs;
		if(durmins < 10)
			durmins = "0" + durmins;
		$('#curtimetext').text(curmins + ':' + cursecs);
		$('#durtimetext').text(durmins + ':' + dursecs);
	});
}

//Rewind
$('#seekslider').click(function () {
	seekto = audio.duration * (seekslider.value / 100);
	audio.currentTime = seekto;
});