<template>
    <div class="player">
        <div class="progress">
            <vue-slider v-model="setProgress" :dotSize="0" :height="'0.6rem'" :clickable="false" :tooltip="'none'" :duration="0"></vue-slider>
        </div>

        <div class="player__content">
            <div class="set">
                <div class="set__logo">
                    <img :src="playlist.imageUrl" alt="">
                </div>
                <div class="set__info">
                    <div class="artist" v-show="media.artistTitle">
                        <div class="artist__set" :title="set.title">{{set.title}}</div>
                        <div class="artist__genre">{{playlist.title}}</div>
                        <div class="artist__track">
                            <span class="artist-name">
                                {{media.artistTitle}}
                                <span v-if="media.coartists && media.coartists.length">
                                    <span v-for="(coartist, index) in media.coartists" :key="index">&amp; {{coartist.title}} </span>
                                </span>
                            </span>
                            <span> — </span>
                            <span class="track-name">{{media.title}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls__buttons">
                    <button class="controls__button controls__button_prev" :disabled="isFirstPlaylist || notLoaded" @click.prevent="previous">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 14 13"><g><g><path d="M14 11.828V.488c0-.374-.387-.609-.698-.423l-9.565 5.67a.487.487 0 0 0-.237.421V1.254C3.5.561 2.972 0 2.319 0H1.18C.53 0 0 .562 0 1.253v10.494C0 12.438.53 13 1.181 13H2.32c.653 0 1.181-.562 1.181-1.253V6.16c0 .164.08.328.237.42l9.565 5.671c.311.185.698-.049.698-.423z"/></g></g></svg>
                    </button>
                    <button class="controls__button controls__button_play-pause" :disabled="notLoaded" :class="{'playing': playing}" @click.prevent="togglePlay">
                        <svg class="svg-play" xmlns="http://www.w3.org/2000/svg" width="48" height="54" viewBox="0 0 24 27"><g><g><path d="M0 25.61V1.057C0 .247.886-.261 1.597.14L23.46 12.417c.72.404.72 1.428 0 1.833L1.597 26.527c-.71.4-1.597-.108-1.597-.917z"/></g></g></svg>
                        <svg class="svg-pause" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
                            <g>
                            </g>
                            <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z"/>
                            <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z"/>
                        </svg>
                    </button>
                    <button class="controls__button controls__button_next" :disabled="isLastPlaylist || notLoaded" @click.prevent="next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 14 13"><g><g><path d="M0 11.828V.488C0 .113.387-.122.698.064l9.565 5.67a.487.487 0 0 1 .237.421V1.254C10.5.561 11.028 0 11.681 0h1.138C13.47 0 14 .562 14 1.253v10.494c0 .691-.53 1.253-1.181 1.253H11.68c-.653 0-1.181-.562-1.181-1.253V6.16c0 .164-.08.328-.237.42L.698 12.252c-.311.185-.698-.049-.698-.423z"/></g></g></svg>
                    </button>
                </div>
            </div>

            <div class="options">
                <div class="options__option options__option_time">
                    <div class="time">
                        <span class="time__value time__value_current">{{progress.trackCurrentTime}}</span>
                        <span> / </span>
                        <span class="time__value time__value_full">{{trackDuration}}</span>
                    </div>
                </div>
                <div class="options__option options__option_queue">
                    <div class="queue-button" :class="{'queue-button_active': showQueue}" @click="toggleQueue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" viewBox="0 0 25 17"><g><g><g><g><path fill="none" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M23.264 5.795H1.64"/></g><g><path fill="none" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M13.816 10.435H1.64"/></g><g><path fill="none" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M13.816 15.075H1.64"/></g><g><path fill="none" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M23.264 1.165H1.64"/></g></g><g><path d="M17 17l7-4-7-4z"/></g></g></g></svg>
                    </div>
                    <transition name="fade-in-up">
                        <queue v-show="showQueue"
                                :set="set"
                                :toggleQueue="toggleQueue"
                                :currentPlaylist="playlist"
                                :currentTrack="media"
                                :playlistQueue="playlistQueue"
                                :trackQueue="trackQueue">
                        </queue>
                    </transition>
                    <transition name="fade-in">
                        <div class="queue-arrow" v-show="showQueue"></div>
                    </transition>
                </div>
                <div class="options__option options__option_volume">
                    <div class="volume">
                        <div class="volume__button" @click="toggleMute" :class="{'muted' : isMuted}">
                            <svg class="non-muted" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g><g><path fill="#fff" d="M9.55 0L3.006 4.586H.55v6.182h2.456l6.544 4.586z"/></g><g><path fill="none" stroke="#fff" stroke-miterlimit="50" d="M12 12c1.657 0 3-2.015 3-4.5S13.657 3 12 3"/></g></g></svg>
                            <svg class="muted" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 17 17"><g><g><path fill="#fff" d="M3.772 12.305l-.766-.537H.55V5.586h2.456L9.55 1v5.574m0 1.949v7.831l-4.535-3.178"/></g><g><path fill="none" stroke="#fff" stroke-miterlimit="50" d="M12 13c1.657 0 3-2.015 3-4.5S13.657 4 12 4"/></g><g><path fill="none" stroke="#fff" stroke-linecap="square" stroke-miterlimit="50" d="M.8 15.25L15.3.75"/></g></g></svg>
                        </div>
                        <div class="volume__bar">
                            <vue-slider v-model="volume" :dotSize="12" :height="'100%'" :tooltip="'none'" :duration="0.0"></vue-slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <audio id="audio" ref="audio" controls></audio>
    </div>
</template>

<script>
import Hls from 'hls.js';
import { keys } from '@/config/constants';
import TimeFormat from 'hh-mm-ss';
import hlsConfig from '@/config/hls-config';
import Queue from './blocks/Queue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
    name: "Player",
    components: {
        Queue,
        VueSlider
    },
    data() {
        return {
            player: {},
            hls: {},
            volume: parseFloat(localStorage.getItem(keys.volume.local)) || 100,
            playing: false,
            muted: false,
            showQueue: false,
            set: {},
            playlist: {},
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
            }
        }
    },
    computed: {
        notLoaded() {
            return !this.set.id
        },
        currentPlaylistPlayedTracksTime() {
            let time = 0;
            for (let i = 0; i < this.progress.trackIndex; i++) {
                time += this.trackDurations[i];
            }
            return time
        },
        setProgress() {
            return this.progress.playlistsProgress + this.progress.tracksProgress;
        },
        isMuted() {
            return this.volume === 0 || this.muted
        },
        trackDuration() {
            return TimeFormat.fromS(TimeFormat.toS(this.media.duration), 'mm:ss') || '--:--'
        },
        isLastPlaylist() {
            return this.set.playlists
                && this.set.playlists.length
                && (this.set.playlists.length - 1 === this.progress.playlistIndex)

        },
        isFirstPlaylist() {
            return this.progress.playlistIndex === 0
        },
        playlistQueue() {
            if (this.set.playlists && this.set.playlists.length) {
                return this.set.playlists.slice(this.progress.playlistIndex + 1)
            } else {
                return []
            }
        },
        trackQueue() {
            if (this.trackList && this.trackList.length) {
                return this.trackList.slice(this.progress.trackIndex + 1)
            } else {
                return []
            }
        }
    },
    mounted() {
        this.initPlayer(hlsConfig);
    },
    methods: {
        initPlayer(config) {
            let self = this;

            if (Hls.isSupported()) {
                self.player = self.$refs.audio;
                self.volume = parseFloat(localStorage.getItem(keys.volume.local)) === 0 ? 0 : parseFloat(localStorage.getItem(keys.volume.local)) || 100;

                self.hls = new Hls(config);
                self.hls.attachMedia(self.player);

                // $(window).on('keypress', (e) => {
                //     if (e.key === ' ' || e.key === 'Spacebar') {
                //         self.togglePlay();
                //     }
                // });
                self.hls.on(Hls.Events.ERROR, function (event, data) {
                    let errorType = data.type;

                    if (errorType === Hls.ErrorTypes.MEDIA_ERROR) {
                        self.retry();
                    }
                });

                $(self.player)
                    .on('timeupdate', () => {
                        let playerCurrentTime = Math.floor(self.player.currentTime);
                        self.progress.trackCurrentTime = TimeFormat.fromS(playerCurrentTime, 'mm:ss');
                        self.progress.tracksProgress = (playerCurrentTime + self.currentPlaylistPlayedTracksTime) / TimeFormat.toS(self.set.duration) * 100;
                    })
                    .on('ended', () => self.playNextTrack())
            }
        },
        playSet(set) {
            this.set = set;
            this.progress.playlistsProgress = 0;
            this.progress.playlistIndex = 0;
            this.playPlaylist(this.progress.playlistIndex);
            this.set.playlists.forEach(playlist => this.playlistDurations.push(TimeFormat.toS(playlist.duration)));
        },
        playPlaylistAsSet(playlist) {
            this.playSet({
                duration: playlist.duration,
                id: 4444000000000000,
                playlists: [playlist],
                title: ""
            });
        },
        playPlaylist(playlistIndex) {
            let self = this;
            if (self.set.playlists[playlistIndex] === undefined) {
                return;
            }
            self.playlist = self.set.playlists[playlistIndex];
            self.$http.post('/playlist/media', {id: self.playlist.id}).then(response => {
                if (200 === response.status) {
                    self.trackList = response.data.body['list'];
                    self.progress.trackIndex = 0;
                    self.playMedia(self.trackList[0]);
                    self.trackDurations = [];
                    self.trackList.forEach(track => self.trackDurations.push(TimeFormat.toS(track.duration)));
                }
            })
        },
        playMedia(media) {
            let self = this;
            self.media = media;
            self.hls.loadSource(self.media.m3U8Link);
            self.hls.attachMedia(this.player);
            self.hls.once(Hls.Events.MANIFEST_PARSED, () => {
                self.play();
            });
        },
        playNextTrack() {
            this.pause();
            this.hls.detachMedia();

            if (this.progress.trackIndex + 1 < this.trackList.length) {
                this.playMedia(this.trackList[++this.progress.trackIndex]);
            } else if (this.progress.playlistIndex + 1 < this.set.playlists.length) {
                this.next();
            }
        },
        togglePlay() {
            this.player.paused ? this.play() : this.pause();
        },
        toggleMute() {
            if (this.player.volume === 0) {
                this.player.volume = this.volume / 100;
                this.muted = false;
            } else {
                this.player.volume = 0;
                this.muted = true;
            }
        },
        toggleQueue() {
            if (!this.showQueue && !Object.keys(this.set).length) {
                return;
            }
            this.showQueue = !this.showQueue;
        },
        play() {
            if (this.set.playlists && this.set.playlists.length) {
                this.player.play()
                    .then(() => {
                        this.playing = true;
                    })
                    .catch(() => {
                        this.retry();
                    })
            }
        },
        pause() {
            this.playing = false;
            this.player.pause();
        },
        next() {
            if (this.set.playlists && this.set.playlists.length) {
                this.goToPlaylist(this.progress.playlistIndex + 1);
            }
        },
        previous() {
            if (this.set.playlists && this.set.playlists.length) {
                this.goToPlaylist(this.progress.playlistIndex - 1);
            }
        },
        goToPlaylist(index) {
            this.pause();
            this.progress.playlistIndex = index;
            this.playPlaylist(this.progress.playlistIndex);
            this.emplaceProgress();
        },
        emplaceProgress() {
            let currentProgress = 0;
            for (let i = 0; i < this.progress.playlistIndex; i++) {
                currentProgress += this.playlistDurations[i];
            }
            this.progress.playlistsProgress = currentProgress / TimeFormat.toS(this.set.duration) * 100;
        },
        destroy() {
            this.hls.destroy();
            // $(window).off('keypress');
            $(this.player).off('timeupdate');
            this.player.pause();
            this.playing = false;
        },
        retry() {
            this.destroy();
            this.initPlayer(hlsConfig);
            this.playMedia(this.media);
        }
    },
    watch: {
        volume(value) {
            this.player.volume = value / 100;
            localStorage.setItem(keys.volume.local, value);
            if (value > 0) {
                this.muted = false;
            }
        }
    },
    beforeDestroy() {
        this.destroy();
    }
}
</script>

