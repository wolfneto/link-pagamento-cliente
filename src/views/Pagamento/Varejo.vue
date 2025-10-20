<template>
  <v-container>
    <v-card
      color="mx-auto"
      elevation="10"
      height="calc(100vh - 35px)"
      max-width="900px"
    >
      <v-stepper style="height: 100%" v-model="el">
        <v-stepper-header>
          <v-stepper-step :complete="el > 1" step="1">
            <span v-if="pagamento.status_pagamento == 'NÃO PAGO'">
              Confirmação
            </span>
            <span v-else-if="pagamento.status_pagamento == 'EM ABERTO'">
              Boleto Emitido
            </span>
            <span v-else>
              {{
                pagamento.pedidos && pagamento.pedidos.length > 1
                  ? "Pedidos Pagos"
                  : "Pedido Pago"
              }}
            </span>
          </v-stepper-step>
          <template v-if="pagamento.status_pagamento == 'NÃO PAGO'">
            <v-divider></v-divider>

            <v-stepper-step :complete="el > 2" step="2">
              Forma de Pagamento
            </v-stepper-step>
            <template v-if="this.dados_pagamento.tipo_pagamento != 0">
              <v-divider></v-divider>

              <v-stepper-step :complete="el > 3 || retorno_pix" step="3">
                {{
                  this.dados_pagamento.tipo_pagamento ==
                  ("CREDITO" || "RESERVA")
                    ? "Dados do Cartão"
                    : this.dados_pagamento.tipo_pagamento == "BOLETO"
                    ? "Gerar Boleto"
                    : "Pix"
                }}
              </v-stepper-step>

              <template
                v-if="
                  this.dados_pagamento.tipo_pagamento ==
                    ('CREDITO' || 'RESERVA')
                "
              >
                <v-divider></v-divider>

                <v-stepper-step step="4">
                  Dados do Titular do Cartão
                </v-stepper-step>
              </template>
            </template>
          </template>
        </v-stepper-header>

        <v-stepper-items style="height: calc(100% - 56px); padding-bottom:3px">
          <v-stepper-content class="pa-0" style="height: 100%" step="1">
            <div
              class="d-flex flex-column justify-space-around pa-3 pa-sm-4"
              style="height: 100%; overflow-y:auto"
            >
              <div>
                <v-img
                  contain
                  max-height="150"
                  class="mx-auto dentinho-height"
                  src="@/assets/logo_pagamento.png"
                ></v-img>
                <p class="text-center text--dental text-h6">
                  Dental Solident Pagamentos
                </p>

                <v-card-text style="font-size:1.1rem">
                  <div class="text-center">
                    Olá {{ dados_pagamento.cliente.nome }}
                  </div>
                  <div class="text-center">
                    <span v-if="pagamento.status_pagamento == 'NÃO PAGO'">
                      Este é um ambiente seguro onde você consegue realizar o
                      pagamento dos seus pedidos na Dental Solident.
                    </span>
                    <span v-if="pagamento.status_pagamento == 'PAGO'">
                      Este pagamento ja foi feito, Obrigado!
                    </span>
                  </div>
                </v-card-text>
              </div>
              <div
                v-if="pagamento.status_pagamento == 'EM ABERTO'"
                class="mx-auto text--primary font-weight-bold pa-5"
              >
                Boleto Já Emitido:
                <br />
                <v-btn @click="imprimir_boleto()" color="primary" text
                  ><v-icon left>fas fa-print</v-icon>Imprimir</v-btn
                >
              </div>
              <div
                style="height: 100%;"
                class="d-flex flex-column justify-center"
              >
                <v-card color="grey lighten-3" class="pa-3 pa-sm-5 text-center">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      class="text--primary font-weight-bold"
                      style="align-items: center;"
                    >
                      {{
                        pagamento.pedidos && pagamento.pedidos.length > 1
                          ? "Pedidos"
                          : "Pedido"
                      }}
                      {{
                        pagamento.status_pagamento == "NÃO PAGO"
                          ? "que você está pagando:"
                          : ":"
                      }}
                      <span
                        v-for="pedido in pagamento.pedidos"
                        :key="pedido.id"
                      >
                        <br />
                        {{ pedido.numero_pedido }}
                      </span>
                    </v-col>
                    <v-col class="d-block d-sm-none">
                      <v-divider></v-divider>
                    </v-col>
                    <v-divider class="d-none d-sm-block" vertical></v-divider>
                    <v-col
                      cols="12"
                      sm="6"
                      class="d-flex justify-center"
                      style="align-items: center;"
                    >
                      <v-row>
                        <v-col cols="12" class="title pa-0">
                          Total:
                          {{
                            new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(pagamento.total)
                          }}
                        </v-col>
                        <v-col
                          cols="12 pb-2"
                          class="pa-0"
                          v-if="pagamento.status_pagamento == 'PAGO'"
                          style="color: green"
                        >
                          <b>
                            PAGO
                            <v-icon style="color: green"
                              >fa-solid fa-check</v-icon
                            >
                          </b>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
            <div class="d-flex flex-row justify-end pa-2">
              <v-btn
                v-if="pagamento.status_pagamento == 'NÃO PAGO'"
                color="primary"
                text
                @click="el = 2"
                ><v-icon left>fas fa-arrow-right</v-icon>Próximo</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-content class="pa-0" style="height: 100%" step="2">
            <div
              class="d-flex flex-column justify-space-around pa-3 pa-sm-4"
              style="height: 100%; overflow-y:auto"
            >
              <Dentinho> </Dentinho>
              <div
                style="height: 100%;"
                class="d-flex flex-column justify-center"
              >
                <v-card class="mb-12" color="grey lighten-3" height="200">
                  <div class="text-center text--primary font-weight-bold pa-3">
                    Formas de pagamento disponíveis:
                  </div>

                  <v-card
                    v-if="
                      pagamento.formas_pagamento == 2 ||
                        pagamento.formas_pagamento == 3
                    "
                    @click="setTipoPagamento(pagamento.formas_pagamento)"
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

                  <v-card
                    v-if="pagamento.formas_pagamento == 1"
                    @click="setTipoPagamento(pagamento.formas_pagamento)"
                    style="cursor: pointer"
                    color="#2bbacb"
                    class="mx-auto ma-5"
                    dark
                    width="200"
                  >
                    <v-card-title class="justify-center"
                      ><span> Boleto Bancario </span
                      ><v-icon large>
                        fas fa-barcode
                      </v-icon></v-card-title
                    >
                  </v-card>

                  <v-card
                    v-if="pagamento.formas_pagamento == 4"
                    @click="setTipoPagamento(pagamento.formas_pagamento)"
                    style="cursor: pointer"
                    color="#2bbacb"
                    class="mx-auto"
                    dark
                    width="200"
                  >
                    <v-card-title class="justify-center"
                      ><span> PIX </span
                      ><v-icon right large>
                        fa-solid fa-qrcode
                      </v-icon></v-card-title
                    >
                  </v-card>
                </v-card>
              </div>
            </div>
            <div class="d-flex flex-row justify-start pa-2">
              <v-btn class="mr-4" color="error" text @click="el = 1"
                ><v-icon left>fa-undo-alt</v-icon>Voltar</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-content class="pa-0" style="height: 100%" step="3">
            <div
              class="d-flex flex-column justify-space-around pa-3 pa-sm-4"
              style="height: 100%; overflow-y:auto"
            >
              <Dentinho v-if="pagamento.formas_pagamento != 4"></Dentinho>
              <div
                style="height: 100%;"
                class="d-flex flex-column justify-center"
              >
                <v-card
                  class="pb-1"
                  color="grey lighten-3"
                  style="max-height: 100%; max-width: 100%; overflow-y: auto"
                >
                  <div
                    class="mx-auto pa-4 px-sm-6"
                    v-if="pagamento.formas_pagamento == 2"
                  >
                    <v-row dense>
                      <v-col>
                        <h3 class="text-center">Dados do Cartão</h3>
                      </v-col>
                    </v-row>
                    <v-row dense>
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
                                    require('@/assets/' + img_bandeira + '.png')
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
                                    selected_span.nome ? 'cartao-selected' : ''
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
                                      dados_pagamento.cartao.validade.length > 0
                                    "
                                  >
                                    {{ dados_pagamento.cartao.validade }}</span
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

                    <v-row class="pt-2 pt-sm-8">
                      <v-col cols="12">
                        <v-select
                          v-model="dados_pagamento.cartao.parcelas"
                          class="mx-auto"
                          style="max-width: 765px;"
                          :items="parcelas"
                          label="Parcelas"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="pa-3" v-if="pagamento.formas_pagamento == 1">
                    <div class="title text-center mb-3">
                      Boleto à vista:
                      <b>
                        {{
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(pagamento.total)
                        }}
                      </b>
                    </div>
                    <div class="text-center">
                      <v-img
                        contain
                        sizes="border-radius: 8px"
                        max-width="550"
                        class="mx-auto"
                        src="@/assets/imagem_boleto.png"
                      ></v-img>

                      <br />
                      <span class="error--text body-2">
                        <span style="font-weight: bold">Atenção:</span> Caso
                        você possua um programa anti pop-up, será necessário
                        desativá-lo para conseguir imprimir ou salvar o
                        boleto.</span
                      >
                    </div>
                  </div>
                  <div
                    class="pa-3 pb-0 pb-sm-3 text-center"
                    v-if="pagamento.formas_pagamento == 4"
                  >
                    <v-row dense class="justify-center">
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
                              }).format(pagamento.total)
                            }}
                          </b>
                          <br class="d-none d-sm-block" />
                          <br />
                          <!-- Abra o app do seu banco no celular, escolha pix, e
                          aponte a câmera para o código -->
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
                        <template
                          v-if="dados_pagamento.tipo_pagamento == 'PIX'"
                        >
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
                  </div>
                </v-card>
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between pa-2">
              <v-btn v-if="!retorno_pix" color="error" text @click="el = 2"
                ><v-icon left>fa-undo-alt</v-icon>Voltar</v-btn
              >
              <v-btn
                v-if="pagamento.formas_pagamento != 4"
                color="primary"
                text
                @click="
                  pagamento.formas_pagamento == 1
                    ? doCheckout()
                    : validateCartao()
                    ? (el = 4)
                    : set_snackbar({
                        type: 'warning',
                        msg: 'TODOS OS CAMPOS SÃO OBRIGATÓRIOS.',
                        show: true,
                      })
                "
                ><v-icon left>{{
                  pagamento.formas_pagamento == 1
                    ? "fas fa-check"
                    : "fas fa-arrow-right"
                }}</v-icon>
                <template v-if="pagamento.formas_pagamento == 1">
                  <span class="d-none d-sm-block">Emitir Boleto</span>
                  <span class="d-sm-none">Emitir</span>
                </template>
                <span v-else>Proximo</span>
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content class="pa-0" style="height: 100%" step="4">
            <div
              class="d-flex flex-column justify-space-around pa-3 pa-sm-4"
              style="height: 100%; overflow-y:auto"
            >
              <Dentinho></Dentinho>
              <div
                style="height: 100%;"
                class="d-flex flex-column justify-center"
              >
                <v-card
                  class="mx-auto px-3 py-1 pa-sm-6"
                  color="grey lighten-3"
                  style="max-height:100%; overflow-y: auto"
                >
                  <v-row class="mb-2" dense>
                    <v-col>
                      <h3 class="text-center">Dados do Titular do Cartão</h3>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        v-model="dados_pagamento.cliente.cpf_cnpj"
                        label="CPF/CNPJ"
                        v-mask="['###.###.###-##', '##.###.###/####-##']"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        v-model="dados_pagamento.cliente.cep"
                        label="CEP"
                        v-mask="'#####-###'"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <template v-if="pagamento.banco == 'SANTANDER'">
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
                          label="Telefone"
                          v-mask="['(##) ####-####', '(##) # ####-####']"
                          dense
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </template>
                    <v-col cols="9" sm="5">
                      <v-text-field
                        v-model="dados_pagamento.cliente.logradouro"
                        label="Endereço"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" sm="2">
                      <v-text-field
                        v-model="dados_pagamento.cliente.numero"
                        v-mask="'#####'"
                        label="Número"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="dados_pagamento.cliente.complemento"
                        label="Complemento"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="dados_pagamento.cliente.bairro"
                        label="Bairro"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="5">
                      <v-text-field
                        v-model="dados_pagamento.cliente.cidade"
                        label="Cidade"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="2">
                      <v-text-field
                        v-model="dados_pagamento.cliente.uf"
                        label="Estado"
                        dense
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between pa-2">
              <v-btn color="error" text @click="el = 3"
                ><v-icon left>fa-undo-alt</v-icon>Voltar</v-btn
              >
              <v-btn @click="doCheckout()" color="primary" text
                ><v-icon left>fas fa-check</v-icon>
                <span class="d-none d-sm-block">Finalizar Pagamento</span>
                <span class="d-sm-none">Finalizar</span>
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
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
          v-if="!retorno_pix && dados_pagamento.tipo_pagamento == 'PIX'"
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
// import CryptoJS from "crypto-js";
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
    retorno_pix: false,
    dialog_qrcode: false,
    dialog_pix_passos: false,
    dialog_pago: false,
    dialog_resposta: false,
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
      cliente: {},
      cartao: {
        numero: "",
        nome: "",
        validade: "",
        cvv: "",
        parcelas: 0,
        bandeira: "",
      },
      tipo_pagamento: 0,
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
    if (
      this.pagamento.banco == "SANTANDER" &&
      this.pagamento.formas_pagamento != 1
    ) {
      let session_id = this.sellerID + this.pagamento.codigo_link;
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
      "do_checkout",
      "get_pagamento",
      "get_ip",
      "internet_listener",
    ]),
    ...mapMutations(["set_snackbar", "set_loading", "set_pagamento"]),
    closeSnackbar() {
      this.set_snackbar({
        show: false,
      });
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
      // if (
      //   this.img_bandeira.length == 0 &&
      //   this.pagamento.formas_pagamento != 1
      // ) {
      //   this.set_snackbar({
      //     type: "warning",
      //     msg:
      //       "Somente aceitamos cartões das seguintes bandeiras: VISA, MASTERCARD e ELO.",
      //     show: true,
      //   });
      // } else
      if (this.validate()) {
        this.set_loading(true);
        await this.do_checkout({
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
      await this.get_pagamento({
        auth: this.$crypto_auth,
        codigo: this.$crypto_encrypt(this.codigo),
      });

      this.set_pagamento(this.$crypto_decrypt(this.pagamento));
      if (this.pagamento == null) {
        this.$rota.push("/404");
      }

      // console.log(
      //   "teste data",
      //   this.$moment_compare(this.pagamento.pagamentos_pix.expira_em)
      // );

      this.dados_pagamento.cliente = { ...this.pagamento.cliente };
      this.dados_pagamento.codigo_link = this.pagamento.codigo_link;
      this.dados_pagamento.banco = this.pagamento.banco;
      this.dados_pagamento.total = this.pagamento.total;
      this.dados_pagamento.ip = this.ip;
      this.dados_pagamento.obs_boleto = this.pagamento.obs_boleto;
    },
    validarBandeira(numero) {
      this.img_bandeira = "";
      numero = numero.replace(/\D/g, "");

      var cards = {
        visa: /^4\d{12}(\d{3})?$/,
        master: /^5[1-5][0-9]{14}$/,
        elo: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      };

      for (var flag in cards) {
        if (cards[flag].test(numero)) {
          this.img_bandeira = flag;
          this.dados_pagamento.cartao.bandeira =
            flag.charAt(0).toUpperCase() + flag.slice(1);
        }
      }
    },
    validate() {
      if (this.pagamento.formas_pagamento == 1) return true;
      if (
        this.dados_pagamento.cliente.cpf_cnpj.length > 0 &&
        this.dados_pagamento.cliente.cep.length > 0 &&
        this.dados_pagamento.cliente.email.length > 0 &&
        this.dados_pagamento.cliente.telefone.length > 0 &&
        this.dados_pagamento.cliente.logradouro.length > 0 &&
        this.dados_pagamento.cliente.numero.length > 0 &&
        this.dados_pagamento.cliente.bairro.length > 0 &&
        this.dados_pagamento.cliente.cidade.length > 0 &&
        this.dados_pagamento.cliente.uf.length > 0 &&
        this.validateCartao()
      ) {
        return true;
      }

      return false;
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
    setTipoPagamento(tipo) {
      if (tipo == 1) {
        this.dados_pagamento.tipo_pagamento = "BOLETO";
      } else if (tipo == (2 || 3)) {
        this.dados_pagamento.tipo_pagamento = tipo == 2 ? "CREDITO" : "RESERVA";
      } else {
        this.dados_pagamento.tipo_pagamento = "PIX";
      }

      this.$nextTick(() => {
        this.el = 3;
      });
    },
    async generateParcelas() {
      this.parcelas.push({
        text: "SELECIONE...",
        value: 0,
      });
      let valor_parcela = 0.0;
      for (let i = 0; i < this.pagamento.parcelas; i++) {
        valor_parcela = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(this.pagamento.total / (i + 1));
        this.parcelas.push({
          text: i + 1 + "x de " + valor_parcela,
          value: i + 1,
        });
      }
    },
  },
};
</script>
<style>
@media (max-height: 700px), (max-width: 600px) {
  .dentinho-height {
    display: none !important;
    background: pink !important;
  }
}

.v-input__append-outer {
  margin-top: 1px !important;
}
.v-stepper__wrapper {
  height: 100% !important;
  flex-direction: column !important;
  display: flex !important;
  justify-content: space-between !important;
}
.v-stepper__step {
  padding: 12px !important;
}
.v-stepper__header {
  height: 55px !important;
}
.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}

.text--dental {
  color: #2bbacb;
  margin-bottom: 10px !important;
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
