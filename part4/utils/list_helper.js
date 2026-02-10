const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    } else {
        likes = blogs.map(b => b.likes)
        console.log("LIKES ARRAY: ", likes)
        const initial = 0
        const sum = likes.reduce(
            (acc, current) => acc + current, 
            initial
        )
        console.log("SUM: ", sum)
        return sum
    }
}
module.exports = { dummy, totalLikes }