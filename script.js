// 初始化 Line Login SDK
liff.init({
  liffId: 'YOUR_LIFF_ID'
})
.then(() => {
  // 註冊點擊事件處理函式
  document.getElementById('lineLoginButton').addEventListener('click', lineLogin);
})
.catch((error) => {
  console.error('初始化 Line Login 失敗', error);
});

// Line 登入處理函式
function lineLogin() {
  liff.login()
    .then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile()
          .then((profile) => {
            // 獲取 Line 使用者名稱和使用者 ID
            var name = profile.displayName;
            var userId = profile.userId;

            // 在表單中顯示 Line 使用者名稱
            document.getElementById('lineUserName').textContent = 'Line 使用者名稱：' + name;

            // 影藏 Line 登入按鈕
            document.getElementById('lineLoginButton').style.display = 'none';

            // 啟用表單輸入
            document.getElementById('userForm').style.display = 'block';

            // 將 Line 使用者名稱和使用者 ID 傳遞給後端
            var hiddenNameInput = document.getElementById('hiddenName');
            var hiddenUserIdInput = document.getElementById('hiddenUserId');
            hiddenNameInput.value = name;
            hiddenUserIdInput.value = userId;
          })
          .catch((error) => {
            console.error('獲取 Line 使用者資訊失敗', error);
          });
      }
    })
    .catch((error) => {
      console.error('Line 登入失敗', error);
    });
}
