function formatElapsedTime(elapsedTime) {
    const days = Math.floor(elapsedTime / (24 * 60 * 60));
    const hours = Math.floor((elapsedTime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);

    return `${days} days, ${hours} hours, ${minutes} minutes`;
}



module.exports = {
    formatElapsedTime
}