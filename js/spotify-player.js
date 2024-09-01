window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'ef80da85d9a3480698ac2a67280bd9fd'; // Replace with your access token
    const player = new Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', e => console.error(e));
    player.addListener('authentication_error', e => console.error(e));
    player.addListener('account_error', e => console.error(e));
    player.addListener('playback_error', e => console.error(e));

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', data => {
        const { device_id } = data;

        // Playback controls
        document.getElementById('play').addEventListener('click', () => {
            player.togglePlay().then(() => {
                console.log('Toggled play/pause!');
            });
        });

        document.getElementById('pause').addEventListener('click', () => {
            player.pause().then(() => {
                console.log('Paused!');
            });
        });

        document.getElementById('next').addEventListener('click', () => {
            player.nextTrack().then(() => {
                console.log('Skipped to next track!');
            });
        });

        document.getElementById('prev').addEventListener('click', () => {
            player.previousTrack().then(() => {
                console.log('Skipped to previous track!');
            });
        });
    });

    // Connect to the player!
    player.connect();
};
