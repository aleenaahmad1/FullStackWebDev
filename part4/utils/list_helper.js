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

const favouriteBlog = (blogs) => {
    if (blogs.length === 0 ){
        return null
    } else {
        likes = blogs.map( b => b.likes)
        max_likes = Math.max(...likes)
        fav_blog = blogs[likes.indexOf(max_likes)]
        console.log("Fav blog: ", fav_blog)
        return fav_blog
    }
}
module.exports = { dummy, totalLikes, favouriteBlog }