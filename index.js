document.getElementById('copyButton').style.display = 'none';

function formatData(input) {
    return input.split('\n')
                .map(line => {
                    const items = line.split(';');
                    const formattedItems = [items[0], ...items.slice(1).map(item => {
                        if (item.startsWith('"') && item.endsWith('"')) {
                            return item; // Ignore items already wrapped in double quotes
                        }
                        return `"${item}"`;
                    })];
                    return formattedItems.join(';');
                })
                .join('\n');
}

document.getElementById('formatButton').addEventListener('click', () => {
    let inputData = document.getElementById('inputData').value;
    inputData = inputData
    const outputData = formatData(inputData).replace(/""/g, '');
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
