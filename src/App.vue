<script setup lang="ts">
import IconArrowLeft from './components/icons/IconArrowLeft.vue';
import IconArrowRight from './components/icons/IconArrowRight.vue';
import IconPin from './components/icons/IconPin.vue'

import ThePopUp from './components/ThePopUp.vue';

import { computed, onMounted, watch } from 'vue'
import { images } from '@/composables/images'
import { modal } from '@/composables/modal'

const { imageNum, imageList } = images()
const { isModal, modalState } = modal()
// Навигация вперед
const minusNum = () => {
  const decrease = setInterval(() => {
    imageNum.value--

    if (imageNum.value === 18 || imageNum.value === 49 || imageNum.value === 86 || imageNum.value === 120) {
      clearInterval(decrease);
    }
  }, 40)
}

// Навигация назад
const plusNum = () => {
  const increase = setInterval(() => {
    imageNum.value++

    if (imageNum.value === 18 || imageNum.value === 49 || imageNum.value === 86 || imageNum.value === 120) {
      clearInterval(increase);
    }
  }, 40)
}

// Позиция пина
const pinPosition = computed(() => {
  if (imageNum.value === 18) {
    return {
      top: '50%',
      left: '50%'
    }
  } else if (imageNum.value === 49) {
    return {
      top: '43%',
      left: '37%',
    }
  } else if (imageNum.value === 86) {
    return {
      top: '36%',
      left: '59%'
    }
  } else {
    return {
      opacity: "0"
    }
  }
})

// Ограничения фреймов
watch(imageNum, () => {
  if (imageNum.value > 120) {
    imageNum.value = 0
  }

  if (imageNum.value === -1) {
    imageNum.value = 120
  }
})

onMounted(() => {
  plusNum()
})
</script>

<template>
  <div class="main">
    <!-- ЗD изображения -->
    <img :src="imageList.value[imageNum].toString()" alt="image">
    <!-- Пин -->
    <div class="pin" :style="pinPosition">
      <IconPin @click="isModal" />
      <div class="pin-tooltip">
        Tooltip
      </div>
    </div>
    <!-- Кнопки навигации -->
    <div class="btns">
      <button @click="minusNum">
        <IconArrowLeft />
      </button>
      <button @click="plusNum">
        <IconArrowRight />
      </button>
    </div>
    <!-- Модальное окно -->
    <ThePopUp v-show="modalState" :show="modalState" @isShow="isModal" :imageNum="imageNum" />
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    transition: all 0.1s;
  }

  .pin {
    position: absolute;
    cursor: pointer;

    &:hover {
      .pin-tooltip {
        opacity: 1;
      }
    }

    &-tooltip {
      opacity: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 4px;
      padding: 4px;
      font-size: 14px;
      font-family: sans-serif;
    }
  }

  .btns {
    position: absolute;
    padding: 16px 0;
    width: 100%;
    bottom: 0;
    background-color: #ffffff50;
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
      height: 36px;
      width: 36px;
      border-radius: 8px;
      border: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
