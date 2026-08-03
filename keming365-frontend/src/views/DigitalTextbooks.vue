<template>
  <div class="digital-textbooks-page">
    <section class="textbook-banner" aria-label="数字教材">
      <img :src="textbookBannerUrl" alt="数字教材" />
    </section>

    <section class="textbook-content">
      <h1 class="category-title">机械工程</h1>

      <div class="textbook-grid">
        <a
          v-for="book in textbooks"
          :key="book.title"
          class="textbook-card"
          :href="textbookLoginUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="cover-wrap">
            <img class="textbook-cover" :src="book.cover" :alt="book.title" />
            <img class="textbook-badge" :src="textbookBadgeUrl" alt="数字教材" />
          </div>
          <div class="textbook-info">
            <h2>{{ book.title }}</h2>
            <p>主编：{{ book.authors }}</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/utils'

const textbookLoginUrl = 'http://60.216.119.138:3000/login'
const textbookBannerUrl = getImageUrl('szjc/13数字教材banner.png')
const textbookBadgeUrl = getImageUrl('szjc/数字教材标签.png')

const textbooks = [
  {
    title: '画法几何与机械制图 第2版',
    authors: '段辉 张莹 陈清奎',
    cover: getImageUrl('szjc/画法几何与机械制图缩略图.png'),
  },
  {
    title: '液压与气压传动',
    authors: '陈清奎 刘延俊 成红梅',
    cover: getImageUrl('szjc/液压与气压传动缩略图.png'),
  },
  {
    title: '工程训练',
    authors: '赵越超 董世知 范培卿',
    cover: getImageUrl('szjc/工程训练缩略图.png'),
  },
  {
    title: '机械设计',
    authors: '张继忠 赵彦峻 徐 楠',
    cover: getImageUrl('szjc/机械设计缩略图.png'),
  },
]
</script>

<style scoped lang="scss">
.digital-textbooks-page {
  flex: 1;
  background: #f5f7fa;
  color: #1f2937;
}

.textbook-banner {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #e9eef5;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }
}

.textbook-content {
  width: min(1200px, calc(100% - 40px));
  min-height: 500px;
  margin: 0 auto;
  padding: 38px 0 56px;
}

.category-title {
  margin: 0 0 24px;
  padding-left: 14px;
  border-left: 4px solid #1677ff;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0;
}

.textbook-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
}

.textbook-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e8edf3;
  border-radius: 8px;
  background: #fff;
  color: inherit;
  box-shadow: 0 2px 10px rgba(31, 45, 61, .06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #cddfff;
    box-shadow: 0 10px 26px rgba(31, 84, 154, .14);
  }

  &:focus-visible {
    outline: 3px solid rgba(22, 119, 255, .28);
    outline-offset: 3px;
  }
}

.cover-wrap {
  position: relative;
  height: 360px;
  overflow: hidden;
  background: #eef2f6;
}

.textbook-cover {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.textbook-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 80px;
  height: auto;
  display: block;
}

.textbook-info {
  padding: 16px;

  h2 {
    min-height: 24px;
    margin: 0 0 7px;
    overflow: hidden;
    color: #202938;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0;
    overflow: hidden;
    color: #8491a3;
    font-size: 13px;
    line-height: 1.6;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (max-width: 1024px) {
  .textbook-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .cover-wrap { height: auto; aspect-ratio: 7 / 9; }
}

@media (max-width: 768px) {
  .textbook-banner { height: 132px; }
  .textbook-content {
    width: min(100% - 28px, 620px);
    min-height: 400px;
    padding: 28px 0 40px;
  }
  .category-title { margin-bottom: 18px; font-size: 19px; }
  .textbook-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .textbook-badge { top: 8px; left: 8px; width: 66px; }
  .textbook-info { padding: 12px; }
  .textbook-info h2 {
    display: -webkit-box;
    min-height: 44px;
    font-size: 14px;
    line-height: 1.55;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .textbook-info p {
    font-size: 12px;
    white-space: normal;
  }
}

@media (max-width: 340px) {
  .textbook-grid { grid-template-columns: 1fr; }
  .cover-wrap { aspect-ratio: 7 / 8.5; }
}
</style>
