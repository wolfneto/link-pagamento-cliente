import Vuex from 'vuex';
import Vue from 'vue';
import 'es6-promise/auto';

import api from '../api/api';

Vue.use(Vuex);

//PRODUÇÃO
// const org_id = 'k8vif92e';
// const sellerID = "c99f0563-acf7-4da2-8b7f-f75226a1ea7d"

//HOMOLOGAÇÃO
const org_id = '1snn5n9w';
const sellerID = "c99f0563-acf7-4da2-8b7f-f75226a1ea7d"

export default new Vuex.Store({
    state: {
        pagamento: {},
        resposta: {
            status: '',
            reservado: '',
            razao: ''
        },
        sellerID: sellerID,
        org_id: org_id,
        ip: '',
        session_id: '',
        snackbar: {
            msg: "",
            type: "",
            show: false,
            time: 2000,
        },
        loading: false,
        offline: false,
        error: false

    },
    mutations: {
        set_pagamento(state, value) {
            state.pagamento = value;
        },
        set_resposta(state, value) {
            state.resposta = {...value };
        },
        set_ip(state, value) {
            state.ip = value;
        },
        set_snackbar(state, value) {
            state.snackbar = {...value };
        },
        set_loading(state, value) {
            state.loading = value;
        },
        set_session_id(state, value) {
            state.session_id = value;
        },
        set_error(state, value) {
            state.error = value;
        },
        set_offline(state, value) {
            state.offline = value;
        },
    },

    actions: {
        internet_listener(context) {
            window.addEventListener("offline", function() {
                context.commit('set_offline', true);
            });
            window.addEventListener("online", function() {
                context.commit('set_offline', false);
            });
        },
        async get_ip(context) {
            try {
                let retorno = await api.get("https://api.ipify.org/?format=json");
                context.commit('set_ip', retorno.data.ip);

            } catch (error) {
                console.log(error);
                context.commit('set_snackbar', { show: true, type: 'error', msg: "Parece que nosso servidor está fora do ar, tente novamente mais tarde." })
            }
        },
        async get_cobranca(context, payload) {
            try {
                let res = await api.get("/cobranca", {
                    params: {
                        auth: payload.auth,
                        codigo: payload.codigo
                    }
                })

                if (res.data == false) {
                    context.commit('set_error', true);
                    context.commit('set_snackbar', { show: true, type: 'error', msg: "Link Inválido. URL Incorreta." })
                } else {
                    context.commit('set_pagamento', res.data);
                    context.commit('set_error', false);
                }


            } catch (error) {
                context.commit('set_error', true);
                console.log(error);
                context.commit('set_snackbar', { show: true, type: 'error', msg: "Parece que nosso servidor está fora do ar, tente novamente mais tarde." })
            }

        },
        async get_pagamento(context, payload) {
            try {
                let res = await api.get("/pagamento", {
                    params: {
                        auth: payload.auth,
                        codigo: payload.codigo
                    }
                })
                context.commit('set_pagamento', res.data);
                context.commit('set_error', false);

            } catch (error) {
                context.commit('set_error', true);
                console.log(error);
                context.commit('set_snackbar', { show: true, type: 'error', msg: "Parece que nosso servidor está fora do ar, tente novamente mais tarde." })
            }

        },
        async do_checkout(context, payload) {
            try {
                let res = await api.post("/pagamento", {
                    auth: payload.auth,
                    dados: payload.dados
                })

                context.commit('set_resposta', res.data);
                context.commit('set_error', false);

            } catch (error) {
                console.log(error);
                context.commit('set_snackbar', { show: true, type: 'error', msg: "Parece que nosso servidor está fora do ar, tente novamente mais tarde." })
            }
        },
        async do_checkout_cobranca(context, payload) {
            try {
                let res = await api.post("/cobranca", {
                    auth: payload.auth,
                    dados: payload.dados
                })

                context.commit('set_resposta', res.data);
                context.commit('set_error', false);

            } catch (error) {
                console.log(error);
                context.commit('set_snackbar', { show: true, type: 'error', msg: "Parece que nosso servidor está fora do ar, tente novamente mais tarde." })
            }
        }
    }
});