const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

//這個載入template engine的方法，只有在express-handlebars@4.0.6可以使用，@6.多的不行
//app.engine為定義要使用的樣版引擎的方法，第一個參數放樣版引擎名稱，第二放樣版引擎相關設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//==========引入mongoose
require('./config/mongoose')

//==========setting static files
app.use(express.static('public'))

//==========datepicker
// const datePicker = require('flowbite-datepicker/Datepicker')
// const dateRangePickerEl = document.getElementById('dateRangePickerId');
// new DateRangePicker(datepickerEl);

//require router引入routes就會自動去找目錄下index的檔案 為何(怎樣才會去去尋找？)
const routes = require('./routes')
app.use(routes)


app.listen(port, () => { console.log(`Express is running on http://localhost:${port}`) })