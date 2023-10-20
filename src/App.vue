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

onMounted(async () => {
  try {
    const params = await client.getTransactionParams().do()
    status.data = params
    console.log('params', params)
  } catch (e: any) {
    status.err = e
  }
})
</script>

<template>
  <div>Error: {{ status.err.message }}</div>
  <div>Data : {{ status.data }}</div>
</template>
