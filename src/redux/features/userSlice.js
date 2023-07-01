import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_id: '',
    username: '',
    useremail: '',
    authtoken: '',
    track_playing: false,
    track_src: '',
    track_name: '',
    tracklist: null, //ids of music
    switched: false,
    playlists: null, //list of playlists
    activeplaylist: '', //current active playlist
    searchedterm: '',
    searcheditems: null,
    songs: null, //list of songs in that component
    logged_in: false,
    current_song_index: 0,
    song: null,
    vidsrc: '',
    updated: false,
    likedsongs: [],
    liked: 0,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.user_id = action.payload
        },
        setUserName: (state, action) => {
            state.username = action.payload
        },
        setUseremail: (state, action) => {
            state.useremail = action.payload
        },
        setAuthtoken: (state, action) => {
            state.authtoken = action.payload
        },
        setTracksrc: (state, action) => {
            state.track_src = action.payload
            state.track_playing = true
        },
        setTrackPause: (state, action) => {
            state.track_playing = false
        },
        setTrackname: (state, action) => {
            state.track_name = action.payload
        },
        setTracklist: (state, action) => {

            state.tracklist = action.payload
        },
        setSongs: (state, action) => {
            state.songs = action.payload
        },
        setPlaylist: (state, action) => {
            state.playlists = action.payload
        },
        setActivePlaylist: (state, action) => {
            state.activeplaylist = action.payload
        },
        setLoggedIn: (state, action) => {
            state.logged_in = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchedterm = action.payload
        },
        setSearcheditems: (state, action) => {
            state.searcheditems = action.payload
        },
        setSongIndex: (state, action) => {
            state.current_song_index = action.payload
        },
        setNextSong: (state, action) => {
            state.current_song_index = state.current_song_index + 1
        },
        setPrevSong: (state, action) => {
            state.current_song_index = state.current_song_index - 1
        },
        setSwitched: (state, action) => {
            state.switched = action.payload
        },
        setSong: (state, action) => {
            state.song = action.payload
        },
        setTrackPlaying: (state, action) => {
            state.track_playing = action.payload
        },
        setVidSrc: (state, action) => {
            state.vidsrc = action.payload
        },
        setUpdated: (state, action) => {
            state.updated = action.payload
        },
        setLikedsongs: (state, action) => {
            state.likedsongs = action.payload
        },
        setLiked: (state, action) => {
            state.liked = state.liked  + action.payload
        }
    }
});

export const { setUserId, setUserName, setTrackPause, setUseremail, setSongs, setAuthtoken, setTracksrc, setPlaylist, setTrackname, setActivePlaylist, setLoggedIn, setTracklist, setSongIndex, setNextSong, setPrevSong, setSearchTerm, setSearcheditems, setSwitched, setSong, setTrackPlaying, setVidSrc, setUpdated, setLikedsongs, setLiked } = userSlice.actions;

export default userSlice.reducer;