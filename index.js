document.getElementById('copyButton').style.display = 'none';

function formatData(input) {
    return input.split('\n')
                .map(line => {
                    const items = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Split by comma, but ignore commas within quotes
                    const formattedItems = [items[0], ...items.slice(1).map(item => {
                        // Check if item is already wrapped in quotes
                        
                        if (item.startsWith('"') && item.endsWith('"')) {
                            return item;
                        } else {
                            return `"${item}"`;
                        }
                       
                    })];
                    
                    return formattedItems.join(';');
                   
                })
               
                .join('\n');
               
}

document.getElementById('formatButton').addEventListener('click', () => {
    let inputData = document.getElementById('inputData').value;
    const outputData = formatData(inputData).replace(/""/g,'');
    document.getElementById('outputData').textContent = outputData;
    document.getElementById('copyButton').style.display = 'block';
});

document.getElementById('copyButton').addEventListener('click', () => {
    const outputData = document.getElementById('outputData').textContent;
    navigator.clipboard.writeText(outputData).then(() => {
        alert('Formatted data copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
