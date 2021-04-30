import React, { ReactNode, useContext } from 'react'
import {createContext} from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
    isPlaying: boolean;
    isLooping: boolean;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    toggleLoop: () => void;
    isShuffling: boolean;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({children}: PlayerContextProviderProps){

    const [episodeList, setEpisodeList] = React.useState([])
    const [currentEpisodeIndex ,setcurrentEpisodeIndex] = React.useState(0)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isLooping, setIsLooping] = React.useState(false)
    const [isShuffling, setIsShuffling] = React.useState(false)
  
    function play(episode: Episode){
      setEpisodeList([episode])
      setcurrentEpisodeIndex(0)
      setIsPlaying(true)
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list)
        setcurrentEpisodeIndex(index)
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying)
    }

    function toggleLoop(){
        setIsLooping(!isLooping)
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling)
    }
  
    function setPlayingState(state: boolean){
      setIsPlaying(state)
    }

    function clearPlayerState(){
        setEpisodeList([])
        setcurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext(){

        if(isShuffling){

            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setcurrentEpisodeIndex(nextRandomEpisodeIndex)

        }else if(hasNext){
            setcurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious(){
        if(hasPrevious){
            setcurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }
  
    return(
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            setPlayingState,
            playList,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            toggleLoop,
            isLooping,
            isShuffling,
            toggleShuffle,
            clearPlayerState
            }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}