

var el1 = document.getElementById('test');

if(el1){
    el1.addEventListener("click", async function(){
        // Võtame päritava sõna argumendiks.
        const word = document.getElementById("word").value;
        //Teeme päringu keeleressursside serverisse, ootame vastust.
        const response = await fetch(`http://prog.keeleressursid.ee/psvchromeextension/test.php?word=${word}`);
        const json = (response.ok) ? await response.json() : undefined;
        //Kui päringu vastuse pikkus on 0, kuvame veateate.
        if (Object.keys(json).length === 0 && json.constructor === Object) {
            document.querySelector('#antonyym').innerHTML = '';
            document.querySelector('#hyponyms').innerHTML = '';
            document.querySelector('#examples').innerHTML = '';
            document.querySelector('#definition').innerHTML = '';
            document.querySelector('#similarwords').innerHTML = '';
            document.querySelector('#tsSynod').innerHTML = '';
                document.querySelector('#show_response').innerHTML = `<h2>Kahjuks ei leidnud andmebaasist sellist sõna.</h2>
            <h2>Oled kindel, et sisestasid sõna korrektselt?</h2>
            <h2>Sisestatud sõna:</h2>${word}`;
            console.error("Nothing in response");

            return;
        }
        //Kui päringu pikkus pole 0, tühjendame kõik väljad, juhul kui on tehtud eelnevalt mingi päring, seejärel kuvame uue info
        var d = JSON.parse(json);
        const test = Object.keys(d);
        document.querySelector('#show_response').innerHTML = ``;
        document.querySelector('#antonyym').innerHTML = '';
        document.querySelector('#hyponyms').innerHTML = '';
        document.querySelector('#examples').innerHTML = '';
        document.querySelector('#definition').innerHTML = '';
        document.querySelector('#similarwords').innerHTML = '';
        document.querySelector('#tsSynod').innerHTML = '';
        //Kuvame ainult väljad, kus on ka infot mida kuvada, ehk vastava listi pikkus > 0
        if (d.tsantonyym.length > 0){
            if (d.tsantonyym===word){
                document.querySelector('#antonyym').innerHTML = ``;
            }
            else {
                document.querySelector('#antonyym').innerHTML = `<h2><span>Antonüüm </span></h2><div style="color:red;">${d.tsantonyym}</div>`;
            }
            //document.querySelector('#antonyym').innerHTML = `<h2><span>Antonüüm </span></h2><div style="color:red;">${d.tsantonyym}</div>`;

        }
        if (d.hyponyms.length > 0) {
            document.querySelector('#hyponyms').innerHTML = `<h2><span>Hüponüümid </span></h2>${d.hyponyms}`;
        }
        if ( d.examples.length > 0){
            document.querySelector('#examples').innerHTML = `<h2><span>Näide </span></h2>${d.examples}`;
        }
        if ( d.definition.length > 0){
            document.querySelector('#definition').innerHTML = `<h2><span>Definitsioon </span></h2>${d.definition}`;
        }
        if (d.similarwords.length > 0){
            document.querySelector('#similarwords').innerHTML = `<h2><span>Sarnased sõnad </span></h2>${d.similarwords}`;
        }
        if (d.tsSynod.length > 0){
            var arr = d.tsSynod
            var filtered = arr.filter(function(value, index, arr){
                return value != word;
            })
            const sliced = filtered.slice(0,5);
            document.querySelector('#tsSynod').innerHTML = `<h2><span>Sünonüümid </span></h2>${sliced}`;
        }










    });
}