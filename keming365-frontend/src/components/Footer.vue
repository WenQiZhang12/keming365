<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-logo">
          <img src="https://www.keming365.com/images/footer_logo.png" alt="科明365">
        </div>
      </div>
      <div class="footer-right">
        <div class="qrcode-item">
          <img src="https://keming365.com/images/二维码.png" alt="公众号二维码">
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <p>©2015-2026 济南科明数码技术股份有限公司版权所有</p>
      <div class="footer-records">
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">鲁ICP备14017714号-13</a>
        <span>|</span>
        <a
          class="police-record"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010202000872"
          target="_blank"
          rel="noopener"
        >
          <img src="https://www.keming365.com/images/batb.png" alt="">
          <span>鲁公网安备 37010202000872号</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  height: 284px;
  box-sizing: border-box;
  background: #2366d8;
  padding: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1200px;
  max-width: calc(100% - 40px);
  height: 150px;
  box-sizing: content-box;
  margin: 0 auto;
  padding-top: 50px;
}

.footer-left {
  .footer-logo {
    img {
      width: 465px;
      height: 77px;
      display: block;
      margin-top: 26px;
    }
  }
}

.footer-right {
  display: flex;
  gap: 24px;

  .qrcode-item {
    img {
      width: 231px;
      height: 129px;
      display: block;
    }
  }
}

.footer-copyright {
  text-align: center;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  padding-top: 14px;

  p {
    margin: 0;
    line-height: 22px;
  }
}

.footer-records {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;

  a {
    display: inline-flex;
    align-items: center;
    height: 20px;
    color: #fff;
    text-decoration: none;
  }
}

.police-record {
  gap: 5px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}

@media(max-width: 768px) {
  .footer {
    height: auto;
    min-height: 284px;
    padding: 32px 18px 20px;
  }
  .footer-content {
    width: 100%;
    max-width: none;
    height: auto;
    box-sizing: border-box;
    padding-top: 0;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }
  .footer-left .footer-logo img {
    width: min(465px, 100%);
    height: auto;
    margin-top: 0;
  }
  .footer-right .qrcode-item img {
    width: 180px;
    height: auto;
  }
  .footer-copyright {
    padding-top: 20px;
    font-size: 13px;
  }
  .footer-records {
    flex-wrap: wrap;
    row-gap: 4px;
  }
}
</style>
