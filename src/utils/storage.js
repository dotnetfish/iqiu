const STORAGE_KEY = "ai";
const localStorage = window.localStorage;

function getLocalDBInstance() {
    let db;
    try {
        const localDBString = localStorage.getItem(STORAGE_KEY);
        db = JSON.parse(localDBString);
    } catch (error) {
        console.error("fetch local db instance fail");
    }
    return db;
}

function sync(db = {}) {
    try {
        const localDBString = JSON.stringify(db);
        localStorage.setItem(STORAGE_KEY, localDBString);
    } catch (error) {
        console.error("parse local db fail");
    }
}

export function setItem(key, value) {
    try {
        const db = getLocalDBInstance() || {};
        db[key] = value;
        sync(db);
    } catch (error) {
        console.error("storage setItem fail");
    }
}

export function removeItem(key) {
    const db = getLocalDBInstance();
    delete db[key];
    sync(db);
}

export function getItem(key) {
    let result;
    try {
        const db = getLocalDBInstance();
        result = db[key];
    } catch (error) {
        console.log("local db key 不存在");
    }
    return result;
}

export default { setItem, removeItem, getItem };
