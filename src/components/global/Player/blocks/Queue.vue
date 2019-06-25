<template>
    <div class="queue">
        <div class="queue__header">
            <div class="queue__title" :title="set.title" v-if="realSet">
                <span>{{$t('set')}} </span>
                <span>&laquo;</span>
                <span>{{set.title}}</span>
                <span>&raquo;</span>
            </div>
            <div class="queue__title" :title="set.playlists[0].title" v-else>
                <span>{{$t('playlist')}} </span>
                <span>&laquo;</span>
                <span>{{set.playlists[0].title}}</span>
                <span>&raquo;</span>
            </div>
            <div class="queue__close" @click="toggleQueue">
                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 34 34"><g><g><g><path stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M1 1l32 32"/></g><g><path stroke-linecap="round" stroke-miterlimit="50" stroke-width="2" d="M33 1L1 33"/></g></g></g></svg>
            </div>
        </div>
        <div class="queue__body">
            <div class="queue-col queue-col_playlists playlists" v-if="realSet">
                <div class="queue-col__title">{{$t('playlists')}}</div>
                <div class="playing-now playing-now_playlist">
                    <div class="queue-col__caption">{{$t('playingNow')}}</div>
                    <div class="playlist playlist_active">
                        <img class="playlist__img" :src="currentPlaylist.imageUrl" alt=""/>
                        <div class="playlist__text">
                            <div class="playlist__title" :title="currentPlaylist.title">{{currentPlaylist.title}}
                            </div>
                            <div class="playlist__duration">{{currentPlaylist.duration}}</div>
                        </div>
                        <div class="play-icon"></div>
                    </div>
                </div>
                <div class="queued queued_playlists">
                    <div class="queue-col__caption">{{$t('inQueue')}}</div>
                    <div class="queued__playlist playlist" v-for="(playlist, index) in playlistQueue" :key="index">
                        <img class="playlist__img" :src="playlist.imageUrl" alt=""/>
                        <div class="playlist__text">
                            <div class="playlist__title" :title="playlist.title">{{playlist.title}}</div>
                            <div class="playlist__duration">{{playlist.duration}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="queue-col queue-col_tracks tracks" :class="{'queue-col_single': !realSet}">
                <div class="queue-col__title queue-col__title_tracks">{{$t('tracks')}}</div>
                <div class="playing-now playing-now_track">
                    <div class="queue-col__caption">{{$t('playingNow')}}</div>
                    <div class="track track_active">
                        <div class="track__text">
                            <div class="track__title">
                                {{currentTrack.artistTitle}}
                                <span v-if="currentTrack.coartists && currentTrack.coartists.length">
                                    <span v-for="(coartist, index) in currentTrack.coartists" :key="index">&amp; {{coartist.title}} </span>
                                </span>
                                <span> — </span>
                                <span :title="currentTrack.title">{{currentTrack.title}}</span>
                                <div class="play-icon play-icon_track"></div>
                            </div>
                            <div class="track__duration">{{TimeFormat.fromS(TimeFormat.toS(currentTrack.duration), 'mm:ss')}}</div>
                        </div>
                    </div>
                </div>
                <div class="queued queued_tracks">
                    <div class="queue-col__caption">{{$t('inQueue')}}</div>
                    <div class="queued__track track" v-for="(track, index) in trackQueue" :key="index">
                        <div class="track__text">
                            <div class="track__title">
                                {{track.artistTitle}}
                                <span v-if="track.coartists && track.coartists.length">
                                    <span v-for="(coartist, index) in track.coartists" :key="index">&amp; {{coartist.title}} </span>
                                </span>
                                <span> — </span>
                                <span :title="track.title">{{track.title}}</span>
                            </div>
                            <div class="track__duration">{{TimeFormat.fromS(TimeFormat.toS(track.duration), 'mm:ss')}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TimeFormat from 'hh-mm-ss';

export default {
    name: "Queue",
    props: {
        set: {
            type: Object,
            required: true
        },
        currentPlaylist: {
            type: Object,
            required: true
        },
        currentTrack: {
            type: Object,
            required: true
        },
        toggleQueue: {
            type: Function,
            required: true
        },
        playlistQueue: {
            type: Array,
            required: true
        },
        trackQueue: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            TimeFormat: TimeFormat
        }
    },
    computed: {
        realSet() {
            return this.set.id !== 4444000000000000
        }
    }
}
</script>

<style scoped>

</style>