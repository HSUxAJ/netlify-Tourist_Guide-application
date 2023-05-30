// 取得 URL 中的查詢參數
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 獲取 Line User ID 並顯示在網頁上
function showUserId() {
  var userId = getUrlParameter('userId');
  document.getElementById('userId').innerText = 'Line User ID: ' + userId;
}

// 在網頁載入完成後執行
window.onload = function() {
  showUserId();
};
