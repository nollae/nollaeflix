const API_KEY = "add7be86cf435693a66f8d1ca781c767";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "ko";
const REGION = "kr";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    idx: number;
    name:string,
}

export interface IGetMoviesResult {

    // dates: {
    //     minimum: string;
    //     maximum: string;
    // }
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;

}

export interface IGetMovieVideos {
    id: string,
    results: {
        name: string,
        key: string,
        site: string,
        size: number,
        type: string,
        official: boolean,
        published_at: string,
        id: string,
    }[]
}

export interface IGetMovieDetails {
    "backdrop_path": string,
    "belongs_to_collection": {
        "id": number,
        "name": string,
        "poster_path": string,
        "backdrop_path": string
    },
    "genres": {
        "id": number,
        "name": string
    }[],
    "homepage": string,
    "id": number,
    "imdb_id": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "runtime": number,
    "status": string,
    "tagline": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "first_air_date": string,
    "name": string,
    "seasons": []
}

export interface IGetMovieCredits {
    id: number,
    cast: {
        "adult": boolean,
        "gender": number,
        "id": number,
        "known_for_department": string,
        "name": string,
        "original_name": string,
        "popularity": number,
        "profile_path": string,
        "cast_id": number,
        "character": string,
        "credit_id": string,
        "order": number
    }[],
    crew : {
        "adult": boolean,
        "gender": number,
        "id": number,
        "known_for_department": string,
        "name": string,
        "original_name": string,
        "popularity": number,
        "profile_path": string,
        "credit_id": string,
        "department": string,
        "job": string
    }[]
}

export interface IGetMoviesSimilar {
    page: number,
    results: {
        "adult": boolean,
        "backdrop_path": string,
        "id": number,
        "original_language": string,
        "release_date": string,
        "original_title": string,
        "overview": string,
        "title": string,
        "original_name": string,
        "name": string,
        "first_air_date": string,

    }[]
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMoviesPopular(){
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMoviesTop(){
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMoviesUpcoming(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMovieVideos(movieId?:number){
    return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getSeriesVideos(seriesId?:number){
    return fetch(`${BASE_PATH}/tv/${seriesId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMovieDetails(movieId?:number){
    return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getSeriesDetails(seriesId?:number){
    return fetch(`${BASE_PATH}/tv/${seriesId}?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMovieCredits(movieId?:number){
    return fetch(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getSeriesCredits(seriesId?:number){
    return fetch(`${BASE_PATH}/tv/${seriesId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMoviesSimilar(movieId?:number){
    return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=${LANGUAGE}&page=1`)
        .then((response) => response.json()
    );
}

export function getSeriesSimilar(seriesId?:number){
    return fetch(`${BASE_PATH}/tv/${seriesId}/similar?api_key=${API_KEY}&language=${LANGUAGE}&page=1`)
        .then((response) => response.json()
    );
}

export function getSeries(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

