const c = document.getElementById('canvas');
c.width = 1920;
c.height = 1080;

const ctx = c.getContext("2d");


for (let i=0; i < 5; i++)
{
    drawStaff(ctx, i);
}

drawTrebleCleff();

drawFlatSharpSymbol();



function drawStaff (ctx, index) {
    const staffSpacing = 15;

    ctx.moveTo(90, 130 + (index * staffSpacing));
    ctx.lineTo(1000, 130 + (index * staffSpacing));
    ctx.lineWidth = 1.5;
    ctx.stroke();
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
}

function drawFlatSharpSymbol(isFlat=false)
{
    const char = isFlat ? '♭' : '♯';

    ctx.font = "bold 38px 'Times New Roman'";
    ctx.fillText(char, 145, 140);
}


