module.exports = {
    lintOnSave: false,

    devServer: {
        port: 8080,
        public: '0.0.0.0:8080',
        disableHostCheck: true
    },

    publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",

    transpileDependencies: [
        'vuetify'
    ],

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Dental Solident Pagamento";
                return args;
            })
    }
}