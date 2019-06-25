<template>
    <div class="layout">
        <div class="layout__content">
            <div id="main">
                <main class="main">
                    <section class="section section_full top">
                        <div class="top-img">
                            <div class="top-img__img top-img__img_main"></div>
                            <div class="top-img__img top-img__img_w"></div>
                            <div class="top-img__img top-img__img_w2"></div>
                            <div class="top-img__text"></div>
                        </div>
                        <div class="content content_top">
                            <h3 class="title title_lg">Testing.</h3>
                            <img src="/img/avt.png" alt="" class="title_logo">
                            <h5 class="title title_sm">!</h5>
                            <button class="btn btn_slg" @click="play">
                                <span class="btn__text">
                                    Test
                                    <span v-show="!loading" class="play" :class="{'playing': playing}"></span>
                                    <span v-show="loading" class="loader"></span>
                                </span>
                            </button>
                        </div>
                    </section>
                </main>

                <audio id="audio" ref="audio"></audio>
            </div>
        </div>
    </div>
</template>

<script>
import Hls from 'hls.js';
import { keys } from '@/config/constants';
import hlsConfig from '@/config/hls-config';

export default {
    name: 'MainPage',
    components: {

    },
    data() {
        return {
            loading: false,
            playing: false,
            sets: [],
            set: {},
            muted: false,
            progress: {
            playlistsProgress: 0,
                tracksProgress: 0,
                playlistIndex: 0,
                trackIndex: 0,
                trackCurrentTime: '00:00'
            },
            playlistDurations: [],
                trackList: [],
                trackDurations: [],
                media: {
                duration: '00:00:00'
            },
            nativeSupport: false
        }
    },
    methods: {
        initPlayer(config) {
            let self = this;
            self.player = self.$refs.audio;

            if (Hls.isSupported()) {
                self.volume = parseFloat(localStorage.getItem(keys.volume.local)) === 0 ? 0 : parseFloat(localStorage.getItem(keys.volume.local)) || 100;

                self.hls = new Hls(config);
                self.hls.attachMedia(self.player);
                self.hls.on(Hls.Events.ERROR, function (event, data) {
                    let errorType = data.type;

                    if (errorType === Hls.ErrorTypes.MEDIA_ERROR) {
                        self.retry();
                    }
                });
            } else if (document.getElementById('audio').canPlayType('application/vnd.apple.mpegurl')) {
                self.nativeSupport = true;
            }

            $(self.player).on('ended', () => {
                self.playNextTrack();
            })
        },
        playSet(set, trackIndex, trackSecond) {
            this.set = set;
            this.progress.playlistsProgress = 0;
            this.progress.playlistIndex = 0;
            this.playPlaylist(this.progress.playlistIndex, trackIndex, trackSecond);
        },
        playPlaylistAsSet(playlist) {
            this.playSet({
                duration: playlist.duration,
                id: 4444000000000000,
                playlists: [playlist],
                title: ""
            });
        },
        playStreamlist(streamlist) {
            this.playSet(
                {
                    duration: streamlist.playlist.duration,
                    id: 4444000000000000,
                    playlists: [streamlist.playlist],
                    title: ""
                },
                streamlist.currentPlayMediaPosition - 1,
                streamlist.currentPlayMediaSecond
            );
        },
        playPlaylist(playlistIndex, trackIndex, trackSecond) {
            let self = this;
            if (self.set.playlists[playlistIndex] === undefined) {
                self.showErrorMessage('empty playlist');
                return;
            }
            self.playlist = self.set.playlists[playlistIndex];
            self.$http.post('/playlist/media', {id: self.playlist.id, limit: 555}).then(response => {
                if (200 === response.status) {
                    self.trackList = response.data.body['list'];
                    self.progress.trackIndex = trackIndex;
                    self.playMedia(self.trackList[trackIndex], trackSecond);
                    self.trackDurations = [];
                }
            })
        },
        playMedia(media, trackSecond) {
            let self = this;
            self.media = media;
            if (!this.nativeSupport) {
                self.hls.loadSource(self.media.m3U8Link);
                self.hls.attachMedia(this.player);
                self.hls.once(Hls.Events.MANIFEST_PARSED, () => {
                    if (trackSecond) {
                        self.player.currentTime = trackSecond;
                    }
                    self.player.play();
                    self.playing = true;
                    self.loading = false;
                });
            } else {
                self.player.src = self.media.m3U8Link;
                self.player.addEventListener('loadedmetadata',function() {
                    if (trackSecond) {
                        self.player.currentTime = trackSecond;
                    }
                    self.player.play();
                    self.playing = true;
                    self.loading = false;
                }, {once: true});
            }
        },
        playNextTrack() {
            this.hls.detachMedia();
            if (this.progress.trackIndex + 1 < this.trackList.length) {
                this.playMedia(this.trackList[++this.progress.trackIndex]);
            } else if (this.progress.playlistIndex + 1 < this.set.playlists.length) {
                self.playPlaylist(0, 0, 0);
            }
        },
        play() {
            if (this.playing) {
                this.playing = false;
                this.player.pause();
            } else {
                this.getStreamlistAndGo();
                this.playing = true;
            }
        },
        showErrorMessage() {
            //todo
        },
        destroy() {
            this.hls.destroy();
            $(this.player).off('timeupdate');
            this.player.pause();
            this.playing = false;
        },
        retry() {
            this.destroy();
            this.initPlayer(hlsConfig);
            this.playMedia(this.media);
        },
        getStreamlistAndGo() {
            this.loading = true;
            this.$http.post('/streamlist/list', {id: [4], limit: 555})
                .then(response => {
                    this.playStreamlist(response.data.body.list[0]);
                })
        }
    },
    mounted() {
        this.initPlayer(hlsConfig);
        this.$store.dispatch('logout').then(() => {
            this.$store.dispatch('login').then(() => {
            }).catch(() => {});
        });
    }
}
</script>

<style>

</style>