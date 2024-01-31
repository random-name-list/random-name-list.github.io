// Function to generate a random name
function generateRandomName() {
    let names = ["Mads", "Wasim", "Morten", "Ulrik", "Niclas", "Krishna", "Mahan", "Ismael", "Alex", "Joao"]
    randomIndex = Math.floor(Math.random() * names.length)
    return [names[randomIndex], names.length]
}

// Function to generate and display unique random names
function generateAndDisplayNames() {
    names = []
    for (let i = 1; i <= generateRandomName()[1]; i++) {
        // If the random name is not unique, then move back counter and re-generate random name
        randomUniqueName = generateRandomName()[0]
        if (names.includes(randomUniqueName)) {
            i -= 1 
            continue
        } 
        names.push(randomUniqueName)
       
        // // Print names in a label
        // const label = document.createElement("label")
        // label.textContent = `Number ${i}: ${randomUniqueName}`
        // document.body.appendChild(label)
    }

    // Print names in a label
    for ([index, name] of names.entries()) {
        const label = document.createElement("label")
        label.textContent = `Number ${index+1}: ${name}`
        document.body.appendChild(label)
    }

    // Convert array to object
    let namesObj = names.map(item => ({ firstName: item }))
    
    let namesJson = JSON.stringify(namesObj)
    // let namesJsonParse = JSON.parse(namesJson)

    // Put webhook address
    var formatted_Card_Payload = {
        "type": "message",
        "mode": 'no-cors',
        "headers": { 'Content-type': 'application/json' },
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": JSON.stringify(names),
                }
            }
        ]
    }

    var webhookUrl = "something"
    // fetch('sd', {
    //     mode: 'no-cors',
    //     method: 'POST',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify(names)
    // })
    fetch(webhookUrl, formatted_Card_Payload)
        .then((res) => {
            if (res.status == 200)
                console.log('Names sent', res)
            else
                console.log('Oops! Message not able to send', res)
        })
        .catch((err) => {
            console.log('Error: ' + err)
        })

}

// Call the function when the page is loaded
window.onload = generateAndDisplayNames;