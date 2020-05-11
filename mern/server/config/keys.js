// to have seperate development and production environments

if (process.env.NODE_ENV === "production") {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}