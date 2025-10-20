<template>
  <v-container
    class="d-flex flex-column justify-space-between"
    style="height: 100vh"
  >
    <v-card style="height:100%" elevation="10">
      <v-stepper
        style="height: 100%"
        v-if="pagamento.status_pagamento == 'NÃO PAGO'"
        v-model="el"
      >
        <v-stepper-header>
          <v-stepper-step cli :complete="el > 1" step="1">
            Confirmação
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="el > 2" step="2">
            Forma de Pagamento
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="el > 3 || retorno_pix" step="3">
            <span v-if="pagamento.tipo_pagamento == 'CREDITO'"
              >Dados do Cartão</span
            >
            <span v-if="pagamento.tipo_pagamento == 'BOLETO'"
              >Emitir Boleto</span
            >
            <span v-if="pagamento.tipo_pagamento == 'PIX'">
              PIX
            </span>
          </v-stepper-step>
          <template v-if="pagamento.tipo_pagamento == 'CREDITO'">
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 4" step="4">
              Dados do titular
            </v-stepper-step>
          </template>
        </v-stepper-header>

        <v-stepper-items style="height: calc(100% - 56px);">
          <v-stepper-content style="height: 100%" ref="um" step="1">
            <div class="text-center mb-2">
              <v-img
                class="mx-auto"
                width="150"
                src="@/assets/logo_pagamento.png"
              ></v-img>
              <span class="text-center text--dental">
                Acadêmico Solident Pagamentos
              </span>
              <div class="text-center dentinho">
                Este é um ambiente seguro onde você consegue realizar o
                pagamento dos seus pedidos na Dental Solident.
              </div>
            </div>
            <div
              style="height: 100%;"
              class="d-flex flex-column justify-space-around"
            >
              <v-card
                class="text-center mx-auto"
                color="grey lighten-3"
                style="max-width: 500px"
              >
                <v-row class="text--primary font-weight-bold">
                  <v-col style="margin: 6px 0px" cols="6"
                    >Pedido que você está pagando:
                  </v-col>
                  <v-col
                    cols="6"
                    class="d-flex justify-center align-center"
                    style="border-left: 1px solid lightGrey; margin: 6px 0px"
                  >
                    {{ pagamento.id_pedido }}</v-col
                  >
                  <v-col
                    cols="12"
                    style="border-top: 1px solid lightGrey; margin: 0px 6px"
                  >
                    <span class="title"
                      >Valor do Link:
                      {{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(pagamento.valor_cobranca)
                      }}</span
                    >
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <div class="text-right">
              <v-btn
                color="primary"
                text
                @click="
                  el = 2;
                  $vuetify.goTo($refs.dois);
                "
                ><v-icon left>fas fa-arrow-right</v-icon>Próximo</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-content style="height: 100%" ref="dois" step="2">
            <div class="text-center mb-2 dentinho">
              <v-img
                class="mx-auto"
                width="150"
                src="@/assets/logo_pagamento.png"
              ></v-img>
              <span class="text-center text--dental">
                Acadêmico Solident Pagamentos
              </span>
            </div>
            <div
              style="height: 100%;"
              class="d-flex flex-column justify-space-around"
            >
              <v-card class="text-center" color="grey lighten-3">
                <div class="text--primary font-weight-bold">
                  Selecione a forma de pagamento:
                </div>
                <v-row dense>
                  <v-col v-if="pagamento.tipo_pagamento == 'CREDITO'" xs="12">
                    <v-card
                      @click="
                        setTipoPagamento(pagamento.tipo_pagamento);
                        $vuetify.goTo($refs.tres);
                      "
                      style="cursor: pointer"
                      color="#2bbacb"
                      class="mx-auto ma-5"
                      dark
                      width="200"
                    >
                      <v-card-title class="justify-center"
                        ><span>Cartão de Crédito </span
                        ><v-icon large>
                          far fa-credit-card
                        </v-icon></v-card-title
                      >
                    </v-card>
                  </v-col>
                  <v-col v-if="pagamento.tipo_pagamento == 'BOLETO'" xs="12">
                    <v-card
                      @click="
                        setTipoPagamento(pagamento.tipo_pagamento);
                        $vuetify.goTo($refs.tres);
                      "
                      style="cursor: pointer"
                      color="#2bbacb"
                      class="mx-auto ma-5"
                      dark
                      width="200"
                    >
                      <v-card-title class="justify-center"
                        ><span> Boleto Bancário </span
                        ><v-icon large>
                          fas fa-barcode
                        </v-icon></v-card-title
                      >
                    </v-card>
                  </v-col>
                  <v-col v-if="pagamento.tipo_pagamento == 'PIX'" xs="12">
                    <v-card
                      @click="
                        setTipoPagamento(pagamento.tipo_pagamento);
                        $vuetify.goTo($refs.tres);
                      "
                      style="cursor: pointer"
                      color="#2bbacb"
                      class="mx-auto ma-5"
                      dark
                      width="200"
                    >
                      <v-card-title class="justify-center"
                        ><span>Pix </span><br /><v-icon left large>
                          fas fa-qrcode
                        </v-icon></v-card-title
                      >
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <div class="text-left">
              <v-btn
                class="mr-4"
                color="error"
                text
                @click="
                  el = 1;
                  $vuetify.goTo($refs.um);
                "
                ><v-icon left>fa-arrow-left</v-icon>Voltar</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-content style="height: 100%" ref="tres" step="3">
            <div style="height: 100%;" class="d-flex flex-column">
              <div
                style="height:calc(100% - 36px);"
                class=" pb-2 d-flex flex-column justify-center"
              >
                <v-card style="overflow-y: auto;" color="grey lighten-3">
                  <template v-if="pagamento.tipo_pagamento == 'CREDITO'">
                    <div style="width: 80%" class="mx-auto">
                      <v-row class="pt-2" dense>
                        <v-col cols="12" class="text-center"
                          ><h2>Dados do Cartão</h2></v-col
                        >
                        <v-col cols="12" sm="12" md="12" lg="6">
                          <div
                            class="
                            flip-container
                            mx-auto
                            d-none d-sm-none d-md-none d-lg-block
                          "
                            :class="flip ? 'flipped' : ''"
                          >
                            <div class="flipper">
                              <div class="front">
                                <div
                                  class="
                                  cartao-container
                                  d-flex
                                  justify-content-center
                                  align-items-center
                                "
                                >
                                  <img
                                    src="@/assets/credit_card_front.png"
                                    class="img-cartao"
                                  />

                                  <img
                                    v-if="img_bandeira != ''"
                                    class="img-bandeira"
                                    :src="
                                      require('@/assets/' +
                                        img_bandeira +
                                        '.png')
                                    "
                                  />

                                  <div
                                    :class="
                                      selected_span.numero
                                        ? 'cartao-selected'
                                        : ''
                                    "
                                    class="cartao-numero"
                                  >
                                    <span
                                      v-if="
                                        dados_pagamento.cartao.numero.length > 0
                                      "
                                      >{{ dados_pagamento.cartao.numero }}</span
                                    >
                                    <span v-else>0000 0000 0000 0000</span>
                                  </div>
                                  <div
                                    :class="
                                      selected_span.nome
                                        ? 'cartao-selected'
                                        : ''
                                    "
                                    class="cartao-nome"
                                  >
                                    <span
                                      v-if="
                                        dados_pagamento.cartao.nome.length > 0
                                      "
                                    >
                                      {{ dados_pagamento.cartao.nome }}
                                    </span>
                                    <span v-else> NOME COMPLETO </span>
                                  </div>
                                  <div
                                    :class="
                                      selected_span.validade
                                        ? 'cartao-selected'
                                        : ''
                                    "
                                    class="cartao-validade"
                                  >
                                    <div>valido até:</div>
                                    <span
                                      style="font-size: 18px"
                                      v-if="
                                        dados_pagamento.cartao.validade.length >
                                          0
                                      "
                                    >
                                      {{
                                        dados_pagamento.cartao.validade
                                      }}</span
                                    >
                                    <span style="font-size: 18px" v-else>
                                      MM/AA
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="back">
                                <img
                                  src="@/assets/credit_card_back.png"
                                  class="img-cartao"
                                />
                                <div
                                  :class="
                                    selected_span.cvv ? 'cartao-selected' : ''
                                  "
                                  class="cartao-cvv"
                                >
                                  <span
                                    v-if="dados_pagamento.cartao.cvv.length > 0"
                                  >
                                    {{ dados_pagamento.cartao.cvv }}
                                  </span>
                                  <span v-else> 000 </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="6" class="pt-2">
                          <v-row>
                            <v-col>
                              <v-text-field
                                @keyup="
                                  validarBandeira(dados_pagamento.cartao.numero)
                                "
                                @focus="selected_span.numero = true"
                                @blur="selected_span.numero = false"
                                v-mask="'#### #### #### ####'"
                                v-model="dados_pagamento.cartao.numero"
                                label="Número do Cartão"
                                dense
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                @focus="selected_span.nome = true"
                                @blur="selected_span.nome = false"
                                v-model="dados_pagamento.cartao.nome"
                                label="Nome"
                                dense
                                hint="Como está impresso no cartão"
                                persistent-hint
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                @focus="selected_span.validade = true"
                                @blur="selected_span.validade = false"
                                v-model="dados_pagamento.cartao.validade"
                                label="Validade"
                                dense
                                v-mask="'##/##'"
                                hint="MM/AA"
                                persistent-hint
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                @focus="
                                  flip = true;
                                  selected_span.cvv = true;
                                "
                                @blur="
                                  flip = false;
                                  selected_span.cvv = false;
                                "
                                v-model="dados_pagamento.cartao.cvv"
                                label="CVV"
                                v-mask="'###'"
                                dense
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>

                    <v-row style="width: 90%" class="mt-5 pt-5 mx-auto px-0">
                      <v-col>
                        <v-select
                          v-model="dados_pagamento.cartao.parcelas"
                          class="mx-auto"
                          style="width: 80%"
                          :items="parcelas"
                          label="Parcelas"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </template>

                  <template v-if="pagamento.tipo_pagamento == 'BOLETO'">
                    <div class="title text-center mb-5 pt-5">
                      Boleto à vista:
                      <b>
                        {{
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(pagamento.valor_cobranca)
                        }}
                      </b>
                    </div>
                    <div class="text-center">
                      <v-img
                        width="500px"
                        class="mx-auto"
                        src="@/assets/imagem_boleto.png"
                      ></v-img>

                      <br />
                      <br />
                      <span class="error--text body-2">
                        <span style="font-weight: bold">Atenção:</span>
                        Caso você possua um programa anti pop-up, será
                        necessário desativá-lo para conseguir imprimir ou salvar
                        o boleto.</span
                      >
                    </div>
                  </template>

                  <template
                    class="pa-3 pb-0 pb-sm-3 text-center"
                    v-if="pagamento.tipo_pagamento == 'PIX'"
                  >
                    <v-row dense class="text-center">
                      <v-col
                        cols="12"
                        class="text-center text--primary font-weight-bold"
                      >
                        Pagamento PIX
                      </v-col>
                      <v-col align-self="center" cols="12" sm="6" class="pr-2">
                        <v-col class="pa-0" cols="12">
                          <div class="d-block d-sm-none">
                            <b>Status: </b> <br />
                            <span class="error--text" v-if="!retorno_pix"
                              >AGUARDANDO PAGAMENTO</span
                            >
                            <span class="success--text" v-else
                              >PAGAMENTO RECEBIDO</span
                            >
                          </div>

                          <div v-if="retorno_pix" class="d-block d-sm-none">
                            <br />
                            Seu pagamento foi feito com sucesso!
                          </div>

                          <b
                            >Valor:
                            {{
                              new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(pagamento.pagamentos_pix.valor)
                            }}
                          </b>
                          <br class="d-none d-sm-block" />
                          <br />
                          <v-img
                            src="@/assets/pix-passo-a-passo.png"
                            class="d-none d-sm-block"
                            contain
                            height="225"
                          />
                          <v-img
                            @click="dialog_pix_passos = true"
                            src="@/assets/pix-passo-a-passo.png"
                            contain
                            max-height="150"
                            class="d-sm-none"
                          />
                        </v-col>
                      </v-col>
                      <v-divider class="d-none d-sm-block" vertical></v-divider>
                      <v-col
                        style="max-width: 100%"
                        align-self="center"
                        cols="12"
                        sm="6"
                      >
                        <div class="d-none d-sm-block">
                          <b>Status: </b>
                          <span class="error--text" v-if="!retorno_pix"
                            >AGUARDANDO PAGAMENTO</span
                          >
                          <span class="success--text" v-else
                            >PAGAMENTO RECEBIDO</span
                          >
                          <div v-if="retorno_pix" class="d-none d-sm-block">
                            <br />
                            Seu pagamento foi feito com sucesso!
                          </div>
                          <br class="d-none d-sm-block" />
                          <br />
                        </div>
                        <template v-if="pagamento.tipo_pagamento == 'PIX'">
                          <QrcodeVue
                            v-if="!retorno_pix"
                            :value="pagamento.pagamentos_pix.qrcode"
                            :size="225"
                            level="H"
                            class="d-none d-sm-block"
                          />
                          <div @click="dialog_qrcode = true">
                            <QrcodeVue
                              v-if="!retorno_pix"
                              :value="pagamento.pagamentos_pix.qrcode"
                              :size="150"
                              level="H"
                              class="d-sm-none"
                            />
                          </div>
                        </template>
                      </v-col>
                      <v-col v-if="!retorno_pix" cols="12">
                        Ou copie e cole o código diretamente:
                      </v-col>

                      <v-col v-if="!retorno_pix" cols="12" class="px-4">
                        <v-text-field
                          id="pix-string-container"
                          :value="pagamento.pagamentos_pix.qrcode"
                          readonly
                          solo
                          single-line
                          dense
                          hide-details
                        >
                          <template v-slot:append-outer>
                            <v-btn color="primary" @click="copyPix()" dense
                              >copiar
                              <v-icon class="ml-2">
                                fa-solid fa-copy
                              </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                </v-card>
              </div>

              <div class="d-flex flex-row justify-space-between">
                <v-btn
                  v-if="!retorno_pix"
                  class="mr-4"
                  color="error"
                  text
                  @click="
                    el = 2;
                    $vuetify.goTo($refs.dois);
                  "
                  ><v-icon left>fa-arrow-left</v-icon>Voltar</v-btn
                >

                <v-btn
                  v-if="pagamento.tipo_pagamento != 'PIX'"
                  :disabled="
                    pagamento.tipo_pagamento == 'CREDITO' && !validateCartao()
                  "
                  @click="
                    pagamento.tipo_pagamento == 'CREDITO'
                      ? (el = 4)
                      : doCheckout();
                    $vuetify.goTo($refs.quatro);
                  "
                  color="primary"
                  text
                >
                  <v-icon
                    left
                    v-if="
                      pagamento.tipo_pagamento == 'PIX' ||
                        pagamento.tipo_pagamento == 'BOLETO'
                    "
                    >fas fa-check</v-icon
                  >
                  <v-icon left v-else>fas fa-arrow-right</v-icon>
                  <span v-if="pagamento.tipo_pagamento == 'PIX'"
                    >Gerar QRCODE</span
                  >
                  <span v-else-if="pagamento.tipo_pagamento == 'BOLETO'"
                    >Emitir Boleto</span
                  >
                  <span v-else>
                    Próximo
                  </span>
                </v-btn>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content style="height: 100%" ref="quatro" step="4">
            <div style="height: 100%;" class="d-flex flex-column">
              <div
                style="height:calc(100% - 36px);"
                class=" pb-2 d-flex flex-column justify-center"
              >
                <v-card style="overflow-y: auto;" color="grey lighten-3">
                  <div style="width: 80%" class="mx-auto">
                    <v-row dense justify="center">
                      <v-col
                        class="text-center"
                        align-self="center"
                        cols="12"
                        md="6"
                        ><h2>Você é o TITULAR do cartão?</h2></v-col
                      >
                      <v-col
                        class="text-center"
                        align-self="center"
                        cols="12"
                        md="6"
                      >
                        <v-btn-toggle
                          @change="changeTitular()"
                          v-model="titular"
                          rounded
                          mandatory
                        >
                          <v-btn large outlined color="success">SIM</v-btn>
                          <v-btn large outlined color="error">NÃO</v-btn>
                        </v-btn-toggle>
                      </v-col>
                      <v-col cols="12">
                        <h3 class="text-center">
                          Dados do Titular do Cartão
                        </h3>
                      </v-col>

                      <template v-if="titular == 1">
                        <v-col cols="12">
                          <v-select
                            :items="parentesco"
                            label="Parentesco com o TITULAR"
                            :rules="[rules.required]"
                            v-model="dados_pagamento.parentesco"
                          ></v-select>
                        </v-col>
                      </template>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.nome"
                          label="Nome do TITULAR"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.sobrenome"
                          label="Sobrenome do TITULAR"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.cpf"
                          label="CPF"
                          v-mask="['###.###.###-##']"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.cep"
                          @keyup="getCep()"
                          label="CEP"
                          v-mask="'#####-###'"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>

                      <template v-if="pagamento.banco_cobranca == 'SANTANDER'">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="dados_pagamento.cliente.email"
                            label="E-Mail"
                            dense
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="dados_pagamento.cliente.telefone"
                            label="Telefone/Celular"
                            v-mask="['(##) ####-####', '(##) # ####-####']"
                            dense
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </template>

                      <v-col cols="12" sm="10">
                        <v-text-field
                          v-model="dados_pagamento.cliente.endereco"
                          label="Endereço"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <v-text-field
                          v-model="dados_pagamento.cliente.numero"
                          v-mask="'#####'"
                          label="Número"
                          id="numero"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.complemento"
                          label="Complemento"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.bairro"
                          label="Bairro"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.cidade"
                          label="Cidade"
                          readonly
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="dados_pagamento.cliente.estado"
                          label="Estado"
                          readonly
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </div>

              <div class="d-flex flex-row justify-space-between">
                <v-btn
                  class="mr-4"
                  color="error"
                  text
                  @click="
                    el = 3;
                    $vuetify.goTo($refs.tres);
                  "
                  ><v-icon left>fa-arrow-left</v-icon>Voltar</v-btn
                >

                <v-btn
                  :disabled="!validate()"
                  @click="doCheckout()"
                  color="primary"
                  text
                  ><v-icon left>fas fa-check</v-icon>
                  <span class="d-none d-sm-inline">
                    Finalizar Pagamento
                  </span>
                  <span class="d-xs-inline d-sm-none">
                    Finalizar
                  </span>
                </v-btn>
              </div>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-card
        v-else-if="pagamento.status_pagamento == 'EM ABERTO'"
        class="mb-12"
        color="grey lighten-3"
        height="200"
      >
        <div class="text--primary font-weight-bold pa-5">
          Boleto Já Emitido:
          <br />
          <v-btn @click="imprimir_boleto()" color="primary" text
            ><v-icon left>fas fa-print</v-icon>Imprimir</v-btn
          >
          <br /><br />
          <span class="title"
            >Valor do Link:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento.valor_cobranca)
            }}
          </span>
        </div>
      </v-card>
      <v-card
        class="mb-12"
        color="grey lighten-3"
        height="200"
        v-else-if="error"
      >
        <div class="text--primary font-weight-bold pa-5">
          Link Inválido. URL Incorreta
        </div>
      </v-card>
      <v-card v-else class="mb-12" color="grey lighten-3" height="200">
        <div class="text--primary font-weight-bold pa-5">
          O pedido abaixo já está pago:

          <br />
          {{ pagamento.id_pedido }}

          <br /><br />
          <span class="title"
            >Valor do Link:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento.valor_cobranca)
            }}
            - <span class="text--success">PAGO</span></span
          >
        </div>
      </v-card>
    </v-card>

    <v-dialog v-model="dialog_pix_passos" max-width="270">
      <v-card class="pa-2">
        <v-img src="@/assets/pix-passo-a-passo.png" contain max-height="300" />
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" text @click="dialog_pix_passos = false">
            <v-icon left>fa-undo-alt</v-icon>Voltar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_qrcode" max-width="270">
      <v-card class="pa-2">
        <QrcodeVue
          v-if="!retorno_pix && pagamento.tipo_pagamento == 'PIX'"
          :value="pagamento.pagamentos_pix.qrcode"
          :size="250"
          level="H"
        />
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" text @click="dialog_qrcode = false">
            <v-icon left>fa-undo-alt</v-icon>Voltar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_pago" max-width="270">
      <v-card class="pa-2 text-center">
        <h3>Sucesso!</h3>
        <br />
        <div style="color:green">
          Seu Pagamento foi recebido, Obrigado!
          <br />
          <v-icon style="color:green">fas fa-check</v-icon>
        </div>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" text @click="dialog_pago = false">
            <v-icon left>fa-undo-alt</v-icon>Voltar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      max-width="600"
      transition="dialog-top-transition"
      v-model="dialog_resposta"
    >
      <v-card>
        <v-toolbar :color="!resposta.status ? 'error' : 'success'" dark
          ><span>{{ !resposta.status ? "ERRO" : "SUCESSO" }}</span></v-toolbar
        >
        <v-card-text>
          <input
            v-if="resposta.boleto != false"
            type="hidden"
            id="codCopy"
            :value="
              resposta.boleto == undefined ? '' : resposta.boleto.codigo_barras
            "
          />
          <div class="text-h2 text-center hidden-xs-only">
            <div v-if="resposta.boleto == false">
              {{
                !resposta.status
                  ? resposta.razao
                  : !resposta.reservado
                  ? "PAGAMENTO CONFIRMADO"
                  : "RESERVA CONFIRMADA"
              }}
            </div>
            <div class="body-1" v-else>
              <span v-if="resposta.status">
                BOLETO EMITIDO
                <br />
                Codigo de Barras:
                {{
                  resposta.boleto == undefined
                    ? ""
                    : resposta.boleto.codigo_barras
                }}
                <v-btn @click="copyCod()" block color="primary" text
                  ><v-icon left>far fa-copy</v-icon>Copiar Código</v-btn
                >
              </span>
              <span v-else>
                BOLETO NÃO EMITIDO
                <br />
                {{ resposta.razao }}
              </span>
            </div>
          </div>
          <div class="text-h6 text-center hidden-sm-and-up">
            <div v-if="resposta.boleto == false">
              {{
                !resposta.status
                  ? resposta.razao
                  : !resposta.reservado
                  ? "PAGAMENTO CONFIRMADO"
                  : "RESERVA CONFIRMADA"
              }}
            </div>

            <div class="body-1" v-else>
              <span v-if="resposta.status">
                BOLETO EMITIDO
                <br />
                Codigo de Barras:
                {{
                  resposta.boleto == undefined
                    ? ""
                    : resposta.boleto.codigo_barras
                }}
                <v-btn @click="copyCod()" block color="primary" text
                  ><v-icon left>far fa-copy</v-icon>Copiar Código</v-btn
                >
              </span>
              <span v-else>
                BOLETO NÃO EMITIDO
                <br />
                {{ resposta.razao }}
              </span>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="error"
            v-if="!resposta.status"
            text
            @click="dialog_resposta = false"
            >Voltar</v-btn
          >
          <v-btn
            v-else
            color="error"
            text
            href="https://solident.com.br/"
            target="_self"
            >Sair</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :color="snackbar.type"
      :timeout="snackbar.time"
      v-model="snackbar.show"
    >
      {{ snackbar.msg }}
      <v-btn text @click="closeSnackbar()">Fechar</v-btn>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-overlay opacity="0.80" :value="offline">
      <h2>Você precisa estar conectado na internet.</h2>
    </v-overlay>
  </v-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import QrcodeVue from "qrcode.vue";
