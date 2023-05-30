window.onload = function() {
  // 解析網址中的查詢參數
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  const userName = urlParams.get('userName');

  // 顯示 User ID 和 User Name
  const userInfoDiv = document.getElementById('userInfo');
  userInfoDiv.innerHTML = `User ID: ${userId}<br>User Name: ${userName}`;
};
