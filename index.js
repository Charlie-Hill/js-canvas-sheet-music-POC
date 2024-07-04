const c = document.getElementById('canvas');
c.width = 1920;
c.height = 1080;

const ctx = c.getContext("2d");

const NOTES_POS = {
    'C': 5,
    'D': 4.5,
    'E': 4,
    'F': 3.5,
    'G': 3,
    'A': 2.5,
    'B': 2,
    'C2': 1.5,
    'D2': 1,
    'E2': 0.5,
    'F2': 0
}
const KEY_SIGNATURES = {
    'Cmaj' : [], // Relative = AMinor
    'Gmaj': ['Fs'], // Relative = EMinor
    'Dmaj': ['Fs', 'Cs'], // Relative = BMinor
    'Amaj': ['Fs', 'Cs', 'Gs'], // Relative = FsMinor
    'Emaj': ['Fs', 'Cs', 'Gs', 'Ds'], // Relative = CsMinor
    'Bmaj': ['Fs', 'Cs', 'Gs', 'Ds', 'As'], // Relative = GsMinor
    'FsMaj': ['Fs', 'Cs', 'Gs', 'Ds', 'As', 'Es'], // Relative = DsMinor
    'CsMaj': ['Fs', 'Cs', 'Gs', 'Ds', 'As', 'Es', 'Bs'], // Relative = AsMinor

    'FMaj': ['Bb'], // Relative = Dminor
    'BbMaj': ['Bb', 'Eb'], // Relative = Gminor
    'EbMaj': ['Bb', 'Eb', 'Ab'], // Relative = Cminor
    'AbMaj': ['Bb', 'Eb', 'Ab', 'Db'], // Relative = Fminor
    'DbMaj': ['Bb', 'Eb', 'Ab', 'Db', 'Gb'], // Relative = BbMinor
    'GbMaj': ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'], // Relative = EbMinor
    'CbMaj': ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'], // Relative = AbMinor
}

console.log(KEY_SIGNATURES)

for (let i=0; i < 5; i++)
{
    drawStaff(ctx, i);
}

drawTrebleCleff();

drawFlatSharpSymbol();

drawNote('C');
drawNote('D');
drawNote('E');
drawNote('F');
drawNote('G');
drawNote('A');


ctx.beginPath()
ctx.font = "bold 38px 'Times New Roman'";
ctx.moveTo(50, 50)
ctx.fillText(KEY_SIGNATURES.CsMaj + ' Major', 50, 50)
ctx.stroke()
ctx.closePath()

renderKeySignature(KEY_SIGNATURES.CsMaj)

console.log(notes)

function drawStaff (ctx, index) {
    const staffSpacing = 15;

    ctx.moveTo(90, 130 + (index * staffSpacing));
    ctx.lineTo(1000, 130 + (index * staffSpacing));
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.closePath();
}

function drawTrebleCleff () {
    const imgSrc = './treble-clef.svg';
    const img = new Image;
    img.src = imgSrc;
    
    img.onload = function () {
        const ratio = canvas.width / img.naturalWidth;
        const scaleFactor = 0.05;

        let width = (img.naturalWidth * ratio);
        let height = (img.naturalHeight * ratio);


        width = width * scaleFactor;
        height = height * scaleFactor;
    
        ctx.drawImage(img, 70, 115, width, height);
    }

    ctx.closePath();
}

function drawFlatSharpSymbol(x, y, isFlat=false)
{
    const char = isFlat ? '♭' : '♯';
    ctx.beginPath()
    ctx.font = "bold 28px 'Times New Roman'";
    ctx.fillText(char, x, y);
    ctx.stroke();
    ctx.closePath();
}

function drawNote(note) {
    ctx.beginPath();
    switch (note) {
        case 'C': 
            ctx.arc(200, 130 + (15 * NOTES_POS.C), 8, 0, 360);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.moveTo(185, 130 + (15 * 5));
            ctx.lineTo(215, 130 + (15 * 5));
            break;
        case 'D': 
            ctx.arc(260, 130 + (15 * NOTES_POS.D), 8, 0, 360);
            ctx.fillStyle = '#fff'
            ctx.fill();
            break;
        case 'E':
            ctx.arc(320, 130 + (15 * NOTES_POS.E), 8, 0, 360);
            ctx.fillStyle = '#000'
            ctx.fill()
            break;
        case 'F':
            ctx.arc(380, 130 + (15 * NOTES_POS.F), 8, 0, 360);
            break;
        case 'G':
            ctx.arc(440, 130 + (15 * NOTES_POS.G), 8,0, 360);
            break;
        case 'A':
            ctx.arc(500, 130 + (15 * NOTES_POS.A), 8, 0, 360);
            break;
    }
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function renderKeySignature (keySignature) {
    keySignature.forEach((note, count) => renderKeySignatureNote(note, count))
}

function renderKeySignatureNote (note, count) {
    const x = 145 + (12 * count);
    let y = 145;
    switch (note[0]) {
        case 'B':
            y += 20;
            break;
        case 'E':
            y += 0;
            break;
        case 'A':
            y += 30;
            break;
        case 'D':
            y += 5;
            break;
        case 'G':
            note[1] == 'b' ? (y += 35) : (y -= 15);
            break;
        case 'C':
            y += 15;
            break;
        case 'F':
            note[1] == 'b' ? (y += 45) : (y -= 5);
            break;
    }

    drawFlatSharpSymbol(x, y, (note[1] === 'b'))
}