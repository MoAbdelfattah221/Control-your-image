let uploadBox = document.querySelector(".image-upload"),
fileInput = document.querySelector(".image-upload input"),
previewImage = document.querySelector(".image-upload img"),
widthInput = document.querySelector(".dimensions .width"),
heightInput = document.querySelector(".dimensions .height"),
ratioBtn = document.querySelector(".check-box .ratio-btn"),
reduceBtn = document.querySelector(".check-box .reduce"),
downloadBtn = document.querySelector("button"),
ogImageRatio;

let loadFile = (e) => {
    let file = e.target.files[0];
    previewImage.src = URL.createObjectURL(file);
    previewImage.onload = () => {
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        previewImage.classList.add("active");
    }
}

widthInput.onkeyup = () => {
    let height = ratioBtn.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
}

heightInput.onkeyup = () => {
    let width = ratioBtn.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
}

downloadBtn.onclick = () => {
    let resizeAndDownload = () => {
        let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        a = document.createElement("a"),
        imageQuality = reduceBtn.checked ? 0.7 : 1.0;
        canvas.width = widthInput.value;
        canvas.height = heightInput.value;
        ctx.drawImage(previewImage , 0 , 0 , canvas.width , canvas.height);
        a.href = canvas.toDataURL("image/jpeg" , imageQuality);
        a.download = new Date().getTime();
        a.click();
    }
    resizeAndDownload();
}

fileInput.addEventListener("change" , loadFile);
uploadBox.onclick = () => fileInput.click();