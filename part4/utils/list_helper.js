const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0 ){
        return null
    } else {
        authors = blogs.map(b => b.author)
        const frequencies = _.countBy(authors)
        const most_common = _.maxBy(
            Object.keys(frequencies),
            a => frequencies[a]
        )
        console.log("most common: ", most_common)
        return most_common
    }

}
module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }