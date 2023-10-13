<template>
    <div class="popup" v-show="show">
        <div class="popup-img">
            <img :src="imageForFrame" alt="popup-image">
        </div>
        <div class="popup-close">
            <IconClose @click="isShow" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconClose from './icons/IconClose.vue';

const props = defineProps<{
    show: boolean,
    imageNum: number
}>()

const emit = defineEmits()
const isShow = () => {
    emit('isShow', false)
}

const popupImage = ref<string[]>(['1.jpg', '2.jpg', '3.jpg'])
const imageForFrame = computed(() => {
    if (props.imageNum === 18) {
        return `/src/assets/images/popup/${popupImage.value[0]}`
    } else if (props.imageNum === 49) {
        return `/src/assets/images/popup/${popupImage.value[1]}`
    } else {
        return `/src/assets/images/popup/${popupImage.value[2]}`
    }
})
</script>

<style scoped lang="scss">
.popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;

    &-img {
        width: 100%;
        height: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    &-close {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
    }
}
</style>