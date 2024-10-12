import axios from "axios";
import Book from "../model/Book";
import { client } from "./Client"

export function register(credentials) {
    return client.post("public/register", credentials);
}

export function login(credentials) {
    return client.post("public/login", credentials);
}

export function status() {
    return client.get("user/status");
}

export function logout() {
    return client.get("user/logout");
}

export async function getAllGenre() {
    const res = await client.get("user/genre");
    return res.data;
}

export async function getAllBooks() {
    const res = await client.get("user/books?limit=30");
    // const res = await client.get("user/books?sort=last&limit=20");
    return res.data.map(item => new Book(item._id, item.title, item.author, item.genre, item.thumbnail));
}

export async function getSimilarBooks(genre) {
    const res = await client.get(`user/books?genre=${encodeURIComponent(genre)}&limit=4`);
    return res.data.map(item => new Book(item._id, item.title, item.author, item.genre, item.thumbnail));
}

export async function getBookEpub(id) {
    const res = await client.get(`user/read-book/${id}`);
    return res.data;
}

export async function getBookQuiz(id) {
    const res = await client.get(`user/quiz/${id}`);
    return res.data;
}

export async function getEpubBufferData(url) {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
}

export async function getQuizJsonData(url) {
    const res = await axios.get(url);
    return res.data;
}