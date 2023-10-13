import { ref } from "vue";

export function modal() {
  const modalState = ref(false);
  const isModal = () => {
    modalState.value = !modalState.value;
  };

  return {
    modalState,
    isModal,
  };
}
