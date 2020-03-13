module.exports = {
    "siteMetadata": {
        "title": `Lattespirit`
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        `gatsby-transformer-remark`
    ]
}
