
//AI
async function updateRestrictions() {
    param = getRestrictions().join()

    try {
        const response = await fetch(`http://localhost:8000/update-restrictions/?restrictions=${param}`, {
            method: "POST",
            
        });

        const data = await response.json();
        console.log(data);
    }

    catch (err) {
        console.error("Fetch error:, err")
    }
}

function getRestrictions() {
    //Gets the selection of features to be returned by checking which checkboxes have been ticked.
    checkboxes = Array.from(document.querySelectorAll('.feature:checked'));
    return checkboxes.map(box => box.value);
}