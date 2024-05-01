const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const users = [
    { username: 'Fabricio', password: '1234' },
    { username: 'user2', password: 'pass2' }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/schedule.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'schedule.html'));
});

app.get('/map.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'map.html'));
});


app.post('/login', (req, res) => {
    const users = [
        { username: 'Fabricio', password: '1234' },
        { username: 'user2', password: 'pass2' }
    ];
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Logado' });
    } else {
        res.json({ message: 'Você errou o Login ou a senha' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
