async function loaded(dataUrl) {

  const response = await fetch("https://mista4444-testing.hf.space/run/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      { "data": [dataUrl] }
    )
  });

  const json = await response.json();
  console.log(json)
  const label = json['data'][0]['confidences'][0]['label']
  const prob = (json['data'][0]['confidences'][0]['confidence']) * 100


  text = document.getElementById('prediction')
  text.innerHTML = `this is ${prob} % a ${label}`



}



function dataUrlFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
}


photo = document.getElementById('photo')

photo.addEventListener('change', (event) => {

  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    dataUrlFromFile(file).then((dataUrl) => {

      document.getElementById('image').src = dataUrl;

      loaded(dataUrl)


    })

  }


});
