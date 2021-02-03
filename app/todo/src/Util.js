function JSONSafe(str) {
    str = str.replace(/'/g, "''").replace(/"/g, '\\"');
    return str;
}

export default JSONSafe;