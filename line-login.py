from flask import Flask, render_template

app = Flask(__name__)

# 首頁路由
@app.route('/')
def home():
    return render_template('index.html')

# Line 登入路由
@app.route('/line-login')
def line_login():
    # 在這裡處理 Line 登入相關的邏輯
    # 例如，可以重定向到 Line 登入頁面或執行其他相應的操作

    # 這裡只回傳一個訊息作為示範
    return 'Line 登入頁面'

# 啟動伺服器
if __name__ == '__main__':
    app.run(debug=True)
