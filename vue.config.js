module.exports = {
    devServer: {
        port: 3000,
        proxy: 'http://localhost:38080'
    },
    outputDir: "../src/main/resources/static"
};