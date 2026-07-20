<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="分页">
    <div class="pagination-pages">
      <button type="button" @click="changePage(1)">首页</button>
      <button v-if="page > 1" type="button" aria-label="上一页" @click="changePage(page - 1)">«</button>
      <button
        v-for="item in pages"
        :key="item"
        type="button"
        :class="{ active: item === page }"
        :aria-current="item === page ? 'page' : undefined"
        @click="changePage(item)"
      >{{ item }}</button>
      <button v-if="page < totalPages" type="button" aria-label="下一页" @click="changePage(page + 1)">»</button>
      <button type="button" @click="changePage(totalPages)">尾页</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ page: number; total: number; pageSize: number }>()
const emit = defineEmits<{ 'update:page': [value: number] }>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const pages = computed(() => {
  const visibleCount = Math.min(8, totalPages.value)
  const start = Math.min(Math.max(1, props.page - 3), totalPages.value - visibleCount + 1)
  return Array.from({ length: visibleCount }, (_, index) => start + index)
})

function changePage(value: number) {
  if (value < 1 || value > totalPages.value || value === props.page) return
  emit('update:page', value)
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  max-width: 100%;
  margin: 24px 0;
  overflow-x: auto;
  padding: 1px 0 3px;
}
.pagination-pages {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  margin: 0 auto;
}
.pagination button {
  min-width: 34px;
  height: 34px;
  margin-left: -1px;
  padding: 0 11px;
  border: 1px solid #ddd;
  border-radius: 0;
  background: #fff;
  color: #337ab7;
  font: 14px/32px inherit;
  cursor: pointer;
  transition: background-color .15s, border-color .15s, color .15s;
}
.pagination button:first-child {
  margin-left: 0;
  border-radius: 4px 0 0 4px;
}
.pagination button:last-child {
  border-radius: 0 4px 4px 0;
}
.pagination button:hover {
  position: relative;
  z-index: 1;
  border-color: #adadad;
  background: #eee;
  color: #23527c;
}
.pagination button.active {
  position: relative;
  z-index: 2;
  border-color: #428bca;
  background: #428bca;
  color: #fff;
  cursor: default;
}
</style>
