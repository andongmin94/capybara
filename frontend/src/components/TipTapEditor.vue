<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update: modelValue"]);
const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: () => {
    emit("update: modelValue", editor.value?.getHTML());
  },
});
</script>
