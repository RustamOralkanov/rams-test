import { computed, ref } from "vue";

export function images() {
  // Массив изображений
  const images = ref<String[]>([]);
  // Число фреймов
  const imageNum = ref(0);

  // URL изображений
  const imageList = computed(() => {
    const imageUrl = (name: string): string =>
      new URL(`/src/assets/images/${name}`, import.meta.url).toString();

    for (let index = 0; index < 121; index++) {
      images.value.push(imageUrl(`${index}.jpg`));
    }
    return images;
  });

  return {
    imageNum,
    imageList,
  };
}
