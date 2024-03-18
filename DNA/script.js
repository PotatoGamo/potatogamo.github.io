var nucleotides = ["A", "U", "G", "C"];

let aminoAcidTable =
{
    Met: ["AUG"],
    Phe: ["UUU", "UUC"],
    Leu: ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"],
    Ile: ["AUU", "AUC", "AUA"],
    Val: ["GUU", "GUC", "GUA", "GUG"],
    Ser: ["UCU", "UCC", "UCA", "UCG", "AGU", "AGC"],
    Pro: ["CCU", "CCC", "CCA", "CCG"],
    Thr: ["ACU", "ACC", "ACA", "ACG"],
    Ala: ["GCU", "GCC", "GCA", "GCG"],
    Tyr: ["UAU", "UAC"],
    His: ["CAU", "CAC"],
    Gln: ["CAA", "CAG"],
    Asn: ["AAU", "AAC"],
    Lys: ["AAA", "AAG"],
    Asp: ["GAU", "GAC"],
    Glu: ["GAA", "GAG"],
    Cys: ["UGU", "UGC"],
    Trp: ["UGG"],
    Arg: ["CGU", "CGC", "CGA", "CGG", "AGA", "AGG"],
    Gly: ["GGU", "GGC", "GGA", "GGG"],
    Stop: ["UAA", "UAG", "UGA"]
};


function run() {
    var outputElement = document.getElementById("codonOutput");
    outputElement.innerHTML = "";
    let inputCodonList = codonList(document.getElementById("input").value.toUpperCase().replaceAll("T", "U").replaceExcept(nucleotides));
    //printToDebug(inputCodonList);
    if (inputCodonList) {
        for (let i in inputCodonList) {
            let output = findAminoAcid(inputCodonList[i]);
            outputElement.innerHTML += `${output} `;
        }
    } else {
        printToDebug("No valid codons found in input.");
    }
}





function findAminoAcid(codon) {
    for (let aminoAcid in aminoAcidTable) {
        if (aminoAcidTable[aminoAcid].includes(codon)) {
            return aminoAcid;
        }
    }
    return `Unknown(${codon})`;
}


/*
Swaps 
'A': 'U',
'U': 'A',
'G': 'C',
'C': 'G'
for example
TACGAGGTG => AUGCUCCAC
*/
function transcribeDNA(str) {

    const rules = {
        'A': 'U',
        'U': 'A',
        'G': 'C',
        'C': 'G'
    };

    const converted = str.split('').map(char => {
        return rules[char] || char; 
    }).join('');

    return converted;
}

//
function codonList(str) {
    let returnVal = str.match(/.{3}/g);
    //if transcribe checked, transcribe
    if (document.getElementById("transcribe").checked) {
        returnVal = returnVal.map(codon => transcribeDNA(codon));
    }

    printToDebug(returnVal);

    if (returnVal && returnVal.length > 0) {
        return returnVal;
    } else {
        return null;
    }
}

function clear() {
    var debug = document.getElementById("debug");
    debug.innerHTML = "";
}



function printToDebug(val) {
    var d = new Date()
    var debug = document.getElementById("debug");
    debug.innerHTML += `<strong>\\\></strong> [${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}]${val}<br/>`;
}


function toggleDebug() {
    var debugSection = document.getElementById('debug');
    clear = document.getElementById("clear");
    if (debugSection.style.display === 'none') {
        clear.style.display = 'inline';
        debugSection.style.display = 'block';
    } else {
        clear.style.display = 'none';
        debugSection.style.display = 'none';
    }
}

function clearDebug() {
    document.getElementById("debug").innerHTML = "";
}

String.prototype.replaceExcept = function (allowedChars) {
    let result = '';
    for (let i = 0; i < this.length; i++) {
        if (allowedChars.includes(this[i])) {
            result += this[i];
        }
    }
    return result;
};