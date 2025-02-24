import express from 'express';
import path from 'path';
import routes from './controllers/routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'users.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}


app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]');
    users.push(req.body);
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.redirect('/home');
});



app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8') || '[]')
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
    console.log("Received Login:", req.body)

    if (user) {
        res.redirect('/home')
        console.log("User found:", user.username)
    } else {
        res.send('Invalid username or password')
        console.log("Invalid username:", req.body.username)
    }
});

app.get('/home', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
