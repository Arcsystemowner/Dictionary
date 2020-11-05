let input = document.querySelector('#search').value;
let searchbtn = document.querySelector('#searchbtn');
let apiKey= 'ecbb76a8-69b7-40e6-966d-d9a88f167d8f';
let notFound = document.querySelector('#notFound');
let defBox = document.querySelector('.def');
let audBox = document.querySelector('.audio');
let load = document.querySelector('.loading');

searchbtn.addEventListener('click',function(searching){
    searching.preventDefault();

    //clear data
    audBox.innerText='';
    
    defBox.innerText='';
    
    //Get input data
    let word= input.value;
    

    //call API
    if(word ===''){
        alert('Word is required');
        return;
    }
    getData(word);
})

async function getData(word){
    load.style.display ='block';
    //Ajax call
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    //if empty result return
    if(!data.length){
        load.style.display ='none';
        notFound.innerText='No result found';
        return;
    }

    //if result is suggetions
    if(typeof data[0] === 'string'){
        load.style.display ='none';
        let heading = document.createElement('h3');
        heading.innerText = 'Do you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetions = document.createElement('span');
            suggetions.classList.add('suggested');
            suggetions.innerText = element;
            notFound.appendChild(suggetions);
        })
        
        return;

    }
    //Result found
    load.style.display ='none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    //audio
    const soundName = data[0].hwi.prs[0].sound.audio;

    if(soundName){
        //if audio found
        renderSound(soundName);
    }

}

function renderSound(soundName){
    
    let subfolder = soundName.charAt[0];
    let soundSrc = `https://media.merrian-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls= true;
    audBox.appendChild(aud);


}