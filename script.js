const list = document.getElementById('list');
const input = document.getElementById('person-input');

// 初始化 Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDHP_6Try_QBQri-25_WGUegQn2GiLDxt0",
  authDomain: "line-bot-c9ed0.firebaseapp.com",
  projectId: "line-bot-c9ed0",
  storageBucket: "line-bot-c9ed0.appspot.com",
  messagingSenderId: "880021780854",
  appId: "1:880021780854:web:852f894d6e674fbe70e257",
  measurementId: "G-216V2TNXZ4"
};

firebase.initializeApp(firebaseConfig);

// 獲取 Firestore 資料庫實例
var db = firebase.firestore();

// 解析網址中的查詢參數
const urlParams = new URLSearchParams(window.location.search);
window.userId = urlParams.get('userId');
window.userName = urlParams.get('userName');

// 啟用表單輸入
function enableForm() {
  var userForm = document.getElementById('userForm');
  userForm.style.display = 'block';
}

// 監聽表單提交事件
var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 防止表單提交

  // 獲取用戶輸入的姓名、公司、生日和信箱
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var recommender = document.getElementById('recommender').value;
  var company = document.getElementById('company').value;
  var birthday = document.getElementById('birthday').value;
  var email = document.getElementById('email').value;

  // 在控制台輸出資料
  console.log('姓名:', name);
  console.log('電話:', phone);
  console.log('推薦人:', recommender);
  console.log('公司:', company);
  console.log('生日:', birthday);
  console.log('信箱:', email);
  console.log('Line姓名', window.userName);
  console.log('Line UID', window.userId);

  // 將資料儲存到 Firestore
  db.collection('Tourist_Guide').add({
    name: name,
    phone: phone,
    recommender: recommender,
    company: company,
    birthday: birthday,
    email: email,
    qualified: true,
    line_name: window.userName,
    line_userId: window.userId
  })
    .then(function(docRef) {
      console.log('文件已成功添加，ID:', docRef.id);
      // 清除表單
      document.getElementById('name').value = '';
      document.getElementById('company').value = '';
      document.getElementById('birthday').value = '';
      document.getElementById('email').value = '';
    })
    .catch(function(error) {
      console.error('儲存資料時出現錯誤:', error);
    });
});
