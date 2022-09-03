 const formComponent = `
            <form id="form">
                <h1>Feliratkozás</h1>
                <input type="text" id="name" name="name" placeholder="Full name">
                <input type="text" id="zip" name="zip" placeholder="Zip code">
                <input type="text" id="cit" name="city" placeholder="City">
                <input type="text" id="str" name="str" placeholder="Street">
                <input type="text" id="hnu" name="hnum" placeholder="House number"> 
                <input type="text" id="phnu" name="phnu" placeholder="Phone number"> 
                <input type="text" id="ema" name="ema" placeholder="Email"> 
                <input id="picture" type="file" name="picture" placeholder="Picture">
                <div id=button>
                    <button class="myButton">Send</button>
                    <button class="myButton" id="delete">Delete</button>
                </div>
            </form>
        `;

function loadEvent() {
    //meghívjuk a root-it
    const rootElement = document.getElementById("root");

    //beillesztjük a formComponentet
    rootElement.insertAdjacentHTML("beforeend", formComponent);

    //változóba mentjük a form-ot, majd egy submit eseményfigyelőt adunk hozzá
    const formElement = document.getElementById("form");
    formElement.addEventListener("submit", e => {
        e.preventDefault();

        //postázni akarom az adatokat, ehhez ez a doboz hozzá:
        const formData = new FormData(); 
            formData.append("title", e.target.querySelector(`input[name="name"]`).value);
            formData.append("title", e.target.querySelector(`input[name="zip"]`).value);
            formData.append("title", e.target.querySelector(`input[name="city"]`).value);
            formData.append("title", e.target.querySelector(`input[name="str"]`).value);
            formData.append("title", e.target.querySelector(`input[name="hnum"]`).value);
            formData.append("title", e.target.querySelector(`input[name="phnu"]`).value);
            formData.append("title", e.target.querySelector(`input[name="ema"]`).value); 
            formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0]);

        const fetchSettings = {
            method: 'POST',
            body: formData
        };

        fetch("/", fetchSettings)
        .then(async data => {
            if (data.status === 200){
                const response = await data.json()
                e.target.outerHTML = `<h1>Köszönjük a regisztrációt!</h1>`
                console.dir(data)
            }
        })
        .catch(error => {
            e.target.outerHTML = `Error`;
            console.dir(error);
        })
    })

    function clearField() {
        formElement.reset()
    }
    let clear =  document.getElementById("delete").addEventListener("click", clearField)

}


window.addEventListener("load", loadEvent);