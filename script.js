// 初始化Firebase
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

// 獲取Firestore資料庫實例
var db = firebase.firestore();

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // 防止表單提交

  // 取得輸入的值
  var name = document.getElementById('name').value;
  var company = document.getElementById('company').value;
  var birthday = document.getElementById('birthday').value;
  var email = document.getElementById('email').value;

  // 驗證輸入的資料
  if (!name || !company || !birthday || !email) {
      alert('請填寫所有必填欄位');
      return;
  }

  // 將資料儲存到Firestore
  db.collection("Tourist_Guide").add({
      name: name,
      company: company,
      birthday: birthday,
      email: email,
      qualified: true
  })
  .then(function(docRef) {
      console.log("文件已成功添加，ID:", docRef.id);
      // 清除表單
      document.getElementById('name').value = '';
      document.getElementById('company').value = '';
      document.getElementById('birthday').value = '';
      document.getElementById('email').value = '';
  })
  .catch(function(error) {
      console.error("儲存資料時出現錯誤:", error);
  });
});
