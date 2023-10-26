<script setup lang="ts">
import { reactive, ref } from 'vue'
import algosdk from 'algosdk'

import { useToast } from 'primevue/usetoast'
const toast = useToast()

import {
  AlgorandAuthentication,
  AuthenticationStore,
  type INotification,
  type IAuthenticationStore
} from 'algorand-authentication-component-vue'

import { AnyWalletState } from '@thencc/any-wallet'
const store = new AuthenticationStore()

const defaultAuthState: IAuthenticationStore = {
  isAuthenticated: false,
  arc14Header: '',
  wallet: '',
  account: '',
  count: 0,
  arc76email: '',
  anyWallet: new AnyWalletState()
}
const authState = reactive({
  isAuthenticated: defaultAuthState.isAuthenticated,
  arc14Header: defaultAuthState.arc14Header,
  wallet: defaultAuthState.wallet,
  account: defaultAuthState.account,
  count: defaultAuthState.count,
  arc76email: defaultAuthState.arc76email,
  anyWallet: defaultAuthState.anyWallet
})
store.anyWallet = authState.anyWallet

function onStateChange(e: IAuthenticationStore) {
  console.log('onStateChange', e)
  authState.isAuthenticated = e.isAuthenticated
  authState.arc14Header = e.arc14Header
  authState.wallet = e.wallet
  authState.account = e.account
  authState.count = e.count
  authState.arc76email = e.arc76email
  authState.anyWallet = e.anyWallet

  store.isAuthenticated = e.isAuthenticated
  store.arc14Header = e.arc14Header
  store.wallet = e.wallet
  store.account = e.account
  store.count = e.count
  store.arc76email = e.arc76email
  store.anyWallet = e.anyWallet
}
function onNotification(e: INotification) {
  try {
    if (e.severity == 'error') {
      console.error(e.message)
    } else {
      console.log('onNotification', e)
    }
    const ret = toast.add({
      severity: e.severity,
      detail: e.message,
      life: 5000
    })
    console.log('ret', ret)
  } catch (e: any) {
    console.error(e.message)
  }
}
console.log('AlgorandAuthentication', AlgorandAuthentication)
const authComponent = ref<InstanceType<typeof AlgorandAuthentication>>()

async function signTx() {
  if (!authComponent?.value) return

  const tx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    amount: 0,
    from: authState.account,
    suggestedParams: {
      fee: 0,
      firstRound: 32961555,
      genesisHash: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
      genesisID: 'mainnet-v1.0',
      lastRound: 32962555,
      flatFee: true
    },
    to: authState.account
  })

  const signed = await authComponent.value.sign([algosdk.encodeUnsignedTransaction(tx)])
  console.log('signed', signed)
}
async function logout() {
  if (!authComponent?.value) return
  const logout = await authComponent.value.logout()
  console.log('logout', logout)
}
</script>
<template>
  <div class="flex flex-column justify-content-center min-h-full p-0 m-0">
    <Toast />
    <Suspense>
      <AlgorandAuthentication
        @onStateChange="onStateChange"
        @onNotification="onNotification"
        ref="authComponent"
        :wallets="['pera', 'exodus', 'defly', 'myalgo', 'mnemonic']"
        useDemoMnemonics="novel consider desert ribbon cage first audit couple discover seed text guard crater exchange roof stable march tortoise hockey magic dawn jacket cricket ability bright"
        algodHost="https://mainnet-api.algonode.cloud"
        :algodPort="443"
        :store="store"
      >
        <h1>Authenticated Content {{ authState.count }}</h1>
        <div>
          Account: {{ authState.arc76email }} {{ authState.wallet }} / {{ authState.account }}
        </div>
        <button :onclick="signTx">Sign</button>
        <button :onclick="logout">Logout</button>
      </AlgorandAuthentication>
    </Suspense>
  </div>
</template>
<style>
.wallets-page {
  background-size: cover;
  background-image: url('/auth-cover.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
</style>
