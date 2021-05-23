// create function to get the data
function getData(sample) {
    // Reade JSON
    d3.json("data/samples.json").then((data) => {
        let metadata = data.metadata;
        let resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        let result = resultsarray[0]
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        let samples = data.samples;
        let resultsarray = samples.filter(sampleobject =>
            sampleobject.id == sample);
        let result = resultsarray[0]
        let ids = result.otu_ids;
        let labels = result.otu_labels;
        let values = result.sample_values;

        // Create chart
        let layoutB = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest"
        };

        let dataB = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values
            }
        }];
        Plotly.newPlot("bubble", dataB, layoutB);
    })
}