import io from "socket.io-client";
export default {
  components: {
    QrcodeVue,
  },
  props: {
    codigo: [String],
  },
  data: () => ({
    socket: io("https://edster.com.br", {
      path: "/solident/pagamento/socket.io/",
      secure: true,
      withCredentials: true,
      reconnection: true,
      rejectUnauthorized: false,
    }),
    parentesco: ["Pai / Mãe", "Amigo / Amiga", "Marido / Esposa", "Outros"],
    retorno_pix: false,
    dialog_pix_passos: false,
    dialog_qrcode: false,
    dialog_resposta: false,
    dialog_pago: false,
    titular: 0,
    img_bandeira: "",
    selected_span: {
      numero: false,
      nome: false,
      validade: false,
      cvv: false,
    },
    flip: false,
    el: 1,
    parcelas: [],
    dados_pagamento: {
      cliente: {
        nome: "",
        sobrenome: "",
        cpf: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      cartao: {
        numero: "",
        nome: "",
        validade: "",
        cvv: "",
        parcelas: 0,
        bandeira: "",
      },
      tipo_pagamento: "",
      parentesco: "",
    },

    rules: {
      required: (value) => !!value || "Campo Obrigatório.",
    },
  }),
  async created() {
    this.internet_listener();
    this.$root.$emit("title", this.$rota.currentRoute.name);
    this.set_loading(true);

    await this.get_ip();
    await this.getPagamento();
    await this.generateParcelas();
    console.log("opa", this.pagamento);
    if (
      this.pagamento.banco_cobranca == "SANTANDER" &&
      this.pagamento.tipo_pagamento == "CREDITO"
    ) {
      let session_id =
        this.sellerID + this.pagamento.aluno.cpf + this.pagamento.id_pedido;
      let script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://h.online-metrix.net/fp/tags.js?org_id=" +
          this.org_id +
          "&session_id=" +
          session_id
      );
      document.head.appendChild(script);
      this.dados_pagamento.session_id = session_id;
    } else if (
      this.pagamento.banco_cobranca == "SAFRA" &&
      this.pagamento.tipo_pagamento == "CREDITO"
    ) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML =
        "var __kdt = __kdt || [];" +
        "__kdt.push({'public_key': 'T10A7127303'}); " +
        "(function() {   " +
        "var kdt = document.createElement('script');   " +
        "kdt.id = 'kdtjs'; kdt.type = 'text/javascript';  " +
        "kdt.async = true;    kdt.src = 'https://i.k-analytix.com/k.js';   " +
        "var s = document.getElementsByTagName('body')[0];  " +
        "s.parentNode.insertBefore(kdt, s);" +
        " })(); ";
        document.body.appendChild(script);
    }
    this.set_loading(false);
  },
  mounted() {
    this.socket.on("RETORNO_PIX", (data) => {
      if (data == this.pagamento.pagamentos_pix.txid) {
        this.retorno_pix = true;
        this.dialog_qrcode = false;
        this.dialog_pix_passos = false;
        this.dialog_pago = true;
      }
    });
  },
  computed: {
    ...mapState({
      pagamento: (state) => state.pagamento,
      resposta: (state) => state.resposta,
      sellerID: (state) => state.sellerID,
      org_id: (state) => state.org_id,
      ip: (state) => state.ip,
      error: (state) => state.error,
      snackbar: (state) => state.snackbar,
      loading: (state) => state.loading,
      offline: (state) => state.offline,
    }),
  },
  methods: {
    ...mapActions([
      "do_checkout_cobranca",
      "get_cobranca",
      "get_ip",
      "internet_listener",
    ]),
    ...mapMutations(["set_snackbar", "set_loading", "set_pagamento"]),
    closeSnackbar() {
      this.set_snackbar({
        show: false,
      });
    },
    changeTitular() {
      if (this.titular == 0) {
        // é o titular
        this.dados_pagamento.cliente = JSON.parse(
          JSON.stringify(this.pagamento.aluno)
        );
        this.$nextTick(() => {
          this.dados_pagamento.cliente.cpf += " ";
          this.dados_pagamento.cliente.cep += " ";
          this.dados_pagamento.cliente.telefone += " ";
        });
        this.dados_pagamento.cliente.cpf = this.dados_pagamento.cliente.cpf.trim();
        this.dados_pagamento.cliente.cep = this.dados_pagamento.cliente.cep.trim();
        this.dados_pagamento.cliente.telefone = this.dados_pagamento.cliente.telefone.trim();
      } else if (this.titular == 1) {
        this.dados_pagamento.cliente = {
          bairro: "",
          celular: "",
          cep: "",
          cidade: "",
          complemento: "",
          contato: "",
          cpf: "",
          email: "",
          endereco: "",
          estado: "",
          nome: "",
          numero: "",
          sobrenome: "",
          telefone: "",
        };
      }
    },
    imprimir_boleto() {
      window.open(this.pagamento.boleto.boleto_pdf);
    },
    copyCod() {
      let copy = document.querySelector("#codCopy");
      copy.setAttribute("type", "text");
      copy.select();
      try {
        let success = document.execCommand("copy");
        if (success) {
          this.set_snackbar({
            type: "success",
            msg: "Código de Barras Copiado!",
            show: true,
            time: 3000,
          });
        } else {
          this.set_snackbar({
            type: "error",
            msg: "Erro ao Copiar Código de Barras.",
            show: true,
          });
        }
      } catch (error) {
        this.showSnackbar(error, "error");
      }

      copy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    copyPix() {
      var copyText = document.getElementById("pix-string-container");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      navigator.clipboard.writeText(copyText.value);
      this.set_snackbar({
        type: "success",
        msg: "Código copiado com Sucesso!",
        show: true,
      });
    },
    async doCheckout() {
      if (
        this.img_bandeira.length == 0 &&
        this.pagamento.tipo_pagamento == "CREDITO"
      ) {
        this.set_snackbar({
          type: "warning",
          msg:
            "Somente aceitamos cartões das seguintes bandeiras: VISA, MASTERCARD e ELO.",
          show: true,
        });
      } else if (this.validate()) {
        this.dados_pagamento.tipo_pagamento = this.pagamento.tipo_pagamento;
        this.dados_pagamento.cliente.cpf_cnpj = this.dados_pagamento.cliente.cpf;
        this.dados_pagamento.cliente.uf = this.dados_pagamento.cliente.estado;
        this.dados_pagamento.pedido = this.pagamento.id_pagamento.toString(); // id_pagamento
        this.dados_pagamento.codigo = this.pagamento.id_pedido; //id_pedido
        this.set_loading(true);
        await this.do_checkout_cobranca({
          auth: this.$crypto_auth,
          dados: this.$crypto_encrypt(JSON.stringify(this.dados_pagamento)),
        });
        this.set_loading(false);
        if (!this.error) {
          if (this.resposta.status && this.resposta.boleto != false) {
            window.open(this.resposta.boleto.pdf);
          }
          this.dialog_resposta = true;
        }
      } else {
        this.set_snackbar({
          type: "warning",
          msg: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS.",
          show: true,
        });
      }
    },
    async getPagamento() {
      await this.get_cobranca({
        auth: this.$crypto_auth,
        codigo: this.$crypto_encrypt(this.decryptGaleda()),
      });
      if (this.error == false) {
        this.set_pagamento(this.$crypto_decrypt(this.pagamento));

        this.dados_pagamento.cliente = { ...this.pagamento.aluno };
        this.dados_pagamento.codigo = this.codigo;
        this.dados_pagamento.banco = this.pagamento.banco_cobranca;
        this.dados_pagamento.total = this.pagamento.valor_cobranca;
        this.dados_pagamento.ip = this.ip;
        this.dados_pagamento.obs_boleto = this.pagamento.obs_boleto_cobranca;
      }
    },
    validarBandeira(numero) {
      this.img_bandeira = "";
      numero = numero.replace(/\D/g, "");

      var cards = {
        visa: /^4\d{12}(\d{3})?$/,
        elo: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
        amex: /^3[47][0-9]{5,}$/,
        master: /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/,
      };

      for (var flag in cards) {
        if (cards[flag].test(numero)) {
          this.img_bandeira = flag;
          this.dados_pagamento.cartao.bandeira =
            flag.charAt(0).toUpperCase() + flag.slice(1);
        }
      }
      if (this.img_bandeira.length == 0) {
        this.img_bandeira = "master";
        this.dados_pagamento.cartao.bandeira = "Master";
      }
    },
    validateCartao() {
      if (
        this.dados_pagamento.cartao.parcelas > 0 &&
        this.dados_pagamento.cartao.numero.length > 0 &&
        this.dados_pagamento.cartao.nome.length > 0 &&
        this.dados_pagamento.cartao.validade.length > 0 &&
        this.dados_pagamento.cartao.cvv.length > 0
      ) {
        return true;
      }
    },
    validate() {
      if (
        this.pagamento.tipo_pagamento == "BOLETO" ||
        this.pagamento.tipo_pagamento == "PIX"
      ) {
        return true;
      }
      if (
        this.validateCartao() &&
        this.dados_pagamento.cliente.cpf.length > 0 &&
        this.dados_pagamento.cliente.nome.length > 0 &&
        this.dados_pagamento.cliente.sobrenome.length > 0 &&
        this.dados_pagamento.cliente.cep.length > 0 &&
        this.dados_pagamento.cliente.email.length > 0 &&
        this.dados_pagamento.cliente.telefone.length > 0 &&
        this.dados_pagamento.cliente.endereco.length > 0 &&
        this.dados_pagamento.cliente.numero.length > 0 &&
        this.dados_pagamento.cliente.bairro.length > 0 &&
        this.dados_pagamento.cliente.cidade.length > 0 &&
        this.dados_pagamento.cliente.estado.length > 0
      ) {
        if (this.titular == undefined || this.titular == 0) {
          return true;
        } else {
          if (this.dados_pagamento.parentesco.length > 0) {
            return true;
          }
        }
      }

      return false;
    },
    setTipoPagamento() {
      this.el = 3;
    },
    async generateParcelas() {
      this.parcelas.push({
        text: "SELECIONE...",
        value: 0,
      });
      let valor_parcela = 0.0;
      for (let i = 0; i < this.pagamento.max_parcela_cobranca; i++) {
        valor_parcela = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(this.pagamento.valor_cobranca / (i + 1));
        this.parcelas.push({
          text: i + 1 + "x de " + valor_parcela,
          value: i + 1,
        });
      }
    },
    async getCep() {
      let cep = this.dados_pagamento.cliente.cep;
      if (cep != undefined) {
        if (cep.length == 9) {
          if (!navigator.onLine) {
            this.set_snackbar({
              type: "warning",
              msg:
                "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
              show: true,
            });
          } else {
            this.set_loading(true);
            cep = cep.replace("-", "");
            let cepRetorno = await this.$api.get(
              "https://viacep.com.br/ws/" + cep + "/json/",
              { withCredentials: false }
            );
            if (cepRetorno.data.erro) {
              this.set_snackbar({
                type: "warning",
                msg: "CEP INVÁLIDO",
                show: true,
                time: 3000,
              });
              this.dados_pagamento.cliente.cep = "";
              this.dados_pagamento.cliente.endereco = "";
              this.dados_pagamento.cliente.bairro = "";
              this.dados_pagamento.cliente.cidade = "";
              this.dados_pagamento.cliente.estado = "";
            } else {
              this.set_snackbar({
                type: "success",
                msg: "CEP VÁLIDO",
                show: true,
                time: 3000,
              });
              this.dados_pagamento.cliente.endereco =
                cepRetorno.data.logradouro;
              this.dados_pagamento.cliente.bairro = cepRetorno.data.bairro;
              this.dados_pagamento.cliente.cidade = cepRetorno.data.localidade;
              this.dados_pagamento.cliente.estado = cepRetorno.data.uf;
              //document.getElementById("numero").focus();
            }
          }
          this.set_loading(false);
        }
      }
    },
    decryptGaleda() {
      let id = this.codigo.substring(11);
      let aux = this.codigo.substring(0, 11);
      let sub0 = aux.substring(0, 5),
        sub1 = aux.substring(5, 10),
        sub2 = aux.substring(10, 11);
      return sub1
        .concat(sub2, sub0)
        .split("")
        .reverse()
        .join("")
        .concat(id);
    },
  },
};
</script>
<style>
@media (max-height: 620px), (max-width: 300px) {
  .dentinho {
    display: none;
    background: #2bbacb;
  }
}
.row {
  margin: 0px !important;
}
.text--dental {
  color: #2bbacb;
}
/* entire container, keeps perspective */
.flip-container {
  perspective: 1000px;
}
/* flip the pane when hovered */
.flipped .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  width: 350px;
}
/* flip speed goes here */
.flipper {
  transition: 0.4s;
  transform-style: preserve-3d;

  position: relative;
}
/* hide back of pane during swap */
.front,
.back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}
/* front pane, placed above back */
.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}
/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}
.cartao-container {
  position: relative;
  width: 100% !important;
}
.col6 {
  flex: 0 0 auto;
  width: 100%;
}
.col6ToNone {
  display: none !important;
}

.img-bandeira {
  position: absolute;
  height: 28px;
  bottom: 15px;
  right: 10px;
}
.img-cartao {
  width: 350px;
}
.cartao-container {
  position: relative;
  width: 350px;
}
.cartao-numero {
  transition: 0.4s all;
  color: white;
  left: 34px;
  position: absolute;
  bottom: 80px;
  font-size: 22px;
}
.cartao-nome {
  transition: 0.4s all;
  color: white;
  text-align: start;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  left: 34px;
  position: absolute;
  bottom: 16px;
  font-size: 18px;
  text-overflow: ellipsis;
  text-transform: uppercase;
}
.cartao-validade {
  transition: 0.4s all;
  color: white;
  right: 148px;
  position: absolute;
  bottom: 41px;
  font-size: 11px;
}
.cartao-cvv {
  transition: 0.4s all;
  color: black;
  right: 10px;
  position: absolute;
  top: 82px;
  font-size: 16px;
}
.cartao-selected {
  color: black;
}
</style>
