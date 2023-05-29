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

// 當網頁載入完成後執行的函式
window.onload = function() {
  // 初始化 Line Login SDK
  function initializeLineLogin() {
    liff.init({ liffId: '1661222932-v3wdnbPr' })
      .then(() => {
        // 註冊點擊事件處理函式
        document.getElementById('lineLoginButton').addEventListener('click', lineLogin);
      })
      .catch((error) => {
        console.error('初始化 Line Login 失敗', error);
      });
  }

  // Line 登入處理函式
  function lineLogin() {
    liff.login()
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile()
            .then((profile) => {
              // 獲取用戶姓名和使用者 ID
              var name = profile.displayName;
              var userId = profile.userId;
              console.log('用戶資訊:', profile);
              // 顯示用戶姓名和使用者 ID
              document.getElementById('userData').innerText = '用戶姓名: ' + name + '\n使用者 ID: ' + userId;

              // 啟用表單輸入
              enableForm();

              // 將姓名和使用者 ID 儲存到變數中，以便後續提交表單時使用
              var hiddenNameInput = document.getElementById('hiddenName');
              var hiddenUserIdInput = document.getElementById('hiddenUserId');
              hiddenNameInput.value = name;
              hiddenUserIdInput.value = userId;
              console.log('用戶姓名:', hiddenName);
              console.log('使用者 ID:', hiddenUserId);
            })
            .catch((error) => {
              console.error('獲取 Line 用戶資訊失敗', error);
            });
        }
      })
      .catch((error) => {
        console.error('Line 登入失敗', error);
      });
  }

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
    var company = document.getElementById('company').value;
    var birthday = document.getElementById('birthday').value;
    var email = document.getElementById('email').value;

    // 獲取之前儲存的姓名和使用者 ID
    var hiddenNameInput = document.getElementById('hiddenName');
    var hiddenUserIdInput = document.getElementById('hiddenUserId');
    var hiddenName = hiddenNameInput.value;
    var hiddenUserId = hiddenUserIdInput.value;

    // 在控制台輸出資料
    console.log('姓名:', name);
    console.log('公司:', company);
    console.log('生日:', birthday);
    console.log('信箱:', email);
    console.log('用戶姓名:', hiddenName);
    console.log('使用者 ID:', hiddenUserId);

    // 將資料儲存到 Firestore
    db.collection('Tourist_Guide').add({
      name: name,
      company: company,
      birthday: birthday,
      email: email,
      qualified: true,
      line_name: hiddenName,
      line_userId: hiddenUserId
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

  // 呼叫初始化函式
  initializeLineLogin();
};
