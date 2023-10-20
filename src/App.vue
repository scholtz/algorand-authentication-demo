<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import algosdk from 'algosdk'

const client = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443)
const status = reactive({
  err: {
    message: 'no error'
  },
  data: {}
})

function testGetParams() {
  try {
    client
      .getTransactionParams()
      .do()
      .then((params) => {
        status.data = params
        console.log('params', params)
      })
      .catch((reason) => {
        status.err = reason
      })
  } catch (e: any) {
    status.err = e
  }
}
</script>

<template>
  <button @click="testGetParams">Push</button>
  <div>Error: {{ status.err.message }}</div>
  <div>Data : {{ status.data }}</div>
</template>
